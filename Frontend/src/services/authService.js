import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_URL 
  ? `${process.env.REACT_APP_URL}/auth`
  : 'http://localhost:5000/api/auth';

console.log('Auth Service BASE_URL:', BASE_URL);
console.log('Environment variable:', process.env.REACT_APP_URL);

export const setAuthCookie = (token, user) => {
  Cookies.set('token', token, { expires: 7 }); // expires in 7 days
  Cookies.set('user', JSON.stringify(user), { expires: 7 });
};

export const clearAuthCookie = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

export const getAuthCookie = () => {
  const token = Cookies.get('token');
  const user = Cookies.get('user');
  return {
    token,
    user: user ? JSON.parse(user) : null
  };
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    setAuthCookie(data.token, data.user);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await response.json();
    setAuthCookie(data.token, data.user);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
