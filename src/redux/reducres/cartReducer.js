import { ADD_CART, REMOVE_CART } from "../actions/actionsTypes";

export default function setCarrinho(
  state = { valorTotal: 0, quantidade: 0 },
  action
) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        valorTotal: action.valorTotal,
        quantidade: action.quantidadeTotal,
        [action.name]: {
          produto: [action.payload],
          quantidade: action.quantidade,
          variacao: action.variacao,
        },
      };
    case REMOVE_CART:
      return action.novoState;
    default:
      return state;
  }
}
