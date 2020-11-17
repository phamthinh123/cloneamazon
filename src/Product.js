import React from "react";
import "./Product.css";
// import { useStateValue } from "./StateProvider";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
function Product({ id, title, price, pic, rating }) {
  // const [{ basket }, dispatch] = useStateValue();

  const dispatch = useDispatch();

  const addBasket = () => {
    dispatch(
      actions.addToBasket(
        {
          id,
          title,
          price,
          pic,
          rating,
        },
        1
      )
    );
  };
  return (
    <div className="product">
      <div className="product__header">
        <p className="product__title">{title}</p>
        <p className="product__price"> {price}</p>
        <p className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
      </div>
      <img src={pic} className="product__pic" />
      <button className="product_button" onClick={addBasket}>
        Add to basket
      </button>
    </div>
  );
}

export default Product;
