import axios from "axios";
export const fetchProducts = () => {
  return {
    type: "FETCH_PRODUCTS",
  };
};
export const fetchProductsSuccess = (data) => {
  return {
    type: "FETCH_PRODUCTS_SUCCESS",
    data,
  };
};
export const fetchProductsFailed = (err) => {
  return {
    type: "FETCH_PRODUCTS_FAILED",
    err,
  };
};
export const fetchProductsRequest = () => {
  return (dispatch) => {
    dispatch(fetchProducts());

    return axios
      .get(`http://localhost:3004/products`)
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsFailed(err));
      });
  };
};
export const fetchProductsPaginationSuccess = (data) => {
  return {
    type: "FETCH_PRODUCTS_PAGINATION_SUCCESS",
    data,
  };
};
export const fetchProductsPaginationFailed = (err) => {
  return {
    type: "FETCH_PRODUCT_PAGINATION_FAILED",
    err,
  };
};
export const fetchProductsPagination = (value, value2, value3) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3004/products?${value}&${value2}&${value3}`)
      .then((res) => {
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};

export const fetchProductsSearch = (value, value2, value3, value4) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?q=${value}&_limit=6&_page=${value3}&${value2}&${value4}`
      )
      .then((res) => {
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};
export const fetchProductsSort = (value, value2, value3, value4) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&_limit=6&_page=${value2}&title_like=${value3}&${value4}`
      )
      .then((res) => {
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};
export const fetchProductsSelect = (value, value2, value3, value4) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&_limit=6&_page=${value2}&title_like=${value3}&${value4}`
      )
      .then((res) => {
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};

export const addToBasket = (item, quantity) => {
  return {
    type: "ADD_TO_BASKET",
    item,
    quantity,
  };
};
export const removeFromBasket = (id) => {
  return {
    type: "REMOVE_FROM_BASKET",
    id,
  };
};
export const updateQuantityBasket = (id, quantity) => {
  return {
    type: "UPDATE_QUANTITY_BASKET",
    id,
    quantity,
  };
};
export const emptyBasket = () => {
  return {
    type: "EMPTY_BASKET",
  };
};
export const setUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};
export const showLoading = (user) => {
  return {
    type: "SHOW_LOADING",
  };
};
export const hideLoading = (user) => {
  return {
    type: "HIDE_LOADING",
  };
};
export const setQuery = (value) => {
  return {
    type: "SET_QUERY",
    value,
  };
};
export const setFilter = (value) => {
  return {
    type: "SET_FILTER",
    value,
  };
};
export const setSort = (value) => {
  return {
    type: "SET_SORT",
    value,
  };
};
export const setSelect = (value) => {
  return {
    type: "SET_SELECT",
    value,
  };
};
