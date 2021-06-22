import React from "react";
import CheckoutProduct from "./CheckoutProduct.js";
import "./Basket.css";
import { total } from "../redux/reducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CurrencyFormat from "react-currency-format";
function Basket(props) {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);

  return (
    <div className="basket">
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} container style={{ padding: 20 }}>
          <img
            className="basket__pic"
            src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
          />

          <Typography variant="h4" className="basket__title">
            GIỎ HÀNG CỦA BẠN
          </Typography>
        </Grid>
        {basket.length ? (
          <Grid item xs={12} container item>
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
                hiddenButton={true}
              />
            ))}
          </Grid>
        ) : (
          <Grid item xs={12} container item justify="center">
            <ShoppingCartIcon fontSize="large" className="basket__emptyicon" />

            <Typography
              variant="body1"
              gutterBottom
              align="center"
              style={{ fontWeight: 800 }}
            >
              CHƯA CÓ SẢN PHẨM TRONG GIỎ HÀNG.
            </Typography>
            <Link to="/category/none" exact>
              <button className="basket__button">VÀO TRANG SẢN PHẨM</button>
            </Link>
          </Grid>
        )}

        {basket.length ? (
          <CurrencyFormat
            renderText={(value) => (
              <div className="payment__form">
                <Typography variant="h6" className="payment__total">
                  Tổng Tiền: <span>{value}</span>
                </Typography>

                <Link to="/checkout">
                  <button className="basket__button1">XEM GIỎ HÀNG</button>
                </Link>
                <Link to="/payment">
                  <button
                    className="basket__button2"
                    disabled={!basket.length || !user}
                  >
                    THANH TOÁN
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
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}

export default Basket;
