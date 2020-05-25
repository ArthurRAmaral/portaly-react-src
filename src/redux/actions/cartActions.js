import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
  SALVA_KIT,
  REMOVE_KIT_CART,
} from "./actionsTypes";

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
  const kitTratado = trataKit(kit);
  const idKit = criaIdKit(kitTratado.produtos);
  return function (dispatch, getState) {
    dispatch({
      type: SALVA_KIT,
      payload: { [idKit]: kitTratado },
      quantidadeKits: calculaQuantidadeTotalKits(getState()),
      valorTotalKits: calculaValorTotalKits(getState(), kit),
    });
  };
}

export function removeKitCart(kit) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_KIT_CART,
      payload: removeKit(getState(), kit),
      kitRemovido: kit,
    });
  };
}

////////////////////////
///MONTE_SUA_PORTA//////
////////////////////////

function removeKit(state, kit) {
  const idKit = criaIdKit(kit.produtos);
  const kits = state.carrinho.kits;
  let upadateRemovedKits = {
    quantidadeKits: kits.quantidadeKits - 1,
    valorTotalKits: kits.valorTotalKits - kit.quantidade * kit.valorKit,
  };

  for (const kitId in kits) {
    if (
      idKit !== kitId &&
      kitId !== "quantidadeKits" &&
      kitId !== "valorTotalKits"
    )
      upadateRemovedKits = {
        ...upadateRemovedKits,
        [kitId]: kits[kitId],
      };
  }

  return upadateRemovedKits;
}

function calculaValorTotalKits(state, kit) {
  return (
    state.carrinho.kits.valorTotalKits +
    kit.quantidade * parseFloat(kit.valorKit)
  );
}

function calculaQuantidadeTotalKits(state) {
  return state.carrinho.kits.quantidadeKits + 1;
}

function trataKit(kit) {
  let kitTratado = {};
  let produtos = {};
  Object.values(kit.produtos).map((produto) => {
    produtos = {
      ...produtos,
      [produto.slug]: [produto],
    };
  });

  kitTratado = {
    produtos: produtos,
    valorKit: kit.valorKit,
    quantidade: kit.quantidade,
  };

  return kitTratado;
}

function criaIdKit(produtos) {
  let id = "";
  Object.values(produtos).map((produto) => {
    id += produto[0].id;
  });
  return id;
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
    quantidadeTotal: diminuiQuantidade(state),
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

function diminuiQuantidade(state) {
  return state.carrinho.quantidadeTotal - 1;
}
