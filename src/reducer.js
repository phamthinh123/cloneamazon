import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: null,
  products: [],
  loading: false,
  data: [],
  query: "",
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
    title_like: "",
    _page: 1,
    _limit: 6,
  },
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
  let index;
  let newBasket;
  switch (action.type) {
    case "ADD_TO_BASKET":
      index = state.basket.findIndex((i) => i.product.id === action.item.id);

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
            quantity: state.basket[index].quantity + 1,
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
      index = state.basket.findIndex((i) => i.product.id === action.id);

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
      index = state.basket.findIndex((i) => i.product.id === action.id);
      newBasket.splice(index, 1);
      toast.dark("Xóa thành công !", option);
      localStorage.success("basket", JSON.stringify(newBasket));
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

    default:
      return state;
  }
};
export const total = (basket) =>
  basket?.reduce((total, i) => {
    return total + i.product.price * i.quantity;
  }, 0);
