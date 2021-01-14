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


const History = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); //fix for react-pdf error

  const { user } = useSelector((state) => ({ ...state }));

  //get the oldest date ordered
  const oldestOrder = orders && orders.map(function (e) { return e.createdAt; }).sort()[0]

  //oldest order and completed status
  const completedOrder = orders && orders.find(
    orderCompleted => orderCompleted.createdAt === oldestOrder && orderCompleted.orderStatus === "Completed"
  );

  const deletedOrderSuccess = completedOrder && `The order with Id of ${completedOrder._id}, ordered on ${new Date(completedOrder.createdAt).toLocaleDateString()} has been deleted`;

  let dispatch = useDispatch();

  //fix for react-pdf error
  // eslint-disable-next-line
  useEffect(() => {
    setOpen(false)
    setOpen(true);
    return () => setOpen(false);
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadUsersOrders();
    }
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadUsersCart();
    }
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (products) {
        handleGetCart();
      }
    }, 2000);
    return () => clearTimeout(delayed);
    // eslint-disable-next-line
  }, [products]);

  const loadUsersOrders = () => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
      // console.log(JSON.stringify(res.data, null, 4));
      setLoading(false);
    });
  }

  const loadUsersCart = () => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      // console.log(p)
      setLoading(false);
    })
      .catch(error => {
        console.log("Users Cart Error", error)
      })
  };

  const handleGetCart = () => {
    // create cart array
    // eslint-disable-next-line
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // retrieve saved cart // add to redux state
      if (products) {
        dispatch({
          type: "ADD_TO_CART",
          payload: products
        });
        // remove duplicates
        let unique = _.uniqWith(products, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
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

  //react-pdf error fixed
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
