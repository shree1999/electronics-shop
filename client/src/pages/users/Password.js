import React, { useState } from "react";
import { toast } from "react-toastify";

import UserNav from "../../components/user-navs/UserNav";
import { auth } from "../../firebase";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await auth.currentUser.updatePassword(password);
      console.log(res);
      setPassword("");
      toast.success("Password updated successfully");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-6 offset-1">
          <h1 className="display-3">
            {loading ? (
              <h4 className="dispplay-5 text-danger">Loading...</h4>
            ) : (
              <h2 className="display-3">Update your password here.</h2>
            )}
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Enter new password"
                autoFocus
                onChange={e => setPassword(e.target.value)}
                value={password}
                disabled={loading}
              />
              <p className="small">
                This will be the new password for all your logins
              </p>

              <button
                className="btn btn-primary px-0"
                disabled={!password || loading}
              >
                Update password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
