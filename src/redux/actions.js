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
        console.log(res);
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
export const fetchProductsPagination = (value, value2, value3, value5) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&${value2}&${value3}&${value5}`
      )
      .then((res) => {
        dispatch(setLengthData(res.headers["x-total-count"]));
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};

// export const fetchProductsSearch = (value) => {
//   return (dispatch) => {
//     return axios
//       .get(`http://localhost:3004/products?title_like=${value}`)
//       .then((res) => {
//         dispatch(setLengthData(res.headers["x-total-count"]));
//         dispatch(fetchProductsPaginationSuccess(res.data));
//       })
//       .catch((err) => {
//         dispatch(fetchProductsPaginationFailed(err));
//       });
//   };
// };
export const fetchProductsSort = (value, value2, value3) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&_limit=9&_page=1&${value2}&${value3}`
      )
      .then((res) => {
        dispatch(
          setFilterChange({
            _page: 1,
            _limit: 9,
          })
        );
        dispatch(setLengthData(res.headers["x-total-count"]));
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};
export const fetchProductsSelect = (value, value2, value3) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&_limit=9&_page=1&${value2}&${value3}`
      )
      .then((res) => {
        dispatch(
          setFilterChange({
            _page: 1,
            _limit: 9,
          })
        );
        dispatch(setLengthData(res.headers["x-total-count"]));
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};
export const fetchProductsNumber = (value, value2, value3) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3004/products?${value}&_limit=9&_page=1&${value2}&${value3}`
      )
      .then((res) => {
        dispatch(
          setFilterChange({
            _page: 1,
            _limit: 9,
          })
        );
        dispatch(setLengthData(res.headers["x-total-count"]));
        dispatch(fetchProductsPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsPaginationFailed(err));
      });
  };
};

export const fetchProductById = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3004/products/${id}`)
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
export const removeFromBasket = (id, size) => {
  return {
    type: "REMOVE_FROM_BASKET",
    id,
    size,
  };
};
export const updateQuantityBasket = (id, quantity, size) => {
  return {
    type: "UPDATE_QUANTITY_BASKET",
    id,
    quantity,
    size,
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
export const setNumber = (value) => {
  return {
    type: "SET_NUMBER",
    value,
  };
};
export const setLengthData = (value) => {
  return {
    type: "SET_LENGTH_DATA",
    value,
  };
};
export const setFilterChange = (value) => {
  return {
    type: "SET_FILTER_CHANGE",
    value,
  };
};
export const setSelectCategory = (value) => {
  return {
    type: "SET_SELECT_CATEGORY",
    value,
  };
};
