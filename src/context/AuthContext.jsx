import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (credentials) => {
    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data);
        return { success: true };
=======
      // First, authenticate the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      // Wait a brief moment to ensure the auth user is fully created
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw profileError;
>>>>>>> d1f40888d84fd09432ce18b5aef86bb759b7f91c
      }

      // If profile doesn't exist, create it
      if (!profileData) {
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([{
            id: authData.user.id,
            email: credentials.email,
            user_type: credentials.userType,
            created_at: new Date().toISOString()
          }]);

        if (insertError) throw insertError;

        // Initialize user points
        const { error: pointsError } = await supabase
          .from('user_points')
          .insert([{
            user_id: authData.user.id,
            total_points: 0,
            created_at: new Date().toISOString()
          }]);

        if (pointsError) throw pointsError;
      }

      return { 
        success: true, 
        user: authData.user,
        userType: profileData?.user_type || credentials.userType
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const signup = async (credentials) => {
    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      // Wait for the auth user to be fully created
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Auth user created:', authData.user.id); // Debug log

      // Create the user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: authData.user.id,
          email: credentials.email,
          user_type: credentials.userType,
          created_at: new Date().toISOString()
        }]);

      if (profileError) {
        console.error('Profile creation error:', profileError); // Debug log
        throw profileError;
      }

      // Initialize user points
      const { error: pointsError } = await supabase
        .from('user_points')
        .insert([{
          user_id: authData.user.id,
          total_points: 0,
          created_at: new Date().toISOString()
        }]);

      if (pointsError) throw pointsError;

      return { 
        success: true, 
        user: authData.user,
        userType: credentials.userType
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true, userType: data.user.userType };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
=======
    <AuthContext.Provider value={{ 
      user, 
      userProfile,
      login, 
      logout,
      signup, // Add signup to the context
      loading 
    }}>
>>>>>>> d1f40888d84fd09432ce18b5aef86bb759b7f91c
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);