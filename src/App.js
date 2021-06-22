// json-server --watch db.json --port 3004
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import * as actions from "./redux/actions";
import Header from "./component/Header";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Recovery from "./component/Recovery";
import ProductDetail from "./component/ProductDetail";
import Kitchen from "./component/Kitchen";
import Checkout from "./component/Checkout";
import Payment from "./component/Payment";
import Orders from "./component/Orders";

import { auth } from "./firebase/firebase";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51Hk6r1ApFJzZC8Cvzt4jOr6MA9ug1eFkV7jlZS0WJGMstNm1oNus12YqRe7a5KmGSggSJk1WaWm8TZt83j37qYM4007Xqdi2YS"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // user==currentUser

        dispatch(actions.setUser(user));
      } else {
        dispatch(actions.setUser(null));
      }
    });
  }, []);
  useEffect(() => {
    dispatch(actions.fetchProductsRequest());
  }, []);

  return (
    <Router>
      <ToastContainer style={{ width: "285px" }} />

      <div className="App">
        <Switch>
          <Route path="/login">
            <Header />
            <Login />
            <Footer />
          </Route>
          <Route path="/signup">
            <Header />
            <Signup />
            <Footer />
          </Route>
          <Route path="/recovery">
            <Header />
            <Recovery />
            <Footer />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route path="/product/:id">
            <Header />
            <ProductDetail />
            <Footer />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/category/:category">
            <Header />
            <Kitchen />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
