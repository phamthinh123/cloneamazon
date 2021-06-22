import React, { useState } from "react";
import "./Payment.css";
import * as actions from "../redux/actions";
import {
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import CheckoutProduct from "./CheckoutProduct";
import { total } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db, auth } from "../firebase/firebase";

import * as yup from "yup";
import { Field, useFormik } from "formik";

const isVNPhoneMobile =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  city: yup
    .string("Enter your city")

    .required("City is required"),
  address: yup
    .string("Enter your address")
    .min(4, "Too short.")
    .required("City is address"),
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
function Payment(props) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [phone, setPhone] = useState("");
  db.collection("users")
    .doc(user?.uid)
    .onSnapshot((snapshot) => setPhone(snapshot.data().phone));

  const formik = useFormik({
    initialValues: {
      name: user?.displayName,
      phone: phone,
      email: user?.email,
      city: "",
      address: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(async (user) => {})
        .catch((error) => {
          alert(error.message);
        });
    },
  });
  const change = (e) => {
    setDisabled(e.empty);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .add({
        basket: basket,
        amount: total(basket),
        created: paymentMethod.created,
      });

    dispatch(actions.emptyBasket());
    history.push("/orders");
  };
  return (
    <div className="payment">
      <Grid container direction="column" spacing={2}>
        <Grid
          item
          xs={12}
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <img
            className="payment__pic"
            src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
          />

          <Typography variant="h4" className="payment__title">
            THANH TOÁN
          </Typography>
        </Grid>
        <Grid item container xs={12} direction="row" alignItems="flex-start">
          <Grid
            item
            xs={12}
            md={6}
            direction="column"
            container
            alignItems="center"
            justify="center"
            style={{ padding: 40 }}
          >
            <form onSubmit={formik.handleSubmit} className="signup__form">
              <Typography
                variant="h5"
                component="h2"
                className="signup__title"
                align="center"
              >
                THÔNG TIN THANH TOÁN
              </Typography>

              <Grid item container xs={12} direction="row">
                <Grid item xs={12} style={{ padding: 10 }}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Họ và tên"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: 10 }}>
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
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: 10 }}>
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
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: 10 }}>
                  <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="Tỉnh/Thành phố"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: 10 }}>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Địa chỉ"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ padding: 10 }}>
                <FormControlLabel
                  control={<Checkbox name="checkedB" color="primary" />}
                  label="Đăng ký nhận khuyến mãi"
                />
              </Grid>
              <Grid item xs={12} style={{ padding: 10 }}>
                <Link to="./signup" style={{ fontWeight: "bold" }}>
                  Tạo tài khoản mới?
                </Link>
              </Grid>
            </form>
            <Grid item xs={12}>
              <img
                className="productdetailcomponent__row"
                src="https://holame.net/wp-content/uploads/2020/10/Giao-hàng-COD-toàn-quốc-1.png"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            direction="column"
            container
            alignItems="center"
            justify="center"
            style={{ padding: 70 }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="h2"
                className="signup__title"
                align="center"
              >
                ĐƠN HÀNG CỦA BẠN
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                className="payment__cardtitle"
                style={{ fontWeight: "bold" }}
              >
                Sản phẩm
              </Typography>
              {basket.map((i) => (
                <CheckoutProduct
                  id={i.product.id}
                  title={i.product.title}
                  price={i.product.price}
                  rating={i.product.rating}
                  pic={i.product.pic}
                  quantity={i.quantity}
                  size={i.product.size}
                  des={i.product.des}
                />
              ))}
            </Grid>

            <Grid
              item
              xs={12}
              direction="column"
              container
              style={{ paddingLeft: "10px", paddingTop: 20 }}
            >
              <form>
                <Typography
                  variant="h6"
                  className="payment__cardtitle"
                  style={{ marginBottom: 10, fontWeight: "bold" }}
                >
                  Thông Tin Thẻ
                </Typography>

                <CardElement
                  onChange={change}
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <CurrencyFormat
                  renderText={(value) => (
                    <div className="payment__form">
                      <Typography variant="h6" className="payment__total">
                        Tổng Tiền: <span>{value}</span>
                      </Typography>
                      <Link to="/payment">
                        <button
                          type="submit"
                          disabled={!stripe || disabled || !user}
                          className="payment__button"
                          onClick={handleSubmit}
                        >
                          Thanh Toán
                        </button>
                      </Link>
                    </div>
                  )}
                  decimalScale={2}
                  value={total(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Payment;
