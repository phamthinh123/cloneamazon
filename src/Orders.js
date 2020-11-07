import React, { useEffect, useState } from "react";
import "./Orders.css";
import moment from "moment";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { db } from "./firebase";

function Orders(props) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      {orders.map((order) => (
        <div className="order">
          <div className="order__info">
            <h2>Order ({order.id})</h2>
            <p>
              {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
          </div>
          {order.data.basket?.map((i) => (
            <CheckoutProduct
              id={i.id}
              title={i.title}
              price={i.price}
              rating={i.rating}
              pic={i.pic}
            />
          ))}
          <CurrencyFormat
            renderText={(value) => (
              <div className="subtotal__form1">
                <p className="subtotal__lineone1">
                  Order Total: <span>{value}</span>
                </p>
              </div>
            )}
            decimalScale={2}
            value={order.data.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
      ))}
    </div>
  );
}

export default Orders;
