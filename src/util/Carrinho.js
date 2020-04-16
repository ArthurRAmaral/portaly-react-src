const Carrinho = {
  valor: 0,
  itens: [],
};

const varName = 'carrinho';

const funcoesCarrinho = {
  resetCarrinho: () => {
    localStorage.getItem(varName)
      ? console.log()
      : localStorage.setItem(varName, JSON.stringify(Carrinho));
  },

  setCarrinho: (val) => {
    localStorage.setItem(varName, JSON.stringify(val));
  },

  getValorCarrinho: () => JSON.parse(localStorage.getItem(varName)).valor,

  getCarrinho: () => JSON.parse(localStorage.getItem(varName)),

  addItem: (id, preco) => {
    preco = parseFloat(preco);
    const carrinho = funcoesCarrinho.getCarrinho();
    carrinho.itens.push({ id, preco });
    carrinho.valor += preco;
    funcoesCarrinho.setCarrinho(carrinho);
  },
  getItensCarrinho: () => JSON.parse(localStorage.getItem('carrinho')).itens,
  remove: (id) => {
    const carrinho = funcoesCarrinho.getCarrinho();
    const novoCarro = { valor: 0, itens: [] };

    carrinho.itens.forEach((item) => {
      if (item.id !== id) { novoCarro.itens.push(item); }
    });

    novoCarro.itens.forEach((item) => {
      novoCarro.valor += parseFloat(item.preco);
    });

    funcoesCarrinho.setCarrinho(novoCarro);
  },

};

export default funcoesCarrinho;
