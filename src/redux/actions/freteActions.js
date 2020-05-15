import { SALVA_FRETE } from "./actionsTypes";

export function salvaFrete(valor) {
  return function (dispatch) {
    dispatch({
      type: SALVA_FRETE,
      payload: valor,
    });
  };
}
