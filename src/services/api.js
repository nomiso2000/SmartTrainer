import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// let userId;
// const Foo = () => {
//   userId = useSelector((state) => console.log(state));
// };
// Foo();
axios.defaults.baseURL = 'https://gentle-sierra-61969.herokuapp.com/';

export default {
  auth: {
    login: (data) => axios.put(`users/login`, data),
    register: (data) => axios.post(`/users`, data),
    // sendForm: (data) => axios.patch(`/users/${userId}`, data),
    getCurrentUser: () => axios.get('/users/current'),
    // getUserTrains:  () => axios.get('/users/current'),
    signout: () => axios.patch('/users/sign-out'),
  },
  transaction: {
    add: (data) => axios.post(`/api/transactions`, data),
    get: (data) => axios.get(`/api/transactions`, data),
  },
};
