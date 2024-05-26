import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { register } from "../redux/actions/authActions";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const { user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData, navigate, toast));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className='Container  d-flex justify-content-center m-5'>
        <Row className='d-flex justify-content-center'>
          <Col xs={12}>
            <form className='shadow-lg p-5' onSubmit={handleSubmit}>
              <h2>Register</h2>
              <div className='col-auto form-group mb-3'>
                <label htmlFor='staticEmail2' className='visually-hidden'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='form-control'
                  id='staticEmail2'
                  placeholder='Name'
                />
              </div>

              <div className='col-auto form-group mb-3'>
                <label htmlFor='staticEmail2' className='visually-hidden'>
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='form-control'
                  id='staticEmail2'
                  placeholder='Email'
                />
              </div>
              <div className='col-auto form-group mb-3'>
                <label htmlFor='inputPassword2' className='visually-hidden'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='form-control'
                  id='inputPassword2'
                  placeholder='Password'
                />
              </div>

              <Button type='submit'>Register</Button>
              <p className='mt-3'>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
