import React from 'react';
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home';
import ContactUs from '../components/ContactUs';

import Reviews from '../Pages/Reviews';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from './PrivateRoute';
import Pets from '../Pages/Pets';
import PetDetailPage from '../components/PetDetailPage';
import MyAdoption from '../components/MyAdoption';
import Dashboard from '../Dashboard/Dashboard';


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
          path:"/pets/:id",
          element:<PrivateRoute><PetDetailPage></PetDetailPage></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:3000/pets/${params.id}`)
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
            path: "/myAdoption",
            element:<MyAdoption></MyAdoption>,

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
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        

      ]
    },
    
    
  ]);


export default router;