const Carrinho = {
   valor: 0,
   itens: [],
};

const funcoesCarrinho = {
   setCarrinho: () => {
      localStorage.getItem("carrinho")
         ? console.log()
         : localStorage.setItem("carrinho", JSON.stringify(Carrinho));
   },

   getValorCarrinho: () => {
      return JSON.parse(localStorage.getItem("carrinho")).valor;
   },

   getItensCarrinho: () => {
      return JSON.parse(localStorage.getItem("carrinho")).itens;
   },
};

export default funcoesCarrinho;
