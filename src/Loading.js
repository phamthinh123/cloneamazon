import React from "react";
import { useSelector } from "react-redux";
import "./Loading.css";
import Spinner from "./Spinner.png";
function Loading(props) {
  let loading = useSelector((state) => state.loading);
  // let loading = true;
  if (loading) {
    return (
      <div className="loading">
        <div className="loading__content">
          <img className="loading__img" src={Spinner} />
        </div>
      </div>
    );
  }
  return null;
}

export default Loading;
