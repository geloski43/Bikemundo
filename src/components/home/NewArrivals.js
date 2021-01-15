import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    getProducts("createdAt", "desc", page).then((res) => {
      if (isMounted) setProducts(res.data);
      setLoading(false);
    })
      .catch((err) => console.log(err));
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    getProductsCount().then(res => {
      if (isMounted) setProductsCount(res.data);
    })
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
