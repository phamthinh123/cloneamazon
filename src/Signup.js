import React, { useState } from "react";

import "./Signup.css";

import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { db, auth } from "./firebase";
const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  name: yup
    .string()
    .required("Your name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  phone: yup
    .string()
    .required("Your phone is required.")
    .matches(isVNPhoneMobile, "Phone number is not valid"),

  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("password"), null], `Password doesn't match`)

    .required("You need to confirm your password."),
});

const Signup = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(async (user) => {
          if (user) {
            let currentUser = auth.currentUser;

            await currentUser.sendEmailVerification();

            currentUser.updateProfile({
              displayName: values.name,
            });

            db.collection("users").doc(currentUser?.uid).set({
              name: values.name,
              phone: values.phone,
            });
            auth.signOut();
          }
          history.push("./login");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  return (
    <div className="signup">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        className="signup__pic"
      ></img>
      <form onSubmit={formik.handleSubmit} className="signup__form">
        <Typography variant="h5" component="h2" className="login__title">
          Sign up
        </Typography>

        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
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
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <button
          className="signup__button"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Sign up
        </button>

        <p className="signup__text">
          By creating an account, you agree to Amazon's Conditions of Use and
          Privacy Notice.
        </p>
      </form>
    </div>
  );
};

export default Signup;
