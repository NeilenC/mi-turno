import React, { useState, useEffect } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const VerReserva = () => {
  useUserData();
  // const user = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [id, setId] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  // console.log("USER", user)

  // console.log(bookings)
  const getAllBookings = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:3000/api/users/ver-reservas/${id}`
        );
        setBookings(response.data);
      }
    } catch (e) {
      console.log("ERROR CATCH", e);
      throw e;
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>Nombre: {booking.fullname}</p>
          <p>Fecha: {booking.date}</p>
        </div>
      ))}
    </div>
  );
};

export default VerReserva;
