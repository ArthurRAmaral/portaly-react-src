import { SALVA_PRODUTO_POR_CATEGORIA_POR_ID } from "./actionsTypes";

//From utils
import ApiProdutos from "../../services/ApiProdutos";

function salvaProdutosPorCategoria(todasCat) {
  return function (dispatch) {
    for (let cat of todasCat) {
      console.log(cat);
      ApiProdutos.getAllPublishPoductsByCategoriesId(cat.id).then((res) => {
        console.log(res);
        dispatch({
          type: SALVA_PRODUTO_POR_CATEGORIA_POR_ID,
          payload: res.data,
          id: res.data[0].categories[0].id,
        });
      });
    }
  };
}

function deveBuscar(state, categoriaId) {
  if (!Object.values(state.produtos).length) return true;

  for (const produto in state.produtos) {
    if (produto === categoriaId) return false;
  }

  return true;
}

export function saveAll(categoriaId) {
  return function (dispatch, getState) {
    if (deveBuscar(getState(), categoriaId)) {
      dispatch(salvaProdutosPorCategoria(categoriaId));
    }
  };
}
