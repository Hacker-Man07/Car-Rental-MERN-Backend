import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ToastContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
