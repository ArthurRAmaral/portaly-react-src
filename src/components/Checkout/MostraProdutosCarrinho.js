import React from "react";
import { Link } from "react-router-dom";
import imgDefault from "../../assets/imgDefault.png";

import Carrinho from "../../util/Carrinho";

import "../../css/components/MostrarProdutosCarrinho.css";

import InitPath from "../../services/InitPath";

const MostrarProdutos = (props) => {
  const cards = Object.values(props).map((produto) => {
    if (produto.produto) {
      return (
        <div key={produto.produto[0].id}>
          <li className="produto-dados-carrinho">
            <i
              onClick={() => handleRemove(produto.produto[0].id)}
              className="material-icons make-pointer"
            >
              close
            </i>
            <Link
              key={`link-to-${produto.produto[0].id}`}
              to={`${InitPath}/produto/${produto.produto[0].slug}`}
            >
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
                    {produto.produto[0].name}
                  </span>
                  <br></br>
                  <span>
                    Preço unitário: <br></br>
                    <span className="destaque">
                      R${" "}
                      {(
                        Math.round(produto.produto[0].price * 100) / 100
                      ).toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="title-carrinho">
                  <span className="nome-produto-carrinho">
                    Quantidade: <br></br>
                    <span className="destaque">{produto.quantidade}</span>
                  </span>
                  <br></br>
                  <span className="nome-produto-carrinho">
                    Valor Total: <br></br>
                    <span className="destaque">
                      R${" "}
                      {(
                        Math.round(
                          produto.quantidade * produto.produto[0].price * 100
                        ) / 100
                      ).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        </div>
      );
    }
  });

  const handleRemove = (id) => {
    Carrinho.remove(id);
    window.location.reload();
  };

  return (
    <div className="container-carrinho container">
      <div className="card-carrinho card">
        <ul className="list-carrinho">{cards}</ul>
      </div>
    </div>
  );
};

export default MostrarProdutos;
