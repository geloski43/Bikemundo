import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let isMounted = true;
    if (isMounted) loadWishlist();
    return () => { isMounted = false };

  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      console.log(res.data.wishlist.length);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="usernav container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        {wishlist.length !== 0 ? (
          <div className="col">
            <h4>Wishlist</h4>
            {wishlist.map((p) => (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  onClick={() => handleRemove(p._id)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
              </div>
            ))}
          </div>
        ) : (
            <h4>No Wishlist added</h4>)
        }

      </div>
    </div>
  );
};

export default Wishlist;
