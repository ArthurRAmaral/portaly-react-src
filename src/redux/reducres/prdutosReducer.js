import { SALVA_PRODUTO_POR_CATEGORIA_POR_ID } from "../actions/actionsTypes";

export default function setProducts(state = {}, action) {
  switch (action.type) {
    case SALVA_PRODUTO_POR_CATEGORIA_POR_ID:
      if (state.valueOf().length) {
        return { [action.slug]: [...action.payload] };
      }
      return {
        ...state,
        [action.id]: [...action.payload],
      };
    default:
      return state;
  }
}
