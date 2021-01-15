import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bikemundo from "../../images/bikemundo.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import CreateReview from "../forms/CreateReview";
import ReviewCard from "../../components/cards/ReviewCard";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star, handleAddReview, setReview, review }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let history = useHistory();

  const { title, images, description, _id } = product;

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
      }
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
            <Card cover={<img src={bikemundo} className="mb-3 card-image" alt="" />}></Card>
          )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            <p>{description && description}
            </p>
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 0916 387 0229 to learn more about this product or you can
            send us an <a rel="noopener noreferrer" target="_blank" href="mailto:bikemundomail@gmail.com">email</a> for further inquiries.
          </TabPane>
          <TabPane tab="Reviews" key="3">
            {product && product.reviews && product.reviews.length > 0 ? (
              <ReviewCard
                product={product}
                user={user}
              />
            ) : (
                <div className="text-center pt-1 pb-3">No review yet</div>
              )}
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
            <div className="text-center pt-1 pb-3">No rating yet</div>
          )}

        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            user ? <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>
              : <Link to="/login"><HeartOutlined className="text-info" /> <br /> Log in to Add to Wishlist</Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <CreateReview
                setReview={setReview}
                name={_id}
                review={review}
                handleAddReview={handleAddReview}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
