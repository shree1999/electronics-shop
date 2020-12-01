import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { USER_LOGGED_OUT } from "../constants";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector(state => state.auth);

  const { email } = auth;

  const onClickHandler = event => {
    setCurrent(event.key);
  };

  const logoutUserHandler = () => {
    firebase.auth().signOut();
    dispatch({
      type: USER_LOGGED_OUT,
      payload: {},
    });

    history.push("/login");
  };

  return (
    <div className="container">
      <Menu onClick={onClickHandler} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        {email && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={email && email.split("@")[0]}
            className="float-right"
          >
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
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
      </Menu>
    </div>
  );
};

export default Header;
