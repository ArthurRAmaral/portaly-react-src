//From depedencies
import { combineReducers } from "redux";

//From reducers
import categorias from "./categoriasReducer";
import produtos from "./prdutosReducer";
import carrinho from "./cartReducer";
import frete from "./freteReducer";

const rootReducer = combineReducers({ categorias, produtos, carrinho, frete });

export default rootReducer;
