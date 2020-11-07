import React from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { total } from "./reducer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function SubTotal(props) {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div className="subtotal__form">
            <p className="subtotal__lineone">
              Subtotal ({basket.length}): <span>{value}</span>
            </p>
            <div className="subtotal__input">
              <input type="checkbox" className="subtotal__checkbox" />
              This order contains a gift
            </div>

            <Link to="/payment">
              <button className="subtotal__button" disabled={!basket.length}>
                Proceed to Checkout
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
    </div>
  );
}

export default SubTotal;
