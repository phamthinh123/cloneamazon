import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import * as actions from "./actions";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function CheckoutProduct({
  id,
  title,
  price,
  pic,
  rating,
  hiddenButton,
  quantity,
}) {
  // const [{ basket }, dispatch] = useStateValue();
  const dispatch = useDispatch();
  const removeFromBasket = () => {
    dispatch(actions.removeFromBasket(id));
  };
  const updateQuantityBasket = (id, quantity) => {
    if (quantity > 0) {
      dispatch(actions.updateQuantityBasket(id, quantity));
    }
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
        {hiddenButton ? (
          <p className="checkoutproduct__quantity">
            <AddIcon
              className="checkoutproduct__plus"
              onClick={() => updateQuantityBasket(id, quantity + 1)}
            />
            <span className="checkoutproduct__value">{quantity}</span>
            <RemoveIcon
              className="checkoutproduct__minius"
              onClick={() => updateQuantityBasket(id, quantity - 1)}
            />
          </p>
        ) : (
          <span className="checkoutproduct__value">x {quantity}</span>
        )}
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
