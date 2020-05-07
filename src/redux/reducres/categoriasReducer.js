import { SALVA_CATEGORIAS } from "../actions/actionsConstantes";

export default function setCategorias(state = {}, action) {
  switch (action.type) {
    case SALVA_CATEGORIAS:
      return { categorias: [...action.payload] };
    default:
      return state;
  }
}
