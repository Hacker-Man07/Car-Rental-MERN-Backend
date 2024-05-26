import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";

import Hero from "./Hearo/Hero";
import Spinner from "../components/Spinner";
import CarItem from "../components/CarItem/CarItem";
import { getCars } from "../redux/actions/carsActions";
import WorkWithUs from "../components/WorkWithUs/WorkWithUs";

const { RangePicker } = DatePicker;

const Home = () => {
  const { cars, loading } = useSelector((state) => state.cars);
  const [totalCars, setTotalCars] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  // filtercar by giving date
  const setFilterCars = (values) => {
    const startDate = moment(values[0]?.$d).format("YYYY-MM-DD h:mm");
    const endDate = moment(values[1]?.$d).format("YYYY-MM-DD h:mm");
    const filterCars = cars.filter((car) => {
      return car.bookedTimeSlots.every(
        (booking) =>
          moment(startDate).isBefore(booking.from) ||
          moment(startDate).isAfter(booking.to) ||
          moment(endDate).isBefore(booking.from) ||
          moment(endDate).isAfter(booking.to)
      );
    });

    setTotalCars(filterCars);
  };

  return (
    <>
      <Hero />
      <Container>
        <WorkWithUs />
        <Row className='mt-3' justify={"center"}>
          <Col lg={20} sm={24}>
            <h2>Available Cars by Date and Time Range</h2>
          </Col>
          <Col>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              showMinutes={true}
              showHours={true}
              format={"YYYY-MM-DD h:mm"}
              onChange={setFilterCars}
            />
          </Col>
        </Row>
        {loading && <Spinner />}
        <Row>
        {Array.isArray(totalCars) && totalCars.map((car) => (
        <CarItem car={car} key={car._id} />
        ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
