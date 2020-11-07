export const initialState = {
  basket: [],
  user: null,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((i) => i.id === action.id);
      let newBasket = [...state.basket];
      newBasket.splice(index, 1);
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
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
export const total = (basket) =>
  basket?.reduce((total, i) => {
    return total + i.price;
  }, 0);
