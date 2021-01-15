import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import FoooterLinks from "../components/nav/FooterLinks";
import { Menu, Slider, Checkbox, Radio, Typography } from "antd";
import {
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";


const { SubMenu, ItemGroup } = Menu;
const { Text } = Typography;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);


  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);

  const [sub, setSub] = useState("");

  const [brands, setBrands] = useState([
    "Galaxy",
    "Spanker",
    "Trinx",
    "Giant",
    "Foxter",
    "Cannondale",
    "Trek",
    "Specialized",
    "Sunpeed",
    "Keysto",
    "Others"]);
  const [brand, setBrand] = useState("");

  const [colors, setColors] = useState([
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "Gray",
    "Purple",
    "Orange",
    "Crome",
    "Others"]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const menuStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  useEffect(() => {
    let isMounted = true;

    getCategories().then((res) => {
      if (isMounted) setCategories(res.data)
    })

    getSubs().then((res) => {
      if (isMounted) setSubs(res.data)
    })
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      loadAllProducts();
      setTimeout(() => {
        if (text && products.length >= 1) {
          fetchProducts({ query: text });
        }
      }, 300)
    }, 800);
    return () => clearTimeout(delayed);

  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);

    })
      .catch(error => {
        console.log("Search Error", error)
      })

  };


  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);

      setLoading(false);
    });
  };


  useEffect(() => {
    let isMounted = true;
    console.log("ok to request");
    if (isMounted) fetchProducts({ price });
    else {
      return () => { isMounted = false };
    }

  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });


    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };


  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          style={menuStyle}
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          <Text strong>{c.name}</Text>
        </Checkbox>
        <br />
      </div>
    ));


  const handleCheck = (e) => {

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);


    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {

      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);

    fetchProducts({ category: inTheState });
  };


  const handleStarClick = (num) => {

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );


  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        <Text strong>{s.name}</Text>
      </div>
    ));

  const handleSub = (sub) => {

    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };



  const showBrands = () =>
    brands.map((b) => (
      <Radio
        className="pb-2 pl-4 pr-4"
        style={menuStyle}
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}

      >
        <Text strong>{b}</Text>
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };


  const showColors = () =>
    colors.map((c) => (
      <Radio
        className="pb-2 pl-4 pr-4"
        style={menuStyle}
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
      >
        <Text strong>{c}</Text>
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };


  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        <Text strong>Yes</Text>
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        <Text strong>No</Text>
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const formatter = (value) => {
    return <>&#8369; {value}</>;
  };

  const marks = {
    0: "0",
    5000: "5000",
    15000: "15000",
    25000: "25000",
    40000: "40000",
    50000: "50000",
  };

  return (
    <div className="shop container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h5>Search/Filter</h5>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2"]}
            mode="inline"
          >

            <SubMenu
              key="1"
              title={
                <Text className="h6" style={{ color: "rgb(43, 135, 151)" }}>
                  &#8369; Price
              </Text>
              }
            >
              <div>
                <Slider
                  range marks={marks}
                  included={true}
                  className="ml-4 mr-4"
                  tipFormatter={formatter}
                  value={price}
                  onChange={handleSlider}
                  max="50000"
                  step={100}
                />
              </div>
            </SubMenu>


            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }} >Categories</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>


            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }}>Rating</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>


            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }}>Sub Categories</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>


            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }}>Brands</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5 ">
                {showBrands()}
              </div>
            </SubMenu>


            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }}>Colors</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>


            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> <Text style={{ color: "rgb(43, 135, 151)" }}>Shipping</Text>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
              <h4 className="text-danger">Products</h4>
            )}
          {products.length < 1 && <p>No products found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <FoooterLinks />
    </div>
  );
};

export default Shop;
