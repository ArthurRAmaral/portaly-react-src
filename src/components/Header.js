import React from "react";

import "../css/Header.css";

const Headers = () => {
  return (
    <header class="header">
      <div class="sup-header blue-grey lighten-4">
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

      <div class="main-header">

      <div className="center-content">

      <img
          src="https://demo.skeavee.com/portaly/wp-content/uploads/2020/03/Portaly_PNG_Background.png"
          alt=""
          className="logo center-children"
        />

        <div class="row">
          <form>
              <div class="search-area">
              <input type="text" className="search-input" placeholder="Busque um produto"/> 
            </div>
          </form>
        </div>

        <div class="cart">
          <img src="" alt="" /> Valor total: <span id="value"></span>
        </div>
        </div>
        <nav class="menu brown darken-1">
          <ul>
            <li class="category">
              <a href="#Alizar">Alizar</a>
            </li>
            <li class="category">
              <a href="#Dobradica">Dobradiça</a>
            </li>
            <li class="category">
              <a href="#Fechadura">Fechadura</a>
            </li>
            <li class="category">
              <a href="#KitDeCorrer">Kit de Correr</a>
            </li>
            <li class="category">
              <a href="#Marco">Marco (Batente)</a>
            </li>
            <li class="category">
              <a href="#Outros">Outros</a>
            </li>
            <li class="category">
              <a href="#Portas">Porta</a>
            </li>
            <li class="category">
              <a href="#Puxador">Puxador</a>
            </li>
            <li class="category">
              <a href="#Monte">Monte Sua Porta</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Headers;
