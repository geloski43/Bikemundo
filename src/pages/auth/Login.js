import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider, facebookProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const oneSpace = '\xa0';


  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              picture: res.data.picture,
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));


    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    auth
      .signInWithPopup(facebookProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                picture: res.data.picture,
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        // ...
      });
  }

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                picture: res.data.picture,
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          autoComplete="off"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="medium"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
      <Link to="/forgot/password" className="float-left text-danger">
        Forgot Password
          </Link>
    </form>
  );

  return (
    <div className="login container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
              <h4>Login</h4>
            )}
          {loginForm()}
          <br />
          <span className="float-left">
            New member? {oneSpace}
            <Link to="/register">
              Register
          </Link>
            {oneSpace} here. Or continue with..
          </span>
          <br />
          <br />
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="medium"
          >
            Google account Login and Register
          </Button>
          <Button
            onClick={facebookLogin}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<FacebookOutlined />}
            size="medium"
          >
            Facebook account Login and Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
