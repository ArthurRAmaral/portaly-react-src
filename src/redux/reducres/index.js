//From depedencies
import { combineReducers } from "redux";

//From reducers
import categorias from "./categoriasReducer";

const rootReducer = combineReducers({ categorias });

export default categorias;
