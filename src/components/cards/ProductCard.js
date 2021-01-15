
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


  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    let cart = [];
    if (typeof window !== "undefined") {

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      const existingCartItem = cart.find(
        cartItem => cartItem._id === product._id
      );

      if (existingCartItem) {
        toast.warning("Item already added in cart");
        return;
      }

      if (!existingCartItem) {
        cart.push({
          ...product,
          count: 1,
        });

        let unique = _.uniqWith(cart, _.isEqual);

        console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));

        setTooltip("Added");

        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        });

        dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });

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
