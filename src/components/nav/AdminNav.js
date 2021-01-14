import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu, Button } from 'antd';
import {
  AuditOutlined,
  KeyOutlined,
  AppstoreAddOutlined,
  OrderedListOutlined,
  ApartmentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BranchesOutlined,
  GiftOutlined
} from '@ant-design/icons';

const { Item } = Menu;

const AdminNav = () => {
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
        <Item key="1" icon={<AuditOutlined />}>
          <Link to="/admin/dashboard">
            Dashboard
        </Link>
        </Item>
        <Item key="2" icon={<AppstoreAddOutlined />}>
          <Link to="/admin/product">
            Create Product
        </Link>
        </Item>
        <Item key="3" icon={<OrderedListOutlined />}>
          <Link to="/admin/products">
            Products
        </Link>
        </Item>
        <Item key="4" icon={<ApartmentOutlined />}>
          <Link to="/admin/category">
            Category
        </Link>
        </Item>
        <Item key="5" icon={<BranchesOutlined />}>
          <Link to="/admin/sub">
            Sub Categories
        </Link>
        </Item>
        <Item key="6" icon={<GiftOutlined />}>
          <Link to="/admin/coupon">
            Create Coupon
        </Link>
        </Item>
        <Item key="7" icon={<KeyOutlined />}>
          <Link to="/user/password">
            Password
        </Link>
        </Item>
      </Menu>
    </div>
  );
}

export default AdminNav;