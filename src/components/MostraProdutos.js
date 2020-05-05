//From depedencies
import React from "react";
import { Link } from "react-router-dom";

//From assets
import imgDefault from "../assets/imgDefault.png";

//From services
import InitPath from "../services/InitPath";

import "../css/components/MostrarProdutos.css";

const MostrarProdutos = (produtos) => {
  return (
    <section className="center-align produtos-list">
      {produtos.length > 0 ? (
        produtos.map((produto) => {
          return (
            <Link
              className="produto"
              key={`link-to-${produto.id}`}
              to={`${InitPath}/produto/${produto.slug}`}
            >
              <div className="card small">
                <div className="card-image">
                  <img
                    key={produto.id}
                    src={
                      produto.images.length > 0
                        ? produto.images[0].src
                        : imgDefault
                    }
                    alt=""
                  />
                </div>
                <div className="produto-dados">
                  <p className="nome grey-text text-darken-4">{produto.name}</p>
                  <p className="preco">R$: {produto.price}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div>Nenhum produto encontrado</div>
      )}
    </section>
  );
};

export default MostrarProdutos;
