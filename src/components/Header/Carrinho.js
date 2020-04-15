//From dependencies
import React from "react";
import Carrinho from "../../util/Carrinho";
import { NavLink } from "react-router-dom";
import InitPath from "../../services/InitPath";

const CarrinhoCompras = () => {
   const valor = Carrinho.getValorCarrinho();

   return (
      <NavLink key={`carrinho`} to={`${InitPath}/meuCarrinho`}>
         <div className="cart">
            <img src="" alt="" /> Valor total:{" "}
            <span id="value">{valor ? valor : 0}</span>
         </div>
      </NavLink>
   );
};

export default CarrinhoCompras;
