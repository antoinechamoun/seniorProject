import * as actionTypes from "../constants/chatConstants";

export const setChatRooms = (user, message) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHAT_ROOMS,
    payload: {
      user: user,
      message: message,
    },
  });
};

export const setSocket = (socket) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_SOCKET,
    payload: {
      socket: socket,
    },
  });
};
