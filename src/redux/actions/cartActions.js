import { ADD_CART, REMOVE_CART } from "./actionsTypes";

export function addCart(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    if (produtoExiste(produto, getState()))
      dispatch(add(produto, quantidade, variacao));
  };
}

export function removeCart(produtoId) {
  return function (dispatch, getState) {
    if (quantidadeValida(getState())) dispatch(remove(produtoId));
  };
}

function add(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    dispatch({
      type: ADD_CART,
      payload: produto,
      name: produto.name,
      quantidade: quantidade,
      variacao: variacao,
      valorTotal: calculaValorTotal(
        produto.price,
        quantidade,
        getState().carrinho.valorTotal
      ),
      quantidadeTotal: addQuantidade(getState()),
    });
  };
}

function remove(produtoId) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_CART,
      novoState: novoCarrinho(produtoId, getState()),
    });
  };
}

function novoCarrinho(produtoId, state) {
  let carrinho = {
    valorTotal: 0,
    quantidade: 0,
  };
  Object.values(state.carrinho).map((prod) => {
    if (prod.produto && produtoId !== prod.produto[0].id) {
      carrinho = {
        ...carrinho,
        valorTotal: calculaValorTotal(prod.produto[0].price, prod.quantidade),
        quantidade: diminuiQuantidade(state),
        [prod.produto[0].slug]: prod,
      };
    }
  });
  return carrinho;
}

function quantidadeValida(state) {
  return !!state.carrinho.quantidade;
}

function produtoExiste(produto, state) {
  for (const produtoName in state.carrinho) {
    if (produto.name === produtoName) return false;
  }

  return true;
}

function calculaValorTotal(price, quantidade, valorTotal = 0) {
  return valorTotal + parseFloat(price) * quantidade;
}

function addQuantidade(state) {
  return state.carrinho.quantidade + 1;
}

function diminuiQuantidade(state) {
  return state.carrinho.quantidade - 1;
}
