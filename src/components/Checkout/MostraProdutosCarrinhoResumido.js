import React from "react";

import Carrinho from "../../util/Carrinho";

import "../../css/components/MostrarProdutosCarrinho.css";

const MostrarProdutos = (produtos) => {
  const qntProdutosCarrinho = new Map();

  const cards = produtos.map((produto) => {
    return (
      <div key={produto.id}>
        <li className="produto-dados-carrinho">
          <div className="valign-wrapper">
            <div className="title-carrinho">
              <span className="nome-produto-carrinho">{produto.name}</span>
              <br></br>
              <span>
                Preço unitário: <br></br>
                <span className="destaque">
                  R$ {(Math.round(produto.price * 100) / 100).toFixed(2)}
                </span>
              </span>
            </div>
            <div className="title-carrinho">
              <span className="nome-produto-carrinho">
                Quantidade: <br></br>
                <span className="destaque">
                  {qntProdutosCarrinho.get(produto.id)}
                </span>
              </span>
              <br></br>
              <span className="nome-produto-carrinho">
                Valor Total: <br></br>
                <span className="destaque">
                  R${" "}
                  {(
                    Math.round(
                      qntProdutosCarrinho.get(produto.id) * produto.price * 100
                    ) / 100
                  ).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        </li>
      </div>
    );
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
