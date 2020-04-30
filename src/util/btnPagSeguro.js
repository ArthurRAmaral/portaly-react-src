import React from "react";

export default (code, email) => (
  /* <form
    action={`https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`}
    method="get"
  >
    <input type="hidden" name="iot" value="button" />
    <input
      type="image"
      src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/209x48-comprar-assina.gif"
      name="submit"
      alt="Pague com PagSeguro - é rápido, grátis e seguro!"
    />
  </form> */
  <form
    action="https://sandbox.pagseguro.uol.com.br/checkout/v2/payment.html"
    method="get"
  >
    <input type="hidden" name="code" value={code} />
    <i type="hidden" name="iot" value="button" />
    <input
      type="image"
      src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/209x48-comprar-assina.gif"
      name="submit"
      alt="Pague com PagSeguro - é rápido, grátis e seguro!"
    />
  </form>
);
