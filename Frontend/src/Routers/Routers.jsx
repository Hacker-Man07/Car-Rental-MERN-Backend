import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/Add_Edit_Car/AddCar";
import Edit from "../pages/Add_Edit_Car/Edit";
import BookingCar from "../pages/BookinCar/BookingCar";
import UserBooking from "../components/UserBooking";

const Routers = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.data?.isAdmin;
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/booking-car/:carId'
        element={user ? <BookingCar /> : <Navigate to='/login' />}
      />
      <Route
        path='/user-booking'
        element={user ? <UserBooking /> : <Navigate to='/login' />}
      />
      <Route
        path='/addcar'
        element={isAdmin ? <AddCar /> : <Navigate to='/' />}
      />
      <Route
        path='/editcar/:carId'
        element={isAdmin ? <Edit /> : <Navigate to='/' />}
      />
      <Route path='/admin' element={
        isAdmin ? <Admin /> : <Navigate to='/' />
      } />
    </Routes>
  );
};

export default Routers;
