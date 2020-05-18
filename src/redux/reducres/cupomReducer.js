import { SALVA_CUPOM } from "../actions/actionsTypes";

export default function setCategorias(state = {}, action) {
  switch (action.type) {
    case SALVA_CUPOM:
      return [...action.payload];
    default:
      return state;
  }
}
