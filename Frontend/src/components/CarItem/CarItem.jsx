import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { AiFillCar, AiOutlineSetting } from "react-icons/ai";

import "./carItem.scss";

const CarItem = ({ car }) => {
  const navigate = useNavigate();

  return (
    <Col lg='4' md='4' sm='6' className='p-2'>
      <div className='car__item'>
        <div className='car__img'>
          <img
            src={car?.image}
            alt={car?.name}
            className='w-100'
            style={{ height: "200px" }}
          />
        </div>

        <div className='car__item-content mt-4'>
          <h4 className='section__title text-center'>{car?.name}</h4>
          <h6 className='text-center'>
            €{car?.rentPerHour} <span>/ Hour</span>
          </h6>

          <div className='car__item-info d-flex align-items-center justify-content-between flex mt-3 mb-4'>
            <span className=' d-flex align-items-center gap-1'>
              <AiFillCar /> {car?.model}
            </span>
            <span className=' d-flex align-items-center gap-1'>
              <AiOutlineSetting /> {car?.gearType}
            </span>
            <span className=' d-flex align-items-center gap-1'>
              <BsFuelPumpDiesel /> {car?.feulType}
            </span>
          </div>

          <button
            className=' w-100 car__item-btn-rent'
            onClick={() => {
              navigate(`/booking-car/${car?._id}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
