import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";

import Spinner from "../components/Spinner";
import { deleteCar, getCars } from "../redux/actions/carsActions";

const Admin = () => {
  const { cars, loading } = useSelector((state) => state.cars);
  const [totalCars, setTotalCars] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const svgStyle = {
    width: "20px",
    height: "20px",
    color: "green",
  };
  const svg2Style = {
    width: "20px",
    height: "20px",
    color: "red",
  };
  return (
    <>
      {loading && <Spinner />}
      <div className='container'>
        <div className='row'>
          {totalCars?.map((car) => (
            <div className='col-md-4 my-3 mt-5' key={car._id}>
              <div className='card'>
                <img
                  src={car.image}
                  className='card-img-top'
                  alt={car.name}
                  style={{ height: "200px" }}
                />
                {/* <Link to={`/cars/${car._id}`}>
                </Link> */}
                <div className='card-body'>
                  <h5 className='card-title'>{car.name}</h5>
                  <p className='card-text'>{car.description}</p>
                  <p className='card-text'>Rent per hour: {car.rentPerHour}€</p>
                  <div
                    className='d-flex justify-content-around 
                   align-items-center'
                  >
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined style={svgStyle} />
                    </Link>
                    <Popconfirm
                      title='Are you sure to delete this car?'
                      onConfirm={() => {
                        dispatch(deleteCar(car._id));
                      }}
                      onCancel={() => console.log("cancel")}
                      okText='Yes'
                      cancelText='No'
                    >
                      <DeleteOutlined style={svg2Style} />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
