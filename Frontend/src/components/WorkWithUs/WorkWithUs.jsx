import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import driverImg from "../../assets/images/toyota-offer-2.png";

import './work-with-us.css'
const WorkWithUs = () => {
  return (
    <section className="become__driver">
    <Container>
      <Row>
        <Col lg="6" md="6" sm="12" className="become__driver-img">
          <img src={driverImg} alt="" className="w-100" />
        </Col>

        <Col lg="6" md="6" sm="12">
          <h2 className="section__title become__driver-title">
            Want to become a driver? <br /> Join us! <br /> It's easy!
          </h2>

          <button className="btn become__driver-btn mt-4">
            Become a Driver
          </button>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default WorkWithUs