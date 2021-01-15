import React, { useEffect, useState } from "react";
import { getRelated, getProduct, productStar, productReview } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import FoooterLinks from "../components/nav/FooterLinks";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");


  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();

  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const handleAddReview = (e) => {
    e.preventDefault();
    productReview(product._id, review, user.token).then((res) => {
      console.log("review", res.data);
      loadSingleProduct();
    })
      .catch((err) => console.log("Add review error", err));
  };

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="product container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          setReview={setReview}
          handleAddReview={handleAddReview}
          review={review}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
            <div className="text-center col">No Products Found</div>
          )}
      </div>
      <FoooterLinks />
    </div>
  );
};

export default Product;
