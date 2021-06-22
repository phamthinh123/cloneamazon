import React, { useEffect, useState } from "react";
import "./Orders.css";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector } from "react-redux";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { db } from "../firebase/firebase";
import { Grid, Typography } from "@material-ui/core";

function Orders(props) {
  const user = useSelector((state) => state.user);
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
      <Grid
        container
        direction="column"
        spacing={2}
        xs={12}
        alignItems="center"
        justify="center"
      >
        {orders.map((order) => (
          <Grid item container direction="column" className="order">
            <Typography variant="h4">Đơn Hàng ({order.id})</Typography>
            {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}

            {order.data.basket?.map((i) => (
              <CheckoutProduct
                id={i.id}
                title={i.product.title}
                price={i.product.price}
                rating={i.product.rating}
                pic={i.product.pic}
                quantity={i.quantity}
                size={i.product.size}
                des={i.product.des}
              />
            ))}
            <CurrencyFormat
              renderText={(value) => (
                <div className="order__form">
                  <Typography variant="h6">Tổng Tiền: {value}</Typography>
                </div>
              )}
              decimalScale={2}
              value={order.data.amount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Orders;
