//From dependencies
import React, {Component} from "react";
import Carrinho from "../../util/Carrinho";
import ApiProdutos from "../../util/ApiProdutos";
import { NavLink } from "react-router-dom";
import InitPath from "../../services/InitPath";


class CarrinhoCompras extends Component {
constructor(props) {
  super(props);

  this.state = {
    valor: 0
  }
}

  async componentDidMount() {
   const itens = Carrinho.getItensCarrinho();
   let val = 0;
   itens.forEach(element => {
    ApiProdutos.getProduto(element.product_id).then(res => {
      val = this.state.valor += parseFloat(res.data.price)*element.quantity;
    this.setState({valor: val})
  });

  })
}

   render() {
   return (
      <NavLink key={`carrinho`} to={`${InitPath}/meuCarrinho`}>
         <div className="cart">
            <img src="" alt="" /> Valor total:{" "}
            <span id="value">{(Math.round(this.state.valor * 100) / 100).toFixed(
      2
   )}</span>
         </div>
      </NavLink>
   );
   }
};

export default CarrinhoCompras;
