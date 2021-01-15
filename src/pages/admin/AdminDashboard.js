import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      loadOrders();
    return () => { isMounted = false }

  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="usernav container-fluid" >
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <h6>
            {orders.length > 0 ? "Orders for Processing" : "No orders to be Processed"}
          </h6>

          {loading ? <h4 className="text-center">Loading...</h4>
            : <Orders orders={orders} handleStatusChange={handleStatusChange}
            />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
