//From depedencies
import { combineReducers } from "redux";

//From reducers
import categorias from "./categoriasReducer";
import produtos from "./prdutosReducer";

const rootReducer = combineReducers({ categorias, produtos });

export default rootReducer;
