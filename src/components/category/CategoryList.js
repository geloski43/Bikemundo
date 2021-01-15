import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getCategories().then((c) => {
      if (isMounted) setCategories(c.data);
      setLoading(false);
    })
      .catch((err) => console.log(err));
    return () => { isMounted = false };
  }, []);

  const showCategories = () =>
    categories && categories.map((c) => (
      <div
        key={c._id}
        className="categorybutton col btn btn-outlined-primary btn-md btn-block btn-raised m-3"
      >
        <Link style={{ color: "rgb(43, 135, 151)" }} to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
            showCategories()
          )}
      </div>
    </div>
  );
};

export default CategoryList;
