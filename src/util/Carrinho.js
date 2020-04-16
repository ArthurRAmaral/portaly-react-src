const Carrinho = {
   valor: 0,
   itens: [],
};

const varName = "carrinho";

const funcoesCarrinho = {
   resetCarrinho: () => {
      localStorage.getItem(varName)
         ? console.log()
         : localStorage.setItem(varName, JSON.stringify(Carrinho));
   },

   setCarrinho: (val) => {
      localStorage.setItem(varName, JSON.stringify(val));
   },

   getValorCarrinho: () => {
      return JSON.parse(localStorage.getItem(varName)).valor;
   },

   getCarrinho: () => JSON.parse(localStorage.getItem(varName)),

   addItem: (id, preco) => {
      let carrinho = funcoesCarrinho.getCarrinho();
      carrinho.itens.push({ id: id, preco: preco });
      carrinho.valor += preco;
      funcoesCarrinho.setCarrinho(carrinho);
   },
   getItensCarrinho: () => {
      return JSON.parse(localStorage.getItem("carrinho")).itens;
   },
};

export default funcoesCarrinho;
