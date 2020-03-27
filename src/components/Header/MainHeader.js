import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Carrinho from "../../util/Carrinho";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="https://demo.skeavee.com/portaly/wp-content/uploads/2020/03/Portaly_PNG_Background.png"
        alt=""
        className="logo center-children"
      />
    </Link>
  )
}

const Busca = () => {
  return (
    <div className="row">
      <form>
        <div className="search-area">
          <input
            type="text"
            className="search-input"
            placeholder="Busque um produto"
          />
        </div>
      </form>
    </div>
  )
}

const CarrinhoCompras = () => {
  const valor = Carrinho.getCarrinho()

  return (
      <div className="cart">
        <img src="" alt="" /> Valor total:{" "}
        <span id="value">{valor ? valor.valor : 0}</span>
      </div>
  )
}

const Categorias = () => {
  return (
    <Fragment>
      <li className="category">
        <a href="#Alizar">Alizar</a>
      </li>
      <li className="category">
        <a href="#Dobradica">Dobradiça</a>
      </li>
      <li className="category">
        <a href="#Fechadura">Fechadura</a>
      </li>
      <li className="category">
        <a href="#KitDeCorrer">Kit de Correr</a>
      </li>
      <li className="category">
        <a href="#Marco">Marco (Batente)</a>
      </li>
      <li className="category">
        <a href="#Outros">Outros</a>
      </li>
      <li className="category">
        <a href="#Portas">Porta</a>
      </li>
      <li className="category">
        <a href="#Puxador">Puxador</a>
      </li>
      <li className="category">
        <a href="#Monte">Monte Sua Porta</a>
      </li>
    </Fragment>
  )
}

const MainHeader = () => {
  return (
    <Fragment>
      <div className="main-header">
        <div className="center-content">
          <Logo />
          <Busca />
          <CarrinhoCompras />
        </div>
        <nav className="menu brown darken-1">
          <ul>
            <Categorias />
          </ul>
        </nav>
      </div >
    </Fragment>
  )
}

export default MainHeader;
