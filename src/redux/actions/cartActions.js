import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
  SALVA_KIT,
  REMOVE_KIT_CART,
  UPDATE_QUANTIDADE_KIT,
} from "./actionsTypes";

import ApiProdutos from "../../services/ApiProdutos";

/////////////
///EXPORTS///
/////////////
export function addCart(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    if (produtoExiste(produto, getState()))
      dispatch(add(produto, quantidade, variacao));
  };
}

export function removeProductCart(produtoId) {
  return function (dispatch, getState) {
    if (quantidadeValida(getState())) dispatch(removeProduto(produtoId));
  };
}
export function updateQuantidade(produtoId, flag) {
  return function (dispatch, getState) {
    dispatch({
      type: UPDATE_QUANTIDADE,
      novoCarrinho: mudaquantidade(getState(), produtoId, flag),
    });
  };
}

export function addKit(kit) {
  return async function (dispatch, getState) {
    const kitTratado = await ApiProdutos.createKit(kit.produtos);

    kitTratado.kit = [kitTratado.kit];

    dispatch({
      type: SALVA_KIT,
      id: kitTratado.kit[0].id,
      kit: kitTratado,
      quantidadeDoKit: kit.quantidade,
      valorDoKit: valorTotalIds(kitTratado.kit[0].grouped_products, getState()),
    });
  };
}

export function removeKit(id) {
  return async function (dispatch, getState) {
    let kits = getState().carrinho.kits;
    const kit = kits[id];
    delete kits[id];
    if (quantidadeValida(getState()))
      dispatch({
        type: REMOVE_KIT_CART,
        kit: kit,
        kitsRemanescentes: kits,
      });
  };
}

export function updateQuantidadeKit(id, novaQuantidade) {
  return async function (dispatch, getState) {
    let kits = getState().carrinho.kits;
    const kit = kits[id];
    let diferencaDeQuantidade;

    const quantidadeAntiga = kit.quantidadeDoKit;

    if (novaQuantidade === "aumenta") {
      diferencaDeQuantidade = 1;
    } else if (novaQuantidade === "diminui") {
      diferencaDeQuantidade = -1;
    } else {
      diferencaDeQuantidade = novaQuantidade - kit.quantidadeDoKit;
    }

    if (novaQuantidade === "diminui") {
      if (quantidadeAntiga > 1) kit.quantidadeDoKit += diferencaDeQuantidade;
      else diferencaDeQuantidade = 0;
    } else kit.quantidadeDoKit += diferencaDeQuantidade;
    dispatch({
      type: UPDATE_QUANTIDADE_KIT,
      kits: kits,
      valorDoKit: kit.valorDoKit,
      diferencaDeQuantidade: diferencaDeQuantidade,
      id: id,
    });
  };
}

//////////////
/////KITS/////
//////////////

function valorTotalIds(idsArray, state) {
  const produtos = state.produtos;
  let precoFinal = 0;

  Object.values(produtos).forEach((prods) => {
    prods.forEach((prod) => {
      if (idsArray.includes(prod.id)) {
        precoFinal += parseFloat(prod.price);
      }
    });
  });

  return precoFinal;
}

//////////////
///PRODUTOS///
//////////////

function mudaquantidade(state, produtoId, flag) {
  let carrinho = state.carrinho;
  let novaQuantidade, newCart;

  newCart = novoCarrinhoProduto(produtoId, state);

  newCart.quantidadeTotal =
    flag === "aumenta" ? addQuantidade(state) : diminuiQuantidade(state);

  if (newCart.quantidadeTotal < 1) return carrinho;

  Object.values(carrinho).map((prod) => {
    if (prod.produto && prod.produto[0].id == produtoId) {
      //NÃO MUDE PARA ===
      novaQuantidade = novaQuant(flag, prod);

      if (novaQuantidade < 1) return carrinho;

      newCart.valorTotal = valorTotalMudaQuantidade(
        carrinho.valorTotal,
        prod,
        novaQuantidade
      );
      prod.quantidade = novaQuantidade;
      newCart = {
        ...newCart,
        [prod.produto[0].slug]: prod,
      };
    }
  });

  if (novaQuantidade < 1) return carrinho;

  return newCart;
}

function valorTotalMudaQuantidade(valorTotal, produto, novaQuantidade) {
  return (valorTotal =
    valorTotal -
    produto.quantidade * produto.produto[0].price +
    novaQuantidade * produto.produto[0].price);
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
      quantidadeTotal: addQuantidadeComParametro(getState(), quantidade),
    });
  };
}

function removeProduto(produtoId) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_CART,
      novoState: novoCarrinhoProduto(produtoId, getState()),
    });
  };
}

function novoCarrinhoProduto(produtoId, state) {
  let carrinho = {};
  let prodRemovido;

  Object.values(state.carrinho).map((prod) => {
    if (prod.produto && produtoId == prod.produto[0].id) prodRemovido = prod;
  });

  Object.values(state.carrinho).map((prod) => {
    if (prod.produto && produtoId != prod.produto[0].id) {
      //NÃO MUDE PARA !==, pois quebra a função
      carrinho = {
        ...carrinho,
        [prod.produto[0].slug]: prod,
      };
    }
  });
  carrinho = {
    ...carrinho,
    quantidadeTotal: diminuiQuantidade(state, prodRemovido.quantidade),
    valorTotal: calculaValorTotalRemover(state, prodRemovido),
    kits: { ...state.carrinho.kits },
  };

  return carrinho;
}

/////////////
///GERAIS////
/////////////

function novaQuant(flag, produto) {
  if (flag === "aumenta") return produto.quantidade + 1;
  if (flag === "diminui") return produto.quantidade - 1;
}

function calculaValorTotalRemover(state, prodRemovido) {
  return (
    state.carrinho.valorTotal -
    prodRemovido.quantidade * parseFloat(prodRemovido.produto[0].price)
  );
}

function quantidadeValida(state) {
  return !!state.carrinho.quantidadeTotal;
}

function produtoExiste(produto, state) {
  for (const produtoName in state.carrinho) {
    if (produto.name === produtoName) return false;
  }

  return true;
}

function calculaValorTotal(price, quantidade, valorTotal, valorTotalKit = 0) {
  return valorTotal + parseFloat(price) * quantidade + valorTotalKit;
}

function addQuantidadeComParametro(state, quantidade) {
  return state.carrinho.quantidadeTotal + quantidade;
}

function addQuantidade(state) {
  return state.carrinho.quantidadeTotal + 1;
}

function diminuiQuantidade(state, quantidade = 0) {
  return state.carrinho.quantidadeTotal - (quantidade ? quantidade : 1);
}
