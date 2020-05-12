import { SALVA_CATEGORIAS } from "../actions/actionsTypes";

export default function setCategorias(state = {}, action) {
  switch (action.type) {
    case SALVA_CATEGORIAS:
      return [...action.payload];
    default:
      return state;
  }
}
