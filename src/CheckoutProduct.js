import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, price, pic, rating, hiddenButton }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };
  return (
    <div className="checkoutproduct">
      <img src={pic} className="checkoutproduct__pic" />
      <div className="checkoutproduct__header">
        <p className="checkoutproduct__title">{title}</p>
        <p className="checkoutproduct__price"> {price}</p>
        <p className="checkoutproduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
        {hiddenButton && (
          <button className="checkoutproduct_button" onClick={removeFromBasket}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
