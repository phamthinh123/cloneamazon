import React, { useEffect, useState } from "react";
import "./Payment.css";

import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { total } from "./reducer";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "./firebase";

function Payment(props) {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const change = (e) => {
    setDisabled(e.empty);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    console.log(paymentMethod);
    dispatch({
      type: "EMPTY_BASKET",
    });

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .add({
        basket: basket,
        amount: total(basket),
        created: paymentMethod.created,
      });
    history.push("/orders");
  };
  return (
    <div className="payment">
      <h2 className="payment__title">Checkout ({basket?.length} items)</h2>
      <div className="payment__row">
        <div className="payment__left">
          <h3 className="payment__address">Delivery Address</h3>
        </div>
        <div className="payment__right">
          <p>{user?.email}</p>
          <p>123 Le Chan, Hai Phong</p>
        </div>
      </div>
      <div className="payment__row">
        <div className="payment__left">
          <h3 className="payment__product">Review Items and delivery</h3>
        </div>
        <div className="payment__right">
          {basket.map((i) => (
            <CheckoutProduct
              id={i.id}
              title={i.title}
              price={i.price}
              rating={i.rating}
              pic={i.pic}
            />
          ))}
        </div>
      </div>
      <div className="payment__row">
        <div className="payment__left">
          <h3 className="payment__method">Payment method</h3>
        </div>
        <div className="payment__right">
          <form>
            <h5 className="payment__cardtitle">Card Details</h5>
            <CardElement
              onChange={change}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <CurrencyFormat
              renderText={(value) => (
                <div className="subtotal__form1">
                  <p className="subtotal__lineone1">
                    Order Total: <span>{value}</span>
                  </p>

                  <Link to="/payment">
                    <button
                      type="submit"
                      disabled={!stripe}
                      className="subtotal__button1"
                      onClick={handleSubmit}
                    >
                      Buy now
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
