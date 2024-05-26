import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { carsReducer } from "./reducers/carsReducer";
import { bookingReducer } from "./reducers/bookingReducer";


const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carsReducer,
  booking: bookingReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
