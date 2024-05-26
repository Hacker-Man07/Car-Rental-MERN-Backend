import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { deleteBooking, getBookings } from "../redux/actions/bookActions";

import "./userBooking.scss";

const UserBooking = () => {
  const { bookings } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  const token = user?.token;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings(token));
  }, [dispatch, token]);

  const handleDelete = (id) => {
    dispatch(deleteBooking(id, token, toast));
    dispatch(getBookings(token));
  };
  return (
    <div>
      <section className='light'>
        <div className='container py-2'>
          <div className='h1 text-center text-dark' id='pageHeaderTitle'>
            My Bookings
          </div>
          <>
            {bookings?.data?.length === 0 && (
              <p className='text-center'>No Bookings</p>
            )}
            {bookings?.data &&
              bookings?.data
                ?.filter((booking) => booking.user === user.data._id)
                .map((booking) => {
                  console.log(booking);
                  return (
                    <article className='postcard light blue'>
                      <div className='postcard__img_link'>
                        <img
                          className='postcard__img'
                          src={booking?.car?.image}
                          alt='car'
                        />
                      </div>
                      <div className='postcard__text t-dark'>
                        <h1 className='postcard__title blue'>
                          {booking?.car?.name}
                        </h1>
                        <div className='postcard__subtitle small'>
                          <time dateTime='2020-05-25 12:00:00'>
                            Booked at:{" "}
                            {moment(booking?.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </time>
                        </div>
                        <div className='postcard__bar' />
                        <div className='postcard__preview-txt'>
                          <ul className='postcard__tagbox'>
                            <li className='tag__item'>
                              <i className='fas fa-tag mr-2' />
                              total hours: {booking?.totalHours}
                            </li>
                            <li className='tag__item'>
                              <i className='fas fa-tag mr-2' />
                              rent per hour: {booking?.car?.rentPerHour}
                            </li>
                            <li className='tag__item'>
                              <i className='fas fa-tag mr-2' />
                              total amount: {booking?.totalAmount}
                            </li>
                            <li className='tag__item'>
                              <i className='fas fa-tag mr-2' />
                              transaction Id: {booking?.transactionId}
                            </li>
                            <li className='tag__item'>
                              <i className='fas fa-clock mr-2' />
                              from: {booking?.bookedTimeSlot?.from}
                            </li>
                            <li className='tag__item play blue'>
                              <i className='fas fa-play mr-2' />
                              to: {booking?.bookedTimeSlot?.to}
                            </li>
                          </ul>
                          <button
                            className='btn btn-danger'
                            onClick={() => {
                              handleDelete(booking?._id);
                            }}
                          >
                            <MdDeleteForever />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
          </>
        </div>
      </section>
    </div>
  );
};

export default UserBooking;
