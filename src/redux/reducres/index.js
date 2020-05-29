//From depedencies
import { combineReducers } from "redux";

//From reducers
import categorias from "./categoriasReducer";
import produtos from "./prdutosReducer";
import carrinho from "./cartReducer";
import frete from "./freteReducer";
import cupom from "./cupomReducer";

const rootReducer = combineReducers({
  categorias,
  produtos,
  carrinho,
  frete,
  cupom,
});

export default rootReducer;
