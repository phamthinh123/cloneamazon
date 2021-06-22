import React from "react";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { Grid, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { db, auth } from "../firebase/firebase";
const isVNPhoneMobile =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
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

            // await currentUser.sendEmailVerification();

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
            className="signup__pic"
            src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
          />

          <Typography variant="h4" className="signup__headertitle">
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
          <form onSubmit={formik.handleSubmit} className="signup__form">
            <Typography
              variant="h5"
              component="h2"
              className="signup__title"
              align="center"
            >
              ĐĂNG KÝ
            </Typography>

            <TextField
              fullWidth
              id="name"
              name="name"
              label="Họ tên"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Số điện thoại"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
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
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Nhập lại mật khẩu"
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
            <Typography
              variant="caption"
              component="h2"
              style={{ marginTop: "13px" }}
              className="signup__text"
            >
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our chính sách riêng tư.
            </Typography>

            <button
              className="signup__button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Đăng ký
            </button>
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
            className="signup__title"
            align="center"
            style={{ marginBottom: 20 }}
          >
            ĐĂNG NHẬP
          </Typography>
          <Typography variant="body1" align="center">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </Typography>
          <Link className="signup__redirect" to="./login">
            Đăng nhập
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
