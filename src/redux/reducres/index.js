//From depedencies
import { combineReducers } from "redux";

//From reducers
import categorias from "./categoriasReducer";
import produtos from "./prdutosReducer";
import carrinho from "./cartReducer";

const rootReducer = combineReducers({ categorias, produtos, carrinho });

export default rootReducer;
