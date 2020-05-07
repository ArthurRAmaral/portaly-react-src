//From depedencies
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";

// import the root reducer
import rootReducer from "./reducres/index";

const middleware = applyMiddleware(createPromise(), thunk, createLogger());

const store = createStore(rootReducer, middleware);

// store.subscribe(() => console.log("algo mudou", store.geState()));

// store.dispatch((dispatch) => {
//   dispatch({ type: "FOO" });
//   dispatch({ type: "BAr" });
// });

export default store;
