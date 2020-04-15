const montadorInit = [];

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

   exists: () => JSON.parse(sessionStorage.getItem(varName)) !== undefined,
};

export default funcoesStorageMontador;
