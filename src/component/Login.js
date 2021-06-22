import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { Grid, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { auth } from "../firebase/firebase";

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
            // if (currentUser.emailVerified) {
            //   history.push("/");
            //   console.log(user, currentUser.emailVerified);
            // } else {
            //   currentUser.sendEmailVerification();
            //   auth.signOut();
            //   alert("Please verified email");
            // }
            history.push("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  return (
    <div className="login">
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
          lg={6}
          direction="column"
          container
          alignItems="center"
          justify="center"
          style={{
            width: "80%",
            padding: "50px 100px",
          }}
        >
          <form onSubmit={formik.handleSubmit} className="login__form">
            <Typography variant="h5" className="login__title">
              ĐĂNG NHẬP
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
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <button
              className="login__button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Đăng nhập
            </button>

            <Link className="login__recovery" to="./recovery">
              Quên mật khẩu ?
            </Link>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          direction="column"
          container
          alignItems="center"
          align="center"
          style={{
            paddingLeft: "100px",
            paddingRight: "100px",
            paddingTop: "90px",
          }}
        >
          <Typography
            variant="h5"
            className="login__title"
            align="center"
            style={{ marginBottom: 20 }}
          >
            ĐĂNG KÝ
          </Typography>
          <Typography variant="body1" align="center">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </Typography>
          <Link className="login__redirect" to="./signup">
            Đăng ký
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
