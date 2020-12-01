import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../actions/userAction";

const RegisterComplete = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const onSubmitHandler = async event => {
    // this function will use password and email to register user in the database
    event.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // user has used the correct link to register in our page and move forward.
        /*
          1. remove email from local storage
          2. get user unique id by updating with password
          3. update redux store to globally have user in our website by that id token
          4. redirect to the required page after registration
        */
        localStorage.removeItem("emailForRegistration");

        const user = auth.currentUser;
        await user.updatePassword(password);

        const userIdToken = await user.getIdTokenResult();
        dispatch(createOrUpdateUser(userIdToken.token));
        history.push("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="display-3 my-0">Register</h4>
          <p className="lead">Complete the registration form</p>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              className="form-control"
              value={email}
              autoFocus
              disabled
            />

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

            <button type="submit" className="btn btn-raised mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
