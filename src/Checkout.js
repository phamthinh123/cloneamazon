import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct.js";
import SubTotal from "./SubTotal";
import { useStateValue } from "./StateProvider";

function Checkout(props) {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__pic"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />
        <div className="checkout__basket">
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.map((i) => (
            <CheckoutProduct
              id={i.id}
              title={i.title}
              price={i.price}
              rating={i.rating}
              pic={i.pic}
              hiddenButton={true}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
