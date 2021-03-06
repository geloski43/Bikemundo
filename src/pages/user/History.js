import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders, getUserCart, deleteUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
import _ from "lodash";
import CompletedOrder from "../../components/cards/CompletedOrder";
import { message } from 'antd';
import { toast } from "react-toastify";


const History = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartOwner, setCartOwner] = useState(false);


  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); //fix for react-pdf error

  const { user } = useSelector((state) => ({ ...state }));


  const oldestOrder = orders && orders.map(function (e) { return e.createdAt; }).sort()[0]


  const completedOrder = orders && orders.find(
    orderCompleted => orderCompleted.createdAt === oldestOrder && orderCompleted.orderStatus === "Completed"
  );

  const deletedOrderSuccess = completedOrder && `The order with Id of ${completedOrder._id}, ordered on ${new Date(completedOrder.createdAt).toLocaleDateString()} has been deleted`;

  let dispatch = useDispatch();

  useEffect(() => {
    setOpen(false)
    setOpen(true);
    return () => setOpen(false);
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadUsersOrders();
      loadUsersCart();
    }
    return () => { isMounted = false };

  }, []);

  useEffect(() => {
    if (products && cartOwner) {
      handleGetCart();
    } else {
      return;
      // console.log("do not render handle get cart again!");
    }
  }, [products]);

  const loadUsersOrders = () => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  }

  const loadUsersCart = () => {
    getUserCart(user.token).then((res) => {
      // console.log('USER CART', res.data)
      if (res.data.orderBy === user._id) {
        setCartOwner(true)
      }
      setProducts(res.data.products);
    })
      .catch(error => {
        console.log("Users Cart Error", error)
      })
  };

  const handleGetCart = () => {

    let cart = [];
    if (typeof window !== "undefined") {

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      if (products) {
        dispatch({
          type: "ADD_TO_CART",
          payload: products
        });

        let unique = _.uniqWith(products, _.isEqual);

        localStorage.setItem("cart", JSON.stringify(unique))
      };
    }
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>&#8369;{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );


  const showDownloadLink = (order) => {
    return (
      <>
        {open && (<PDFDownloadLink
          document={<Invoice order={order} />}
          fileName="invoice.pdf"
          className="btn btn-sm btn-block btn-outline-primary"
        >
          Download PDF
        </PDFDownloadLink>)}
      </>
    )
  };

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  const handleRemoveOrder = () => {
    deleteUserOrders(user.token).then((res) => {
      if (res.data) {
        console.log(res.data);
        message.success(deletedOrderSuccess);
        setTimeout(() => {
          window.location.reload();
        }, 4000)
      }
    });
  }

  const onReject = (e) => {
    console.log(e);
    message.error('Order deletion cancelled');
  };

  return (
    <div className="usernav container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
      <CompletedOrder
        orders={orders}
        handleRemoveOrder={handleRemoveOrder}
        onReject={onReject}
      />
    </div>
  );
};

export default History;
