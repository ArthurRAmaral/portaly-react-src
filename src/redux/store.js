//From depedencies
import { createStore, applyMiddleware } from "redux";

// import the root reducer
import rootReducer from "./reducres/index";

const middleware = applyMiddleware();
const store = createStore(rootReducer, [1, 2, 3, 45, 6, 67, 8, 0], middleware);

store.subscribe(() => console.log("algo mudou", store.geState()));

export default store;
