import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/create-payment-intent",
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
