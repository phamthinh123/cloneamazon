import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import * as actions from "./actions";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
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
      <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <img src={pic} className="checkoutproduct__pic" />
      </Link>
      <div className="checkoutproduct__header">
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <h3 className="checkoutproduct__title">{title}</h3>
        </Link>
        <p className="checkoutproduct__des">{des}</p>
        <p className="checkoutproduct__price"> ${price}</p>
        <p className="checkoutproduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
        <div className="checkoutproduct__option">
          <div className="checkoutproduct__size"> {size}</div>
          {hiddenButton ? (
            <p className="checkoutproduct__quantity">
              <AddIcon
                className="checkoutproduct__plus"
                onClick={() => updateQuantityBasket(id, quantity + 1, size)}
              />
              <span className="checkoutproduct__value">{quantity}</span>
              <RemoveIcon
                className="checkoutproduct__minius"
                onClick={() => updateQuantityBasket(id, quantity - 1, size)}
              />
            </p>
          ) : (
            <span className="checkoutproduct__value">x {quantity}</span>
          )}
        </div>
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
