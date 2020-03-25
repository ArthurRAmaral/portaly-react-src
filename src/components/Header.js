import React from "react";

const Headers = () => {
  return (
    <nav className="nav-extended  brown darken-1">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          <img
            src="http://localhost/portalydev/wp-content/uploads/2020/03/Portaly_Logo_fundo_branco__fee74.png"
            alt=""
            width="100%"
          />
        </a>
      </div>
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          <li className="tab">
            <a href="#test1">Test 1</a>
          </li>
          <li className="tab">
            <a className="active" href="#test2">
              Test 2
            </a>
          </li>
          <li className="tab disabled">
            <a href="#test3">Disabled Tab</a>
          </li>
          <li className="tab">
            <a href="#test4">Test 4</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Headers;
