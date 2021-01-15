import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/admin/orders", {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    "https://guarded-everglades-60016.herokuapp.com/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
