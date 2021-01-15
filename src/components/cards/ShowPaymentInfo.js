import React from "react";

const oneSpace = '\xa0';


const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div className="usernav">
    <p>
      <span>Order Id: {order.paymentIntent.id ? order.paymentIntent.id : order._id}</span>
      {" / "}
      <br />
      <span>

        Amount:{" / "}
        {(order.paymentIntent.amount).toLocaleString("en-US", {
          style: "currency",
          currency: "php",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Ordered on:{" / "}
        {new Date(order.createdAt).toLocaleString()}
      </span>
      {" / "}
      <br />
      <span>
        Delivery Address:{" / "}
        {order.address.toUpperCase()}</span>
      <br />
      <span>
        Name:{" / "}
        {order.name.toUpperCase()}
      </span>
      {oneSpace} {" / "}
      <span>
        Phone Number:{" / "}
        {order.phonenumber}
      </span>
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
