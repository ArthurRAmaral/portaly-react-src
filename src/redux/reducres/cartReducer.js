import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
  SALVA_KIT,
  REMOVE_KIT_CART,
  UPDATE_QUANTIDADE_KIT,
} from "../actions/actionsTypes";

export default function setCarrinho(
  state = {
    quantidadeTotal: 0,
    valorTotal: 0,
    kits: {},
  },
  action
) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        quantidadeTotal: action.quantidadeTotal,
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
    case SALVA_KIT:
      return {
        ...state,
        quantidadeTotal: state.quantidadeTotal + action.quantidadeDoKit,
        valorTotal:
          state.valorTotal + action.valorDoKit * action.quantidadeDoKit,
        kits: {
          ...state.kits,
          [action.id]: {
            kit: action.kit.kit,
            produtos: action.kit.produtos,
            quantidadeDoKit: action.quantidadeDoKit,
            valorDoKit: action.valorDoKit,
          },
        },
      };
    case REMOVE_KIT_CART:
      return {
        ...state,
        quantidadeTotal: state.quantidadeTotal - action.kit.quantidadeDoKit,
        valorTotal:
          state.valorTotal - action.kit.valorDoKit * action.kit.quantidadeDoKit,
        kits: action.kitsRemanescentes,
      };
    case UPDATE_QUANTIDADE_KIT:
      return {
        ...state,
        quantidadeTotal: state.quantidadeTotal + action.diferencaDeQuantidade,
        valorTotal:
          state.valorTotal + action.diferencaDeQuantidade * action.valorDoKit,
        kits: action.kits,
      };
    default:
      return state;
  }
}
