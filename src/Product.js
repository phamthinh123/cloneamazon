import React, { useState } from "react";
import "./Product.css";
// import { useStateValue } from "./StateProvider";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
function Product({ id, title, price, pic, rating, sizes, des }) {
  // const [{ basket }, dispatch] = useStateValue();

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
      <div className="product__header">
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <h2 className="product__title">{title}</h2>
        </Link>
        <p className="product__des">{des}</p>
        <p className="product__price"> ${price}</p>
        <p className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
      </div>
      <Link to={`/product/${id}`}>
        <img src={pic} className="product__pic" />
      </Link>

      <div>
        {sizes.map((i, key) => (
          <button
            className={`product__size ${size == i && "product__active"}`}
            index={key}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="productdetailcomponent__option">
        <p className="productdetailcomponent__quantity">
          <AddIcon
            className="productdetailcomponent__plus"
            onClick={() => updateQuantityBasket(quantity + 1)}
          />
          <span className="productdetailcomponent__value">{quantity}</span>
          <RemoveIcon
            className="productdetailcomponent__minius"
            onClick={() => updateQuantityBasket(quantity - 1)}
          />
        </p>
        <button className="product_button" onClick={addBasket} disabled={!size}>
          Add to basket
        </button>
      </div>
    </div>
  );
}

export default Product;
