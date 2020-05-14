import { ADD_CART, REMOVE_CART } from "./actionsTypes";

function add(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    dispatch({
      type: ADD_CART,
      payload: produto,
      name: produto.name,
      quantidade: quantidade,
      variacao: variacao,
      valorTotal: calculaValorTotal(produto.price, quantidade, getState()),
      quantidadeTotal: addQuantidade(getState()),
    });
  };
}

export function addCart(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    if (produtoExiste(produto, getState()))
      dispatch(add(produto, quantidade, variacao));
  };
}

export function removeCart(NAO_SEI_AINDA) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_CART,
      payload: NAO_SEI_AINDA,
    });
  };
}

function produtoExiste(produto, state) {
  for (const produtoName in state.carrinho) {
    if (produto.name === produtoName) return false;
  }

  return true;
}

function calculaValorTotal(price, quantidade, state) {
  return state.carrinho.valorTotal + parseFloat(price) * quantidade;
}

function addQuantidade(state) {
  return state.carrinho.quantidade + 1;
}
