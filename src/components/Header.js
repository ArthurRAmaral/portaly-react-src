import React from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";

const Carrinho = JSON.parse(localStorage.getItem("carrinho"));

const Headers = () => {
  return (
    <header className="header">
      <div className="sup-header blue-grey lighten-4">
        <div className="Contato sup-header-content">Contato</div>
        <div className="sup-header-content">
          <a className="Go-to-email" href="mailto:portalyportas@gmail.com">
            portalyportas@gmail.com
          </a>
        </div>
        <div className="Tel sup-header-content">
          tel: <a href="tel:3125222915">(31) 2522-2915</a>
        </div>
      </div>

      <div className="main-header">
        <div className="center-content">
          <Link to="/">
            <img
              src="https://demo.skeavee.com/portaly/wp-content/uploads/2020/03/Portaly_PNG_Background.png"
              alt=""
              className="logo center-children"
            />
          </Link>

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

          <div className="cart">
            <img src="" alt="" /> Valor total:{" "}
            <span id="value">{Carrinho ? Carrinho.valor : 0}</span>
          </div>
        </div>
        <nav className="menu brown darken-1">
          <ul>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Headers;
