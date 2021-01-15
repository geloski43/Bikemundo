import React from "react";
import { Popconfirm, Button } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const CompletedOrder = ({ handleRemoveOrder, onReject, orders, showStatus = true }) => {

  const oldestOrder = orders.map(function (e) { return e.createdAt; }).sort()[0]

  const completedOrder = orders.find(
    orderCompleted => orderCompleted.createdAt === oldestOrder && orderCompleted.orderStatus === "Completed"
  );

  const oneSpace = '\xa0';

  return (
    <div className="usernav container-fluid">
      {
        completedOrder ?
          <div className="col-md-10 float-right text-center pb-5">
            <h4>Completed Order</h4>
            <div >
              <p>
                <span>Order Id: {completedOrder.paymentIntent.id ? completedOrder.paymentIntent.id : completedOrder._id}</span>
                {" / "}
                <br />
                <span>
                  Amount:{" / "}
                  {(completedOrder.paymentIntent.amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: "php",
                  })}
                </span>
                {" / "}
                <span>Currency: {completedOrder.paymentIntent.currency.toUpperCase()}</span>
                {" / "}
                <span>Method: {completedOrder.paymentIntent.payment_method_types[0]}</span>
                {" / "}
                <span>Payment: {completedOrder.paymentIntent.status.toUpperCase()}</span>
                {" / "}
                <span>
                  Ordered on:{" / "}
                  {new Date(completedOrder.createdAt).toLocaleString()}
                </span>
                {" / "}
                <br />
                <span>
                  Delivery Address:{" / "}
                  {completedOrder.address.toUpperCase()}</span>
                <br />
                <span>
                  Name:{" / "}
                  {completedOrder.name.toUpperCase()}
                </span>
                {oneSpace} {" / "}
                <span>
                  Phone Number:{" / "}
                  {completedOrder.phonenumber}
                </span>
                <br />
                {showStatus && (
                  <span className="badge bg-primary text-white">
                    STATUS: {completedOrder.orderStatus}
                  </span>
                )}
              </p>
            </div>
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
                {completedOrder.products.map((p, i) => (
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
            <Popconfirm
              title={`Are you sure to delete this order with Id of ${completedOrder._id}, ordered on ${new Date(completedOrder.createdAt).toLocaleDateString()}?`}
              onConfirm={handleRemoveOrder}
              onCancel={onReject}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button
                className="float-right mr-5"
                shape="round" icon={<DeleteOutlined />}
                type="primary" danger>
                Delete Completed Order
                    </Button>
            </Popconfirm>
          </div>
          : null
      }
    </div>
  )
}

export default CompletedOrder;