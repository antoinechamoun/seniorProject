import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productAddedToCart = action.payload;
      const productAlreadyExists = state.cartItems.find(
        (item) => item.productId === productAddedToCart.productId
      );

      const currentState = { ...state };

      if (productAlreadyExists) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = state.cartItems.map((item) => {
          if (item.productId === productAlreadyExists.productId) {
            currentState.itemsCount += Number(productAddedToCart.quantity);
            const sum =
              Number(productAddedToCart.quantity) *
              Number(productAddedToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemsCount += Number(item.quantity);
            const sum = Number(item.quantity) * Number(item.price);
            currentState.cartSubtotal += sum;
          }
          return item.productId === productAlreadyExists.productId
            ? productAddedToCart
            : item;
        });
      } else {
        currentState.itemsCount += Number(productAddedToCart.quantity);
        const sum =
          Number(productAddedToCart.quantity) *
          Number(productAddedToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems, productAddedToCart];
      }
      return currentState;

    default:
      return state;
  }
};
