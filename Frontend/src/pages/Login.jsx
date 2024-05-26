import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/actions/authActions";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
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
    dispatch(login(formData, navigate));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='Container  d-flex justify-content-center m-5'>
      <Row className='d-flex justify-content-center'>
        <Col xs={12}>
          <form className='shadow-lg p-5' onSubmit={handleSubmit}>
            <h2>Login</h2>

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

            <Button type='submit'>Login</Button>
            <p className='mt-3'>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
