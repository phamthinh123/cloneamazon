import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import queryString from "query-string";

function Header() {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.filter);
  const select = useSelector((state) => state.select);
  console.log(select);
  useEffect(() => {
    const fetch = async () => {
      if (select.category != "" && select.rating != "") {
        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(select);
        dispatch(
          actions.fetchProductsSearch(
            query,
            stringified2,
            filter._page,
            stringified3
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSearch(
            query,
            stringified2,
            filter._page,
            `category=${select.category}`
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSearch(
            query,
            stringified2,
            filter._page,
            `rating=${select.rating}`
          )
        );
      } else {
        const stringified2 = queryString.stringify(sort);
        dispatch(
          actions.fetchProductsSearch(query, stringified2, filter._page, null)
        );
      }
    };
    fetch();
  }, [query]);
  const signout = () => {
    auth.signOut();
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__pic"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="header__search">
        <input
          className="header__input"
          type="text"
          value={query}
          onChange={(e) => dispatch(actions.setQuery(e.target.value))}
        />
        <SearchIcon className="header__searchicon" fontSize="small" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={signout}>
            <span className="header__optionlineone">
              Hello {user ? user.displayName : ""}
            </span>
            <span className="header__optionlinetwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/"}>
          <div className="header__option">
            <span className="header__optionlineone">Returns</span>
            <span className="header__optionlinetwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionlineone">Your</span>
          <span className="header__optionlinetwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__basket">
            <ShoppingBasketIcon />
            <span className="header__basketlinetwo">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
