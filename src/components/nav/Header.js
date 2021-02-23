import React, { useState } from "react";
import { Menu, Badge, Avatar, Affix } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { userCart } from "../../functions/user"
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import bikemundologo from "../../images/bikemundologo.jpg";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [theme, setTheme] = useState('light');

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  const oneSpace = '\xa0';



  const adminEmails = [
    {
      email:
        "onath.gonzales@gmail.com"
    },
    {
      email:
        "pevisca003@gmail.com"
    },
    {
      email:
        "jovieangel34@gmail.com"
    },
    {
      email:
        "bikemundomail@gmail.com"
    },
    {
      email:
        "ajgonzales43@gmail.com"
    },
  ];

  const existingAdminEmail = adminEmails.find(
    conFirmedEmail => (
      user && conFirmedEmail.email === user.email
    )
  );



  let history = useHistory();

  const handleClick = (e) => {

    setCurrent(e.key);
  };

  const logoutSaveAndEmptyCart = () => {

    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
      })
      .catch((err) => console.log("cart save err", err));

    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    localStorage.removeItem("cart", JSON.stringify(cart))
    history.push("/login");
  };


  const getInitials = (string) => {
    const names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {

      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <div className="headers">
      <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
        <Menu style={{
          backgroundColor: 'rgba(203, 197, 174, 0.8)'
        }} onClick={handleClick} selectedKeys={current} mode="horizontal" theme={theme}>
          <Item key="home" >
            <Avatar shape="square" src={bikemundologo} >
            </Avatar> {oneSpace}
            <Link to="/">Home</Link>
          </Item>

          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>

          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
          </Badge>
            </Link>
          </Item>
          <Item>
            <Search />
          </Item>

          {!user && (
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
              <Link to="/register">Register</Link>
            </Item>
          )}

          {!user && (
            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
          )}

          {user && (
            <SubMenu
              className="float-right"
              icon={<SettingOutlined />}
              title=
              {user.email && user.email.split("@")[0]}
            >
              {user && !existingAdminEmail
                && (
                  <Item icon={<BarsOutlined />}>
                    <Link className="headers" to="/user/history">Dashboard</Link>
                  </Item>
                )}

              {user && existingAdminEmail && (
                <Item icon={<BarsOutlined />}>
                  <Link className="headers" to="/admin/dashboard">Admin Dashboard</Link>
                </Item>
              )}

              <Item className="headers" icon={<LogoutOutlined />} onClick={logoutSaveAndEmptyCart}>
                Logout
          </Item>
            </SubMenu>
          )}

          {user && existingAdminEmail && (
            <Item className="float-right">
              {user.picture ? <Avatar
                src={user.picture} />
                : <Avatar
                  style={{ background: "linear-gradient(to right, #00affa, #000000)" }}
                > {getInitials(user.email)}</Avatar>
              }
              <Link to="/admin/dashboard"></Link>
            </Item>
          )}

          {user && !existingAdminEmail && (
            <Item className="float-right">
              {user.picture ? <Avatar
                src={user.picture} />
                : <Avatar
                  style={{ background: "linear-gradient(to right, #00affa, #000000)" }}
                > {getInitials(user.email)}</Avatar>
              }
              <Link to="/user/history"></Link>
            </Item>
          )}

          {user && (
            <Item className="float-right">
            </Item>
          )}
        </Menu>
      </Affix>
    </div>
  );
};

export default Header;
