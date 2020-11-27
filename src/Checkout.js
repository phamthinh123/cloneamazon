import React from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct.js";
import SubTotal from "./SubTotal";
// import { useStateValue } from "./StateProvider";

function Checkout(props) {
  // const [{ basket }, dispatch] = useStateValue();
  const basket = useSelector((state) => state.basket);
  console.log(basket);
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
              id={i.product.id}
              title={i.product.title}
              price={i.product.price}
              rating={i.product.rating}
              pic={i.product.pic}
              quantity={i.quantity}
              size={i.product.size}
              des={i.product.des}
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
