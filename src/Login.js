import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});
const Login = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          if (user) {
            let currentUser = auth.currentUser;
            if (currentUser.emailVerified) {
              history.push("/");
              console.log(user, currentUser.emailVerified);
            } else {
              currentUser.sendEmailVerification();
              auth.signOut();
              alert("Please verified email");
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        className="login__pic"
      ></img>
      <form onSubmit={formik.handleSubmit} className="login__form">
        <Typography variant="h5" component="h2" className="login__title">
          Sign in
        </Typography>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <button
          className="login__signin"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Sign in
        </button>

        <p className="login__text">
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          // see our Privacy Notice, our Cookies Notice and our Interest-Based
          Ads
        </p>

        <Link className="login__signup" to="./signup">
          Create your Amazon Account
        </Link>
        <Link className="login__recovery" to="./recovery">
          Forgot your password ?
        </Link>
      </form>
    </div>
  );
};

export default Login;
