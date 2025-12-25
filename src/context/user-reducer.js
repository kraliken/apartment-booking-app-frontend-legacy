import { GET_AUTH_USER, LOGOUT_USER } from "./user-actions"

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuth: false
      }
    default:
      return state;
  }

}

export default userReducer