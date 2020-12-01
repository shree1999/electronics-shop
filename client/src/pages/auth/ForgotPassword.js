import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { auth } from "../../firebase";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const authUser = useSelector(state => state.auth);

  useEffect(() => {
    if (authUser && authUser.email) {
      history.push("/");
    }
  }, [authUser]);

  const onSubmitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendPasswordResetEmail(email, actionCodeSettings);
      toast.success(
        `Email is sent to ${email} click the link there to complete the password reset`
      );
      setLoading(false);
      setEmail("");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger display-5">Loading...</h4>
          ) : (
            <h4 className="display-3 my-0">Forgot Password</h4>
          )}
          <p className="lead">Please enter your email to recieve a link</p>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              className="form-control mt-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter registered email"
              autoFocus
            />
            <p className="small">We will never share your email with anyone</p>

            <button
              type="submit"
              className="btn btn-raised mt-3"
              disabled={!email}
            >
              Password Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
