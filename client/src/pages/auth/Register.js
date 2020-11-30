import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async event => {
    /*
      function that runs when user clicks the submit button after typing email.

      by this we can assure that user is using the correct email.
    */
    event.preventDefault();
    try {
      const actionCodeSettings = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        // This must be true.
        handleCodeInApp: true,
      };
      // send a link to user
      await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      toast.success(
        `Email is sent to ${email} click the link there to complete the registration`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      // save user email in localStorage
      localStorage.setItem("emailForRegistration", email);

      setEmail("");
    } catch (err) {
      console.log(err.message);
      toast.error("Oops! Something went wrong!!");
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
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter valid email"
              autoFocus
            />
            <p className="small">We will never share your email with anyone</p>

            <button type="submit" className="btn btn-raised mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
