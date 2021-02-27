import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart, getUserCart } from "../functions/user";
import { Button } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  emptyUserCart
} from "../functions/user";
import { toast } from "react-toastify";


const Cart = ({ history }) => {
  const [orderID, setOrderID] = useState(false);


  const CLIENT = {
    sandbox:
      "AfaouQUyplVH5WxwkqEwLBfoD7bJryeOxAETCDh75KsH3ocq5fdbfi6uF-p8Tj929IBPUplChcWifCS_",
    production:
      "Ad2jnPBpAJHk-pIuit17cBP5PwEGSasxOQlkGSB7wGGnmjQzJkQk13CC2vkckn6wY85aF_kVbfUEOLo0"
  };

  const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    console.log(cart)
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
    getUserCart(user.token)
      .then((res) => {
        console.log("CART POST RES", res.config.data);
      })
      .catch((err) => console.log("cart save err", err))
  };

  const saveCashOrderToDb = () => {
    console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: cart,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res.config.data);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));

    getUserCart(user.token)
      .then((res) => {
        console.log("CART POST RES", res.config.data);
      })
      .catch((err) => console.log("cart save err", err))
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Bikemundo Purchase",
            amount: {
              value: getTotal(),
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      toast.success("Paypal payment success");
      history.push("/shop")
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    emptyCart();
    console.log(order);
  };

  const onError = (err) => {
    toast.error("Paypal payment failed");
    console.log(err)
  }



  return (
    <div className="cart container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
              showCartItems()
            )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = &#8369;{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>&#8369;{getTotal()}</b>
          <hr />
          {user ? (
            <>
              {/* <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br /> */}

              <Button
                disabled={!cart.length}
                onClick={saveCashOrderToDb}
                type="primary" shape="round" size="large">
                Pay Cash on Delivery
               </Button>

              <br />
              <br />

              <PayPalScriptProvider options={{
                "client-id": "AfaouQUyplVH5WxwkqEwLBfoD7bJryeOxAETCDh75KsH3ocq5fdbfi6uF-p8Tj929IBPUplChcWifCS_",
                currency: "PHP"
              }}>
                <PayPalButtons
                  onError={onError}
                  onApprove={onApprove}
                  createOrder={createOrder}
                  style={{ color: "blue", shape: "pill", label: "pay", height: 40 }}
                />
              </PayPalScriptProvider>
            </>

          ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  Login to Checkout
              </Link>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
