import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
  SALVA_KIT,
  REMOVE_KIT_CART,
  UPDATE_QUANT_kIT,
} from "../actions/actionsTypes";

export default function setCarrinho(
  state = {
    quantidadeTotal: 0,
    valorTotal: 0,
    kits: { quantidadeKits: 0, valorTotalKits: 0 },
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
        quantidadeTotal:
          state.quantidadeTotal -
          state.kits.quantidadeKits +
          action.quantidadeKits,
        valorTotal:
          state.valorTotal - state.kits.valorTotalKits + action.valorTotalKits,
        kits: {
          ...state.kits,
          quantidadeKits: action.quantidadeKits,
          valorTotalKits: action.valorTotalKits,
          ...action.payload,
        },
      };
    case REMOVE_KIT_CART:
      return {
        ...state,
        quantidadeTotal: state.quantidadeTotal - action.kitRemovido.quantidade,
        valorTotal:
          state.valorTotal -
          action.kitRemovido.quantidade * action.kitRemovido.valorKit,
        kits: action.payload,
      };
    case UPDATE_QUANT_kIT:
      return {
        ...state,
        quantidadeTotal:
          state.quantidadeTotal -
          state.kits.quantidadeKits +
          action.payload.quantidadeKits,
        valorTotal:
          state.valorTotal -
          state.kits.valorTotalKits +
          action.payload.valorTotalKits,
        kits: action.payload,
      };
    default:
      return state;
  }
}
