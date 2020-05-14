import { SALVA_FRETE } from "../actions/actionsTypes";

export default function setCategorias(state = {}, action) {
  switch (action.type) {
    case SALVA_FRETE:
      return [...action.payload];
    default:
      return state;
  }
}
