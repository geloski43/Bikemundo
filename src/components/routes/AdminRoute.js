import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          if (isMounted) setOk(true);
        })
      return () => { isMounted = false };
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
