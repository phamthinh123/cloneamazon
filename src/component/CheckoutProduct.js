import React from "react";
import "./CheckoutProduct.css";
import * as actions from "../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Grid, Typography } from "@material-ui/core";

function CheckoutProduct({
  id,
  title,
  price,
  pic,
  rating,
  size,
  des,
  hiddenButton,
  quantity,
}) {
  // const [{ basket }, dispatch] = useStateValue();
  const dispatch = useDispatch();
  const removeFromBasket = () => {
    dispatch(actions.removeFromBasket(id, size));
  };
  const updateQuantityBasket = (id, quantity, size) => {
    if (quantity > 0) {
      dispatch(actions.updateQuantityBasket(id, quantity, size));
    }
  };

  return (
    <div className="checkoutproduct">
      <Grid
        item
        container
        direction="row"
        spacing={2}
        xs={12}
        alignItems="flex-start"
      >
        <Grid item xs={5}>
          <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
            <img src={pic} className="checkoutproduct__pic" />
          </Link>
        </Grid>
        <Grid item xs={7} container direction="column">
          <Grid item xs={12}>
            <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                gutterBottom
                color="textPrimary"
                className="checkoutproduct__title"
              >
                {title}
              </Typography>
            </Link>
            <Typography
              variant="body1"
              gutterBottom
              color="textPrimary"
              className="checkoutproduct__price"
              style={{ fontWeight: "bold" }}
            >
              ${price * quantity}
            </Typography>
          </Grid>
          {hiddenButton ? (
            <Grid item xs={12} container direction="row" alignItems="center">
              <div className="checkoutproduct__size"> {size}</div>
              <AddIcon
                className="product__plus"
                onClick={() => updateQuantityBasket(id, quantity + 1, size)}
              />
              <span className="product__value">{quantity}</span>
              <RemoveIcon
                className="product__minius"
                onClick={() => updateQuantityBasket(id, quantity - 1, size)}
              />
            </Grid>
          ) : (
            <span className="checkoutproduct__value">x {quantity}</span>
          )}

          {hiddenButton && (
            <Grid item xs={12}>
              <button
                className="checkoutproduct_button"
                onClick={removeFromBasket}
              >
                Xóa Khỏi Giỏ Hàng
              </button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutProduct;
