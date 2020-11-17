// json-server --watch db.json --port 3004
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Recovery from "./Recovery";
import Login from "./Login";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
// import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import Loading from "./Loading";
import { ToastContainer } from "react-toastify";
import Signup from "./Signup";

const stripePromise = loadStripe(
  "pk_test_51Hk6r1ApFJzZC8Cvzt4jOr6MA9ug1eFkV7jlZS0WJGMstNm1oNus12YqRe7a5KmGSggSJk1WaWm8TZt83j37qYM4007Xqdi2YS"
);

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  let loading = useSelector((state) => state.loading);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user && user.emailVerified) {
        // user==currentUser
        console.log(user, user.emailVerified);
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
      <Loading />
      <ToastContainer style={{ width: "285px" }} />
      {!loading && (
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/recovery">
              <Recovery />
            </Route>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </Route>
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
