import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserInfo,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const [infoSaved, setInfoSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user.shipping && user) {
      let existingInfoObject = user.shipping.find(
        (ele) => ele.email.toString() === user.email.toString()
      );
      existingInfoObject &&
        setAddress(existingInfoObject.address);
      setUserName(existingInfoObject.username);
      setPhoneNumber(existingInfoObject.phonenumber);
    }
  }, [user.shipping, user]);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveInfoToDb = (e) => {
    e.preventDefault();
    // console.log(address);
    saveUserInfo(user.token, address, username, phonenumber).then((res) => {
      if (res.data) {
        setInfoSaved(true);
        console.log("info", res.data);
        toast.success("Information has been saved, you can place your order");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showInfo = () => (
    <>
      <form onSubmit={saveInfoToDb} className="forms form-group">
        <label className="ml-2">Name</label>
        <input
          required
          type="text"
          className="form-control ml-2"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label className="ml-2">Phone Number</label>
        <input
          required
          type="text"
          className="form-control ml-2"
          value={phonenumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <label className="ml-2">Address</label>
        <input
          required
          type="text"
          className="form-control ml-2"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button className="btn btn-primary mt-2">
          Save
      </button>
      </form>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          &#8369;{p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control ml-2"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="usernav row">
      <div className="col-md-6">
        <h4 className="ml-2 mt-2">Delivery Information</h4>
        <br />
        <br />
        {showInfo()}
        <hr />
        <h4 className="ml-2">Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4 className="mt-2">Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total:&#8369; {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: &#8369;{totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!infoSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
                <button
                  className="btn btn-primary"
                  disabled={!infoSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
