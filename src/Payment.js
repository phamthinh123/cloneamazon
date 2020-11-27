import React, { useEffect, useState } from "react";
import "./Payment.css";

// import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { total } from "./reducer";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";

function Payment(props) {
  // const [{ user }] = useStateValue();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [phone, setPhone] = useState("");
  db.collection("users")
    .doc(user?.uid)
    .onSnapshot((snapshot) => setPhone(snapshot.data().phone));
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

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .add({
        basket: basket,
        amount: total(basket),
        created: paymentMethod.created,
      });

    dispatch(actions.emptyBasket());
    history.push("/orders");
  };
  return (
    <div className="payment">
      <h2 className="payment__title">Checkout ({basket?.length} items)</h2>
      <div className="payment__row">
        <div className="payment__left">
          <h3 className="payment__address">Delivery Address</h3>
        </div>
        <div className="payment__right payment__one">
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
          <p>{phone}</p>
        </div>
      </div>
      <div className="payment__row">
        <div className="payment__left">
          <h3 className="payment__product">Review Items and delivery</h3>
        </div>
        <div className="payment__right">
          {basket.map((i) => (
            <CheckoutProduct
              id={i.product.id}
              title={i.product.title}
              price={i.product.price}
              rating={i.product.rating}
              pic={i.product.pic}
              quantity={i.quantity}
              size={i.product.size}
              des={i.product.des}
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
                      disabled={!stripe || disabled || !user}
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
