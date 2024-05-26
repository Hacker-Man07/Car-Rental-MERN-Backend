import * as types from "../constants/carConstants";

const initialState = {
  cars: [],
  car: {},
  loading: false,
  error: null,
};

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CARS_REQUEST:
    case types.GET_CAR_BY_ID_REQUEST:
    case types.UPDATE_CAR_REQUEST:
    case types.CREATE_CAR_REQUEST:
    case types.DELETE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Get all cars
    case types.GET_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: action.payload,
      };
    // Get car by id
    case types.GET_CAR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        car: action.payload,
      };
    // Update car
    case types.UPDATE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
      };
    // Create car
    case types.CREATE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: [...state.cars, action.payload],
      };
    // Delete car
    case types.DELETE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: state.cars.filter((car) => car._id !== action.payload),
      };

    case types.GET_CARS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
        cars: [],
      };
    case types.GET_CAR_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
        car: {},
      };
    case types.CREATE_CAR_FAILURE:
    case types.UPDATE_CAR_FAILURE:
       return {
        ...state,
        loading: false,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
