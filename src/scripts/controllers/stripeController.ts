import api from "../config/axios";


// === POST routes === //

export const checkoutItems = async (products: Product[]) => {
  try {
    const auth = { withCredentials: true };
    const payload = { products };
    const res = await api.post('/api/stripe/create-checkout-session', payload, auth);
    location.replace(res.data.url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
