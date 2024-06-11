import api from "../config/axios";

interface UserLogin {
  username: string
  password: string
}


// === GET routes === //

export const getUser = async () => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    const res = await api.get('/api/account', config);
    return res.data.user;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const loginUser = async (user: UserLogin) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    await api.post('/api/account/authenticate', user, config);
  } catch (err) {
    console.log(err);
  }
};