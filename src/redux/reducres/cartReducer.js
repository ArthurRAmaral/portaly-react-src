import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
} from "../actions/actionsTypes";

export default function setCarrinho(
  state = { quantidade: 0, valorTotal: 0 },
  action
) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        quantidade: action.quantidadeTotal,
        valorTotal: action.valorTotal,
        [action.name]: {
          produto: [action.payload],
          quantidade: action.quantidade,
          variacao: action.variacao,
        },
      };
    case REMOVE_CART:
      return action.novoState;
    case UPDATE_QUANTIDADE:
      return action.novoCarrinho;
    default:
      return state;
  }
}
