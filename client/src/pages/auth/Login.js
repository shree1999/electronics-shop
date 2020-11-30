import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { GoogleOutlined, UserOutlined } from "@ant-design/icons";

import { auth, googleAuthProvider } from "../../firebase";
import { USER_LOGGED_IN } from "../../constants";

const Login = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmitHandler = async event => {
    event.preventDefault();
    // This function used for signing in user
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const userTokenId = await user.getIdTokenResult();

      dispatch({
        type: USER_LOGGED_IN,
        payload: {
          email: user.email,
          token: userTokenId.token,
        },
      });

      setLoading(false);

      history.push("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLoginHandler = async event => {
    event.preventDefault();

    try {
      const result = await auth.signInWithPopup(googleAuthProvider);

      const { user } = result;
      const userTokenId = await user.getIdTokenResult();
      dispatch({
        type: USER_LOGGED_IN,
        payload: {
          email: user.email,
          token: userTokenId.token,
        },
      });

      history.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="display-5 text-danger">Loading...</h4>
          ) : (
            <h3 className="display-3">Login</h3>
          )}
          <p className="lead">Welcome Back!</p>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <p className="small">We will never share your email to anyone</p>

            <input
              type="password"
              className="form-control mt-3"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              placeholder="Enter Password"
            />
            <p className="small">
              We will never share your password with anyone
            </p>

            <button type="submit" className="btn btn-raised">
              Login
            </button>
            <Button
              type="danger"
              className="m-4"
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
              onClick={googleLoginHandler}
            >
              Login with google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
