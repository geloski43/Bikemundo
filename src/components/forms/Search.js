import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    })
    history.push(`/shop?${text}`);
  };

  const handleEnterSubmit = (e) => {
    e.preventDefault();
    return null;
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleEnterSubmit} >
      <input
        onChange={handleSubmit}
        type="search"
        defaultValue={text}
        className="form-control mr-sm-2"
        placeholder="Search Products"
      />
      <SearchOutlined style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
