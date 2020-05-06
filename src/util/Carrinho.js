const Carrinho = {
  itens: [],
};

const varName = "carrinho";

const funcoesCarrinho = {
  reset: () => {
    localStorage.setItem(varName, JSON.stringify(Carrinho));
  },
  resetCarrinho: () => {
    localStorage.getItem(varName)
      ? console.log()
      : localStorage.setItem(varName, JSON.stringify(Carrinho));
  },

  setCarrinho: (val) => {
    localStorage.setItem(varName, JSON.stringify(val));
  },

  getCarrinho: () => JSON.parse(localStorage.getItem(varName)),

  addItem: (id) => {
    const carrinho = funcoesCarrinho.getCarrinho();

    let achou = false;
    carrinho.itens.forEach((element) => {
      if (element.product_id === id) {
        element.quantity++;
        achou = true;
      }
    });

    if (!achou) carrinho.itens.push({ product_id: id, quantity: 1 });

    funcoesCarrinho.setCarrinho(carrinho);
  },

  getItensCarrinho: () => JSON.parse(localStorage.getItem("carrinho")).itens,

  remove: async (id) => {
    const carrinho = funcoesCarrinho.getCarrinho();

    carrinho.itens = carrinho.itens.filter((item) => item.product_id !== id);

    funcoesCarrinho.setCarrinho(carrinho);
  },
};

export default funcoesCarrinho;
