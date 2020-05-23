import { SALVA_CATEGORIAS } from "./actionsTypes";

//From utils
import ApiCategorias from "../../services/ApiCategorias";

import { buscaProduto } from "./produtoActions";

export function salvaCategorias() {
  return function (dispatch) {
    ApiCategorias.getAllCategorias().then((res) => {
      res.data.map((categoria) => buscaProduto(categoria.id));
      dispatch({
        type: SALVA_CATEGORIAS,
        payload: res.data,
      });
    });
  };
}
