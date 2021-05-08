import { createStore, combineReducers } from "redux";
import audioReducer from "./reducers/index";

const reducer = combineReducers({
  audio: audioReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
