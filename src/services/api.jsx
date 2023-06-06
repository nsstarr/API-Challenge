import axios from 'axios'

// const BASE_URL = 'https://laravel-api.albrecht.uk.com/api'
const BASE_URL = '/api'


export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    const responseData = await response.json();

    if (!responseData.success) {
      throw new Error(responseData.message || 'Login failed');
    }

    return responseData.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/reset-password`, {
      email,
    });

    if (response.data.success) {
      console.log('Reset password email sent!');
    } else {
      throw new Error(response.data.message || 'Reset password failed');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
