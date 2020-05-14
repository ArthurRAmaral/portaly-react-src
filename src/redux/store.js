//From depedencies
import { createStore, applyMiddleware } from "redux";
//import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import the root reducer
import rootReducer from "./reducres/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(createPromise(), thunk); //, createLogger()

const store = createStore(persistedReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export { store, persistor };
