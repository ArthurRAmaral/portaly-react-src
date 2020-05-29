import { SALVA_CUPOM } from "./actionsTypes";

export function salvaCupom(valor) {
  return function (dispatch) {
    dispatch({
      type: SALVA_CUPOM,
      payload: valor,
    });
  };
}
