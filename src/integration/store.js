/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from "history";
import rootReducer from "module/rootReducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import sampleMiddleware from "./middleware/sampleMiddleware";

// export const history = createBrowserHistory({basename: "/?urlData=" })
export const history =
  process.env.NODE_ENV === "test"
    ? createBrowserHistory()
    : createBrowserHistory({ basename: "/?urlData=" });

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, sampleMiddleware)
    )
  );
  return store;
}
