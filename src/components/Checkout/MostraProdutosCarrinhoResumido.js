import React from "react";
import imgDefault from "../../assets/imgDefault.png";

import "../../css/components/MostrarProdutosCarrinho.css";

const MostrarProdutos = (props) => {
  const cards = Object.values(props).map((produto) => {
    if (produto.produto) {
      return (
        <li key={produto.produto[0].id} className="produto-dados-carrinho">
          <div key={produto.produto[0].id}>
            <div className="valign-wrapper">
              <img
                className="img-produto-carrinho"
                key={produto.produto[0].id}
                src={
                  produto.produto[0].images.length > 0
                    ? produto.produto[0].images[0].src
                    : imgDefault
                }
                alt=""
              />
              <div className="title-carrinho">
                <span className="nome-produto-carrinho">
                  {produto.produto[0].name} x {produto.quantidade} unidades
                </span>
                <br></br>
                <span>
                  Preço unitário:
                  <span className="destaque">
                    R${" "}
                    {(Math.round(produto.produto[0].price * 100) / 100).toFixed(
                      2
                    )}{" "}
                    - Total: R$
                    {(
                      Math.round(
                        produto.quantidade * produto.produto[0].price * 100
                      ) / 100
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </li>
      );
    } else return null;
  });

  return (
    <div className="container-carrinho container">
      <div className="card-carrinho card">
        <ul className="list-carrinho">{cards}</ul>
      </div>
    </div>
  );
};

export default MostrarProdutos;
