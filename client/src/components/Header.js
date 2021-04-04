import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { USER_LOGGED_OUT } from '../constants';
import Search from './Forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();

  const { auth, cart } = useSelector(state => ({ ...state }));

  const { email, role } = auth;

  const onClickHandler = event => {
    setCurrent(event.key);
  };

  const logoutUserHandler = () => {
    firebase.auth().signOut();
    dispatch({
      type: USER_LOGGED_OUT,
      payload: {},
    });

    history.push('/login');
  };

  return (
    <Menu onClick={onClickHandler} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[10, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {email && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={email && email.split('@')[0]}
          className="float-right"
        >
          {email && role === 'admin' ? (
            <React.Fragment>
              <Item key="setting:1" icon={<EditOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
              <Item key="setting:2">
                <Link to="/user/history">History Dashboard</Link>
              </Item>
            </React.Fragment>
          ) : (
            <Item key="setting:2">
              <Link to="/user/history">History Dashboard</Link>
            </Item>
          )}
          <Item
            key="setting:3"
            icon={<LogoutOutlined />}
            onClick={logoutUserHandler}
          >
            Logout
          </Item>
        </SubMenu>
      )}

      {!email && (
        <React.Fragment>
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Item>
        </React.Fragment>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
