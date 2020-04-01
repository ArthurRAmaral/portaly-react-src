const filter = produtos => {
   let categorias = [];
   produtos.forEach(element => {
      if (!categorias.includes(element.categories))
         categorias.push(element.categories);
   });
   console.log(categorias);
   return categorias;
};

export default filter;
