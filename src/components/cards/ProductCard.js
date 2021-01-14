/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userCart } from "../../functions/user"


const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  // eslint-disable-next-line
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //find the same product saved on users cart
      const existingCartItem = cart.find(
        cartItem => cartItem._id === product._id
      );
      //if id matched do nothing
      if (existingCartItem) {
        toast.warning("Item already added in cart");
        return;
      }
      // push new product to cart
      if (!existingCartItem) {
        cart.push({
          ...product,
          count: 1,
        });
        // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        // save to local storage
        console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));
        // show tooltip
        setTooltip("Added");

        // add to redux state
        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        });
        // show cart items in side drawer
        dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });
        //save user cart into db
        if (user) {
          userCart(cart, user.token)
            .then((res) => {
              console.log("CART POST RES", res);
            })
            .catch((err) => console.log("cart save err", err))
        }
      }
    }
  };

  const phPrice = () => {
    return <>{`${product.title.substring(0, 20)}...`} &#8369; {product.price}</>;
  };

  // destructure
  const { images, description, slug } = product;
  return (
    <div className="homeproduct">
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

      <Card
        cover={
          <img
            alt=""
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={phPrice()}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
