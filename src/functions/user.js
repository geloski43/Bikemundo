import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/user/cart", {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete("https://guarded-everglades-60016.herokuapp.com/api/user/cart", {
    headers: {
      authtoken,
    },
  });

export const saveUserInfo = async (authtoken, address, username, phonenumber) =>
  await axios.put(
    "https://guarded-everglades-60016.herokuapp.com/api/user/shipping",
    { address, username, phonenumber },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/user/cart/coupon",
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/user/order",
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/user/orders", {
    headers: {
      authtoken,
    },
  });

export const deleteUserOrders = async (authtoken) =>
  await axios.delete("https://guarded-everglades-60016.herokuapp.com/api/user/orders", {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/user/wishlist", {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `https://guarded-everglades-60016.herokuapp.com/api/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    "https://guarded-everglades-60016.herokuapp.com/api/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );


export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    " https://guarded-everglades-60016.herokuapp.com/api/user/cash-order",
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
