import React from "react";
import PagSeguro from "../util/PagSeguro";

export default (code) => {
  console.log(code);
  return (
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
};
