import axios from 'axios'

// const BASE_URL = 'https://laravel-api.albrecht.uk.com/api'
const BASE_URL = '/api'


export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    const responseData = response.data;
    console.log('Response:' + responseData)

    if (!responseData.success) {
      throw new Error(responseData.message || 'Login failed');
    }

    return responseData.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (email, password, roles, accessToken) => {
  const data = {
    email,
    password,
    c_password: password,
    roles,
  };

  try {
    const response = await axios.post(`${BASE_URL}/users`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Registration failed');
    }

    const responseData = response.data;

    if (!responseData.success) {
      throw new Error(responseData.message || 'Registration failed');
    }

    // Log in with the registered user's credentials to obtain a new token
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    if (loginResponse.status !== 200) {
      throw new Error('Login failed');
    }

    const loginData = loginResponse.data;

    if (!loginData.success) {
      throw new Error(loginData.message || 'Login failed');
    }

    const token = loginData.data.token;

    // Return the registered user data and the new token
    return {
      user: responseData.data,
      token: token,
    };
  } catch (error) {
    console.error('Error registering user:', error);
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

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });
    console.log('Users' + response.data)
    return response.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
