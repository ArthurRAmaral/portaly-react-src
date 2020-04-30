// From dependencies
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// From components
import Header from './components/Header/Header';
import Routes from './routes';
import Footer from './components/Footer';
import Wpp from './components/WppBtn/WppBtn';
import Carrinho from './util/Carrinho';

// From css
import 'materialize-css/dist/css/materialize.min.css';
import './css/Global.css';

// From Cors
import 'cors';

const App = () => {
  Carrinho.resetCarrinho();

  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Wpp />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
