import axios from "axios";

export const getCoupons = async () =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/coupons");

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`https://guarded-everglades-60016.herokuapp.com/api/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/coupon",
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
