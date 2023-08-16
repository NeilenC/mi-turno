import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userInfo";
import axios from "axios";

export default function useUserData() {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/users/findUser/${id}`
      );
      const data = await response.data;
      dispatch(
        setUserInfo({
          id: data._id,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          DNI: data.DNI,
          isOp: data.isOp,
          isAdmin: data.isAdmin,
          phoneNumber: data.phoneNumber,
          branchId: data.branchId,
          branchName: data.branchName,
        })
      );
    } catch (e) {
      console.log("ERROR USUARIO", e);
      throw e;
    }
  }, [dispatch, id]);

  // Al envolver la función getUser con useCallback,indica a React que la función debe mantenerse estable a lo largo de los renderizados, a menos que alguna de sus dependencias cambie (en este caso, dispatch y id).

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
}
