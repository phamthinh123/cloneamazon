import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

// applyMiddleware supercharges createStore with middleware:

const ConfigureStore = () => {
  let middlewares = [thunk];
  const store = createStore(reducer, applyMiddleware(...middlewares));
  return store;
};
export default ConfigureStore;
