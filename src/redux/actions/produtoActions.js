import { SALVA_PRODUTO_POR_CATEGORIA_POR_ID } from "./actionsTypes";

//From utils
import ApiProdutos from "../../services/ApiProdutos";

function salvaProdutosPorCategoria(id) {
  return function (dispatch) {
    ApiProdutos.getAllPublishPoductsByCategoriesId(id).then((res) => {
      dispatch({
        type: SALVA_PRODUTO_POR_CATEGORIA_POR_ID,
        payload: res.data,
        id: res.data[0].categories[0].id,
      });
    });
  };
}

function deveBuscar(state, categoriaId) {
  if (!Object.values(state.produtos).length) return true;

  for (const produto in state.produtos) {
    if (produto === categoriaId) return false;
  }

  return true;
}

export function buscaProduto(categoriaId) {
  return function (dispatch, getState) {
    if (deveBuscar(getState(), categoriaId)) {
      dispatch(salvaProdutosPorCategoria(categoriaId));
    }
  };
}
