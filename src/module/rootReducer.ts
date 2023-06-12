/* eslint-disable import/no-extraneous-dependencies */
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import counterReducer from "./sampleRedux/reducer";
 

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
  });

export default rootReducer;
