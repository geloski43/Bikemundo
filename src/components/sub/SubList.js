import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getSubs().then((res) => {
      if (isMounted) setSubs(res.data);
      setLoading(false);
    })
      .catch((err) => console.log(err));
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, []);

  const showSubs = () =>
    subs && subs.map((s) => (
      <div
        key={s._id}
        className="subbutton col btn btn-outlined-primary btn-sm btn-block btn-raised m-3"
      >
        <Link style={{ color: "rgb(43, 135, 151)" }} to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
