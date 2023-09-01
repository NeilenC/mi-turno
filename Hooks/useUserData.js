import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/userInfo";
import axios from "axios";

export default function useUserData() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const getUser = async (id) => {
    try {
      const response = await axios.get(
        `/api/users/findUser/${id}`
      );
      const data = await response.data;
      console.log("DATA", data)
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
      // return data;
      // dispatch(setUserInfo(data))
    } catch (e) {
      console.log("ERROR USUARIO", e);
      throw e;
    }
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"))
    if (id) {
      getUser(id);
    }
  }, []);
}
