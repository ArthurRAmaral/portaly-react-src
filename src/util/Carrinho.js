const Carrinho = {
  valor: 0,
  itens: []
};

const funcoesCarrinho = {

  setCarrinho: () => {
    localStorage.getItem("carrinho")
      ? console.log()
      : localStorage.setItem("carrinho", JSON.stringify(Carrinho));
  },
  
}

export default funcoesCarrinho;
