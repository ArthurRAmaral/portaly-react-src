export function paginar(produtos, quantidadePorPag) {
  produtos = produtos || [];
  let paginas = [];
  let j = 0;
  paginas[j] = [];

  for (let i = 0; i < produtos.length; i++) {
    paginas[j].push(produtos[i]);
    if (i + 1 < produtos.length && (i + 1) % quantidadePorPag === 0) {
      j++;
      paginas[j] = [];
    }
  }

  setTimeout(100000, alert);

  return paginas;
}
