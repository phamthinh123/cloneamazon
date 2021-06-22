import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: null,
  products: [],
  loading: false,
  data: [],
  // query: "",
  category: "",
  select: {
    category: "",
    rating: "",
  },

  sort: {
    _order: "",
    _sort: "",
  },

  filter: {
    _page: 1,
    _limit: 9,
  },
  number: {
    price_gte: 0,
    price_lte: 9999,
  },
  lengthData: 0,
};
const option = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: false,
};

export const reducer = (state = initialState, action) => {
  let index, index2;
  let newBasket;
  let filterBasket;
  switch (action.type) {
    case "ADD_TO_BASKET":
      index = state.basket.findIndex(
        (i) =>
          i.product.id === action.item.id && i.product.size === action.item.size
      );

      if (index === -1) {
        newBasket = [
          ...state.basket,
          { product: action.item, quantity: action.quantity },
        ];
      } else {
        newBasket = [
          ...state.basket.slice(0, index),
          {
            ...state.basket[index],
            quantity: state.basket[index].quantity + action.quantity,
          },
          ...state.basket.slice(index + 1),
        ];
      }
      toast.success("Thêm thành công !", option);
      localStorage.setItem("basket", JSON.stringify(newBasket));

      return {
        ...state,
        basket: newBasket,
      };
    case "UPDATE_QUANTITY_BASKET":
      index = state.basket.findIndex(
        (i) => i.product.id === action.id && i.product.size === action.size
      );

      if (index === -1) {
        return;
      } else {
        newBasket = [
          ...state.basket.slice(0, index),
          {
            ...state.basket[index],
            quantity: action.quantity,
          },
          ...state.basket.slice(index + 1),
        ];
      }

      localStorage.setItem("basket", JSON.stringify(newBasket));

      return {
        ...state,
        basket: newBasket,
      };

    case "REMOVE_FROM_BASKET":
      newBasket = [...state.basket];
      index = state.basket.findIndex(
        (i) => i.product.id === action.id && i.product.size === action.size
      );
      newBasket.splice(index, 1);
      toast.dark("Xóa thành công !", option);
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "EMPTY_BASKET":
      localStorage.setItem("basket", "[]");
      return {
        ...state,
        basket: [],
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: [],
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.data,
      };
    case "FETCH_PRODUCTS_FAILED":
      return {
        ...state,
        products: [],
      };
    case "FETCH_PRODUCTS_PAGINATION_SUCCESS":
      return {
        ...state,
        data: action.data,
      };
    case "FETCH_PRODUCT_PAGINATION_FAILED":
      return {
        ...state,
        data: [],
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.value,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.value,
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.value,
      };
    case "SET_SELECT":
      return {
        ...state,
        select: action.value,
      };
    case "SET_NUMBER":
      return {
        ...state,
        number: action.value,
      };
    case "SET_LENGTH_DATA":
      return {
        ...state,
        lengthData: action.value,
      };
    case "SET_FILTER_CHANGE":
      return {
        ...state,
        filter: action.value,
      };
    case "SET_SELECT_CATEGORY":
      return {
        ...state,
        select: {
          ...state.select,
          category: action.value,
        },
      };

    default:
      return state;
  }
};
export const total = (basket) =>
  basket?.reduce((total, i) => {
    return total + i.product.price * i.quantity;
  }, 0);
