import { SALVA_CATEGORIAS } from "./actionsConstantes";

//From utils
import ApiCategorias from "../../services/ApiCategorias";

export async function salvaCategorias() {
  return {
    type: SALVA_CATEGORIAS,
    payload: [await ApiCategorias.getAllCategorias().then((res) => res.data)],
  };
}
