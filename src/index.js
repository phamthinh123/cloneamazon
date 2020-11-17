import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider";
import { reducer, initialState } from "./reducer";
import ConfigureStore from "./ConfigureStore";
import { Provider } from "react-redux";
const store = ConfigureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
