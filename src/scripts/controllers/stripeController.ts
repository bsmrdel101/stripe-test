import api from "../config/axios";


// === GET routes === //

export const getTest = async () => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get('/api/alerts', auth);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
