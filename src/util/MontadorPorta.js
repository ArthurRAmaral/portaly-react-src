const montadorInit = {
  dados: {},
  quantidade: 1,
};

const varName = "montadorportaids";

const funcoesStorageMontador = {
  resetMontador: () => {
    sessionStorage.setItem(varName, JSON.stringify(montadorInit));
  },

  resetMontadorIfEmpty: () => {
    if (!sessionStorage.getItem(varName))
      sessionStorage.setItem(varName, JSON.stringify(montadorInit));
  },

  setMontador: (val) => {
    sessionStorage.setItem(varName, JSON.stringify(val));
  },

  getMontador: () => {
    return JSON.parse(sessionStorage.getItem(varName));
  },

  removeItem: (id) => {
    let montador = funcoesStorageMontador.getMontador();
    if (montador.ids.indexOf(id) >= 0) {
      montador.ids.splice(montador.ids.indexOf(id), 1);
    }
    funcoesStorageMontador.setMontador(montador);
  },

  setItem: (id, categoriaSlug) => {
    let montador = funcoesStorageMontador.getMontador();
    montador.dados[categoriaSlug] =
      montador.dados[categoriaSlug] === id ? 0 : id;
    funcoesStorageMontador.setMontador(montador);
  },

  exists: () => JSON.parse(sessionStorage.getItem(varName)) !== undefined,

  setQuantidade: (quantidade) => {
    let montador = funcoesStorageMontador.getMontador();
    montador.quantidade = quantidade;
    funcoesStorageMontador.setMontador(montador);
  },

  getQuantidade: () => funcoesStorageMontador.getMontador().quantidade,

  getDados: () => funcoesStorageMontador.getMontador().dados,
};

export default funcoesStorageMontador;
