import { ADD_CART, REMOVE_CART } from "./actionsTypes";

function add(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    dispatch({
      type: ADD_CART,
      payload: produto,
      name: produto.name,
      quantidade: quantidade,
      variacao: variacao,
      valorTotal: calculaValorTotal(produto.price, getState()),
    });
  };
}

export function addCart(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    if (quantidadeValida(quantidade) && produtoExiste(produto, getState()))
      dispatch(add(produto, quantidade, variacao));
  };
}

function produtoExiste(produto, state) {
  for (const produtoName in state.carrinho) {
    if (produto.name == produtoName) return false;
  }

  return true;
}

function quantidadeValida(quantidade) {
  return !!quantidade;
}

function calculaValorTotal(price, state) {
  return state.carrinho.valorTotal + parseFloat(price);
}

export function removeCart(NAO_SEI_AINDA) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_CART,
      payload: NAO_SEI_AINDA,
    });
  };
}
