import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userInfo';

export default function useUserData ()  {
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setId(localStorage.getItem('id'));
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const data = await response.json();
      dispatch(
        setUserInfo({
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          DNI: data.DNI,
        })
      );
      return data;
    } catch (e) {
      console.log('ERROR USUARIO', e);
      throw e;
    }
  }, [dispatch, id]);

  // Al envolver la función getUser con useCallback,indica a React que la función debe mantenerse estable a lo largo de los renderizados, a menos que alguna de sus dependencias cambie (en este caso, dispatch y id).

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id, getUser]);

};

