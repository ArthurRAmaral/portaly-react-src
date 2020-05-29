const montadorInit = {
  produtos: {},
  valorKit: 0,
  quantidade: 1,
};

const varName = "montadorDePortas";

const funcoesStorageMontador = {
  resetMontador: () => {
    sessionStorage.setItem(varName, JSON.stringify(montadorInit));
  },

  setMontador: (montador) => {
    sessionStorage.setItem(varName, JSON.stringify(montador));
  },

  getMontador: () => {
    return JSON.parse(sessionStorage.getItem(varName));
  },

  setItem: (categoriaSlug, produto) => {
    let montador = funcoesStorageMontador.getMontador();
    montador.produtos[categoriaSlug] = produto;
    funcoesStorageMontador.setMontador(montador);
  },

  getQuantidade: () => funcoesStorageMontador.getMontador().quantidade,

  setQuantidade: (novaQuantidade) => {
    let montador = funcoesStorageMontador.getMontador();
    montador.quantidade = novaQuantidade;
    funcoesStorageMontador.setMontador(montador);
  },

  getProdutos: () => funcoesStorageMontador.getMontador().produtos,

  setValorKit: () => {
    let montador = funcoesStorageMontador.getMontador();
    let valorTotal = 0;
    Object.values(montador.produtos).map((produto) => {
      valorTotal += parseFloat(produto.price);
    });
    valorTotal *= montador.quantidade;
    montador.valorKit = valorTotal;
    funcoesStorageMontador.setMontador(montador);
  },

  getValorKit: () => funcoesStorageMontador.getMontador().valorKit,
};

export default funcoesStorageMontador;
