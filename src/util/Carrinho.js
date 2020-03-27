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
  getCarrinho: () => {
    JSON.parse(localStorage.getItem("carrinho"));
  },


}

export default funcoesCarrinho;
