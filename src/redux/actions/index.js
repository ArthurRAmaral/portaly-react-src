import { SALVA_CATEGORIAS, PEGA_CATEGORIAS } from "./actionsConstantes";

//From utils
import ApiCategorias from "../../services/ApiCategorias";

export function salvaCategorias(setCat) {
  return function (dispatch) {
    ApiCategorias.getAllCategorias().then((res) => {
      dispatch({
        type: SALVA_CATEGORIAS,
        payload: res.data,
        renderiza: setCat,
      });
    });
  };
}
