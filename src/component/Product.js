import React, { useState } from "react";
import "./Product.css";
import * as actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Grid, Typography } from "@material-ui/core";
function Product({ id, title, price, pic, rating, sizes, des }) {
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const addBasket = () => {
    dispatch(
      actions.addToBasket(
        {
          id,
          title,
          price,
          pic,
          rating,
          size,
          des,
        },
        quantity
      )
    );
  };
  const updateQuantityBasket = (value) => {
    if (value > 0) {
      setQuantity(value);
    }
  };
  const handleClick = (i) => {
    setSize(i);
    setQuantity(1);
  };
  return (
    <div className="product">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item xs={12}>
          <Link to={`/product/${id}`}>
            <img src={pic} className="product__pic" />
          </Link>
          <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
            <Typography variant="h5" align="center" className="product__title">
              {title}
            </Typography>
          </Link>
          <Typography variant="body1" align="center" className="product__price">
            ${price}
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          direction="column"
          className="product__buy"
        >
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="row"
          >
            {sizes.map((i, key) => (
              <Grid item>
                <button
                  className={`product__size ${size == i && "product__active"}`}
                  index={key}
                  onClick={() => handleClick(i)}
                >
                  {i}
                </button>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <AddIcon
              className="product__plus"
              onClick={() => updateQuantityBasket(quantity + 1)}
            />
            <span className="product__value">{quantity}</span>
            <RemoveIcon
              className="product__minius"
              onClick={() => updateQuantityBasket(quantity - 1)}
            />

            <button
              className="product_button"
              onClick={addBasket}
              disabled={!size}
            >
              Thêm Vào Giỏ
            </button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Product;
