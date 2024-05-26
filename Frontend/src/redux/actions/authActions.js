import axios from "axios";

import * as actionTypes from "../constants/authConstants";

const API = "http://localhost:5000";

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${API}/api/v1/auth/login`, formData);

    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REGISTER_REQUEST,
    });

    const { data } = await axios.post(`${API}/api/v1/auth/register`, formData);

    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
