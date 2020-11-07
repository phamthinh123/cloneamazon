import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
function Login(props) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signout = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        className="login__pic"
      ></img>
      <form className="login__form">
        <h1 className="login__title">Sign in</h1>
        <label for="email" className="login__label">
          E-mail
        </label>
        <input
          type="email"
          className="login__input"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="pass" className="login__label">
          Password
        </label>
        <input
          type="password"
          id="pass"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__signin" type="submit" onClick={signin}>
          Sign in
        </button>
        <p className="login__text">
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice
        </p>
        <button className="login__signup" type="submit" onClick={signout}>
          Create your Amazon Account
        </button>
      </form>
    </div>
  );
}

export default Login;
