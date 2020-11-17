import React, { useState } from "react";
import "./Recovery.css";
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
});

const Recovery = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await auth.sendPasswordResetEmail(values.email);
      alert("Please check your email");
      history.push("./login");
    },
  });

  return (
    <div className="recovery">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        className="recovery__pic"
      ></img>
      <form onSubmit={formik.handleSubmit} className="recovery__form">
        <Typography variant="h5" component="h2" className="recovery__title">
          Password Recovery
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

        <button
          className="recovery__signin"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>

        <p className="recovery__text">
          If you no longer use the email address associated with your Amazon
          account, you may contact Customer Service for help restoring access to
          your account.
        </p>
      </form>
    </div>
  );
};

export default Recovery;
