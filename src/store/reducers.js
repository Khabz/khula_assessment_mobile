import { GET_SCHOOLS } from "./actions";

const initialState = {
  schools: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHOOLS:
      return {
        ...state,
        schools: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
