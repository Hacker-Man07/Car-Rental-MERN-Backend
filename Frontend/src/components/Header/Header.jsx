import React, { useRef } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { MenuOutlined, PhoneOutlined } from "@ant-design/icons";
import { AiFillCar } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import {
  BiPhoneCall,
  BiLogIn,
  BiLogOut,
  BiTime,
  BiWorld,
} from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../../redux/actions/authActions";
import { adminLinks, userLinks } from "../../assets/data/NavLinks";

import "./header.scss";

const adminLinkMap = adminLinks.map((link) => (
  <NavLink
    key={link.id}
    exact='true'
    to={link.path}
    className={(navClass) =>
      navClass.isActive ? "nav__active nav__item" : "nav__item"
    }
  >
    {link.display}
  </NavLink>
));

const userLinkMap = userLinks.map((link) => (
  <NavLink
    key={link.id}
    to={link.path}
    className={(navClass) =>
      navClass.isActive ? "nav__active nav__item" : "nav__item"
    }
  >
    {link.display}
  </NavLink>
));

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const admin = user?.data?.isAdmin;

  const logout = () => {
    dispatch(logOut());
  };

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className='header'>
      <div className='header__top'>
        <Container>
          <Row>
            {admin ? (
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__left'>
                  <RiAdminFill /> Admin Panel
                </div>
              </Col>
            ) : (
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__left'>
                  <span>Need Help?</span>
                  <span className='header__top__help'>
                    <BiPhoneCall /> +91 6291566151
                  </span>
                </div>
              </Col>
            )}

            {user ? (
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__right d-flex align-items-center justify-content-end gap-3'>
                  <Link
                    to='/login'
                    onClick={() => logout()}
                    className=' d-flex align-items-center gap-1'
                  >
                    <BiLogOut /> logout
                  </Link>
                </div>
              </Col>
            ) : (
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__right d-flex align-items-center justify-content-end gap-3'>
                  <Link
                    to='/login'
                    className=' d-flex align-items-center gap-1'
                  >
                    <BiLogIn /> Login / Register
                  </Link>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <div className='header__middle'>
        <Container>
          <Row>
            <Col lg='4' md='3' sm='4'>
              <div className='logo'>
                <h1>
                  <Link to='/' className=' d-flex align-items-center gap-2'>
                    <span>
                      <AiFillCar style={{ width: "30px", height: "30px" }} />{" "}
                      Car Rental
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg='3' md='3' sm='4'>
              <div className='header__location d-flex align-items-center gap-2'>
                <span>
                  <BiWorld
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </span>
                <div className='header__location-content'>
                  <h4>Kolkata</h4>
                  <h6>India</h6>
                </div>
              </div>
            </Col>

            <Col lg='3' md='3' sm='4'>
              <div className='header__location d-flex align-items-center gap-2'>
                <span>
                  <BiTime
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </span>
                <div className='header__location-content'>
                  <h4>Monday - Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg='2'
              md='3'
              sm='0'
              className=' d-flex align-items-center justify-content-end '
            >
              <button className='header__btn btn '>
                <Link to='/'>
                  <PhoneOutlined />
                  Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className='main__navbar'>
        <Container>
          <div className='navigation__wrapper d-flex align-items-center  '>
            <span className='mobile__menu'>
              <MenuOutlined onClick={toggleMenu} />
            </span>
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <div className='menu'>
                {admin ? (
                  adminLinkMap
                ) : user ? (
                  userLinkMap
                ) : (
                  <Link
                    to='/'
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
