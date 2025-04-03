import React from 'react';
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home';
import ContactUs from '../components/ContactUs';
import Pets from '../Pages/Pets';
import Reviews from '../Pages/Reviews';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from './PrivateRoute';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
      
        {
            path: "/pets",
            element: <Pets></Pets>,

        },
        {
            path: "/reviews",
            element:<PrivateRoute><Reviews></Reviews></PrivateRoute>,
            loader:()=> fetch('http://localhost:3000/reviews')

        },
        {
            path: "/contact",
            element:<ContactUs></ContactUs>,

        },
      {
        path: "/login",
        element:<Login></Login>,

      },
      {
        path: "/register",
        element:<Register></Register>,

      }

      ]
    },
    
  ]);


export default router;