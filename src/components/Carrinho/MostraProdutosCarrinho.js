import React from 'react';
import { Link } from 'react-router-dom';
import imgDefault from '../../assets/imgDefault.png';

import Carrinho from '../../util/Carrinho';

import '../../css/components/MostrarProdutosCarrinho.css';

import InitPath from '../../services/InitPath';

const MostrarProdutos = (props) => {
  const qntProdutosCarrinho = new Map();
  const produtosListados = [];

  props.map((produto) => {
    if (qntProdutosCarrinho.has(produto.id)) {
      qntProdutosCarrinho.set(
        produto.id,
        qntProdutosCarrinho.get(produto.id) + 1,
      );
      return 0;
    }
    qntProdutosCarrinho.set(produto.id, 1);
    return 0;
  });

  const cards = props.map((produto) => {
    if (produtosListados.includes(produto.id)) {
      return null;
    }
    produtosListados.push(produto.id);
    return (<div key={produto.id}>
              <li className="produto-dados-carrinho">
                <Link key={`link-to-${produto.id}`} to={`${InitPath}/produto/${produto.id}`}>
                  <div className="valign-wrapper">
                    <img className="img-produto-carrinho" key={produto.id} src={produto.images.length > 0 ? produto.images[0].src : imgDefault} alt=""/>
                    <div className="title-carrinho">
                        <span className="nome-produto-carrinho">
                           {produto.name}
                        </span>
                        <br></br>
                        <span>
                           Preço unitário: <br></br>
                           <span className="destaque">
                              R${' '}
                              {(Math.round(produto.price * 100) / 100).toFixed(
                                2,
                              )}
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
                              R$
                              {(
                                Math.round(
                                  qntProdutosCarrinho.get(produto.id)
                                       * produto.price
                                       * 100,
                                ) / 100
                              ).toFixed(2)}
                           </span>
                        </span>
                     </div>
                  </div>
                </Link>
                     <i onClick={() => handleRemove(produto.id)} className="material-icons">close</i>
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
