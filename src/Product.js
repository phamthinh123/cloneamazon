import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, pic, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        price,
        pic,
        rating,
      },
    });
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
      <button className="product_button" onClick={addToBasket}>
        Add to basket
      </button>
    </div>
  );
}

export default Product;
