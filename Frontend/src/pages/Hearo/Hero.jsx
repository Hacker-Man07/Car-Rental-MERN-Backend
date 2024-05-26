import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdCheckbox } from "react-icons/io";

import aboutImg from "../../assets/images/bmw-offer.png";

import "./hero.scss";

const Hero = () => {
  return (
    <section className='about__section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className='about__section-content'>
              <h4 className='section__subtitle'>About Us</h4>
              <h2 className='section__title'>
                We are the best car rental company in the world
              </h2>
              <p className='section__description'>
                {/* something about us */}
                We are a car rental company that offers a wide range of vehicles
                for rent. We have a large fleet of cars, which are constantly
                updated. We offer our clients only the best cars of the most
                famous brands. We are constantly improving our service and
                expanding our capabilities. We are always ready to help our dear
                customers.
              </p>

              <div className='about__section-item d-flex align-items-center'>
                <p className='section__description d-flex align-items-center gap-2'>
                  <IoMdCheckbox /> 24/7 support service
                </p>
                <p className='section__description d-flex align-items-center gap-2'>
                  <IoMdCheckbox /> Flexible rental periods
                </p>
              </div>

              <div className='about__section-item d-flex align-items-center'>
                <p className='section__description d-flex align-items-center gap-2'>
                  <IoMdCheckbox /> Simple and fast booking
                </p>
                <p className='section__description d-flex align-items-center gap-2'>
                  <IoMdCheckbox /> No hidden costs
                </p>
              </div>
            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className='about__img'>
              <img src={aboutImg} alt='' className='w-100' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
