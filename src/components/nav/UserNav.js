import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu, Button } from 'antd';
import {
  HistoryOutlined,
  KeyOutlined,
  AppstoreAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Item } = Menu;

const UserNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="usernav">
      <br />
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        style={{ backgroundColor: "rgb(209, 218, 224)" }}
        onClick={handleClick}
        selectedKeys={[current]}
        defaultOpenKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Item key="1" icon={<HistoryOutlined />}>
          <Link to="/user/history">
            History
        </Link>
        </Item>
        <Item key="2" icon={<KeyOutlined />}>
          <Link to="/user/password">
            Password
        </Link>
        </Item>
        <Item key="3" icon={<AppstoreAddOutlined />}>
          <Link to="/user/wishlist">
            Wishlist
        </Link>
        </Item>
      </Menu>
    </div>
  );
}

export default UserNav;