import axios from "axios";

import * as types from "../constants/carConstants";

const API = "http://localhost:5000";

// Get all cars
export const getCars = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_CARS_REQUEST,
    });

    const { data } = await axios.get(`${API}/api/v1/cars`);

    dispatch({
      type: types.GET_CARS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CARS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

// Get car by id
export const getCarById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_CAR_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`${API}/api/v1/cars/${id}`);

    dispatch({
      type: types.GET_CAR_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CAR_BY_ID_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

// Update car
export const updateCar = (id, carData, toast) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_CAR_REQUEST,
    });

    const { data } = await axios.put(`${API}/api/v1/cars/${id}`, carData);

    dispatch({
      type: types.UPDATE_CAR_SUCCESS,
      payload: data,
    });
    toast.success("Car updated successfully");
  } catch (error) {
    dispatch({
      type: types.UPDATE_CAR_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};


// Add car
export const addCar = (carData, toast) => async (dispatch) => {
  try {
    dispatch({
      type: types.CREATE_CAR_REQUEST,
    });

    const { data } = await axios.post(`${API}/api/v1/cars`, carData);
    console.log("data", data);
    dispatch({
      type: types.CREATE_CAR_SUCCESS,
      payload: data,
    });
    toast.success("Car added successfully");
  } catch (error) {
    dispatch({
      type: types.CREATE_CAR_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

// Delete car
export const deleteCar = (id, toast) => async (dispatch) => {
  try {
    dispatch({
      type: types.DELETE_CAR_REQUEST,
    });

    const { data } = await axios.delete(`${API}/api/v1/cars/${id}`);

    dispatch({
      type: types.DELETE_CAR_SUCCESS,
      payload: data,
    });
    dispatch(getCars());
    toast.success("Car deleted successfully");
  } catch (error) {
    dispatch({
      type: types.DELETE_CAR_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
} 

