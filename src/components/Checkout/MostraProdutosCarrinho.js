import React from 'react';
import { Link } from 'react-router-dom';
import imgDefault from '../../assets/imgDefault.png';

import Carrinho from '../../util/Carrinho';

import '../../css/components/MostrarProdutosCarrinho.css';

import InitPath from '../../services/InitPath';

const MostrarProdutos = (produtos, itens) => {
  const qntProdutosCarrinho = new Map();

  itens.map((item) => {
    qntProdutosCarrinho.set(item.product_id, item.quantity);
    return 0;
  });

  const cards = produtos.map((produto) => {
    return (
      <div key={produto.id}>
        <li className="produto-dados-carrinho">
          <i
            onClick={() => handleRemove(produto.id)}
            className="material-icons make-pointer"
          >
            close
          </i>
          <Link
            key={`link-to-${produto.id}`}
            to={`${InitPath}/produto/${produto.slug}`}
          >
            <div className="valign-wrapper">
              <img
                className="img-produto-carrinho"
                key={produto.id}
                src={
                  produto.images.length > 0 ? produto.images[0].src : imgDefault
                }
                alt=""
              />
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
                     R$ {
                    (
                      Math.round(
                        qntProdutosCarrinho.get(produto.id)
                          * produto.price
                          * 100,
                      ) / 100
                    ).toFixed(2) }
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </li>
      </div>
    );
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
