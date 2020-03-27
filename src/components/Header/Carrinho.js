import React from "react"
import Carrinho from "../../util/Carrinho";

const CarrinhoCompras = () => {
  const valor = Carrinho.getCarrinho()

  return (
      <div className="cart">
        <img src="" alt="" /> Valor total:{" "}
        <span id="value">{valor ? valor.valor : 0}</span>
      </div>
  )
}

export default CarrinhoCompras