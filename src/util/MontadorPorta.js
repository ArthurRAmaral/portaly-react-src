const montadorInit = { ids: [], quantidade: 1 };

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

   addItem: (id) => {
      let montador = funcoesStorageMontador.getMontador();
      montador.ids.push(id);
      funcoesStorageMontador.setMontador(montador);
   },

   exists: () => JSON.parse(sessionStorage.getItem(varName)) !== undefined,

   includes: (id) => funcoesStorageMontador.getMontador().ids.includes(id),

   setQuantidade: (quantidade) => {
      let montador = funcoesStorageMontador.getMontador();
      montador.quantidade = quantidade;
      funcoesStorageMontador.setMontador(montador);
   },

   getQuantidade: () => funcoesStorageMontador.getMontador().quantidade,
};

export default funcoesStorageMontador;
