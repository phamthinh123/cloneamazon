import React, { useState } from "react";
import "./Recovery.css";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import * as yup from "yup";
import { useFormik } from "formik";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

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
      <Grid container direction="row" spacing={2}>
        <Grid
          item
          xs={12}
          container
          style={{
            position: "relative",
            display: "inline-block",
            height: "200px",
          }}
        >
          <img
            className="login__pic"
            src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
          />

          <Typography variant="h4" className="login__headertitle">
            TÀI KHOẢN
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          direction="column"
          container
          align="center"
          alignItems="center"
          justify="center"
          style={{
            width: "50%",
            padding: "50px 100px",
            margin: "auto",
          }}
        >
          <form onSubmit={formik.handleSubmit} className="recovery__form">
            <Typography variant="h5" className="recovery__title">
              LẤY LẠI MẬT KHẨU
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className="recovery__text"
            >
              Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email. Bạn
              sẽ nhận được một liên kết tạo mật khẩu mới qua email..
            </Typography>

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Địa chỉ email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <button
              className="recovery__button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Đặt lại mật khẩu
            </button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Recovery;
