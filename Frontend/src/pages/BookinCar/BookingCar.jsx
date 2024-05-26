import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox, DatePicker, Modal } from "antd";
import { AiFillCar, AiOutlineSetting } from "react-icons/ai";
import { Col, Container, Row } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { MdReduceCapacity } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import Spinner from "../../components/Spinner";
import { getCarById } from "../../redux/actions/carsActions";
import { bookingCar } from "../../redux/actions/bookActions";

import "./bookingCar.scss";

const BookingCar = () => {
  const { carId } = useParams();
  const { loading, car } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.auth);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const userID = user?.data?._id;

  const selectTimeSlot = (value) => {
    // moment to read the date and time
    const startDate = moment(value[0]?.$d).format("YYYY-MM-DD h:mm");
    const endDate = moment(value[1]?.$d).format("YYYY-MM-DD h:mm");

    setFrom(startDate);
    setTo(endDate);

    setTotalHours(value[1].diff(value[0], "hours"));
  };

  useEffect(() => {
    dispatch(getCarById(carId));
  }, [dispatch, carId]);

  useEffect(() => {
    setTotalAmount(totalHours * car?.rentPerHour);

    if (driver) {
      setTotalAmount(totalAmount + 10 * totalHours);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalHours, driver, car?.rentPerHour]);

  const onToken = (token) => {
    const bookingData = {
      user: userID,
      car: carId,
      from,
      to,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlot: {
        from,
        to,
      },
      token,
    };
    dispatch(bookingCar({ bookingData, toast }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className=' mt-5'>
      {loading && <Spinner />}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={car?.image} alt='' className='w-100' />
            </Col>
            <Col lg='6'>
              <div className='car__info'>
                <h2 className='section__title'>{car?.name}</h2>

                <div className=' d-flex align-items-center gap-5 mb-4 mt-3'>
                  <h6 className='rent__price fw-bold fs-4'>
                   €{car?.rentPerHour} / hour
                  </h6>
                </div>

                <p className='section__description'>
                  description about the car will be here soon ...
                </p>

                <div
                  className=' d-flex align-items-center mt-3'
                  style={{ columnGap: "4rem" }}
                >
                  <span className=' d-flex align-items-center gap-1 section__description'>
                    <AiFillCar style={{ color: "#E57C23" }} /> {car?.model}
                  </span>

                  <span className=' d-flex align-items-center gap-1 section__description'>
                    <AiOutlineSetting style={{ color: "#E57C23" }} /> 
                    {car?.gearType}
                  </span>

                  <span className=' d-flex align-items-center gap-1 section__description'>
                    <BsFuelPumpDiesel style={{ color: "#E57C23" }} />
                    {car?.feulType}
                  </span>
                  <span className=' d-flex align-items-center gap-1 section__description'>
                    <MdReduceCapacity style={{ color: "#E57C23" }} />
                    {car?.capacity} seats
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <button className='book__btn' onClick={() => setShowModal(true)}>
                Check booked cars
              </button>
            </Col>
            <Col lg='9'>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                showMinutes={true}
                showHours={true}
                format={"YYYY-MM-DD h:mm"}
                onChange={selectTimeSlot}
              />
            </Col>
            {from && to && (
              <Row>
                <Col lg='12' className='mt-2'>
                  <div className='widget'>
                    <h2>
                      <strong>Booking Summary</strong>
                    </h2>
                    <ul className='list-unstyled'>
                      <li>
                        Rent per hour: <b>{car?.rentPerHour}€</b>
                      </li>
                      <li>
                        <Checkbox
                          type='checkbox'
                          onChange={(e) => {
                            setDriver(e.target.checked);
                            if (e.target.checked) {
                              setDriver(true);
                            } else {
                              setDriver(false);
                            }
                          }}
                        >
                          Driver
                        </Checkbox>
                      </li>
                      <li>
                        Total hours: <b>{totalHours} hours</b>
                      </li>
                      <li>
                        Total amount: <b>{totalAmount}€</b>
                      </li>
                      <li>
                        <StripeCheckout
                          currency='EUR'
                          stripeKey={
                            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
                          }
                          token={onToken}
                          shippingAddress
                          amount={totalAmount * 100}
                        >
                          <button className='book__btn '>Pay Now</button>
                        </StripeCheckout>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </section>
      <Modal
        title='Booked Time Slots'
        onCancel={() => setShowModal(false)}
        footer={null}
        open={showModal}
      >
        {car &&
          car?.bookedTimeSlots?.map((slot) => {
            return (
              <Button key={slot._id} className='my-2'>
                <span className=''>
                  {moment(slot.from).format("YYYY-MM-DD h:mm")} -
                  {moment(slot.to).format("YYYY-MM-DD h:mm")}
                </span>
              </Button>
            );
          })}
      </Modal>
    </Container>
  );
};

export default BookingCar;
