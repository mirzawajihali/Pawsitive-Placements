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
import AddReview from '../components/AddReview';
import AllUsers from '../Dashboard/D-Components/AllUsers';
import AdminRouter from './AdminRouter';
import AddPets from '../Dashboard/D-Components/AddPets';


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
      element:<PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
      children: [
        
        {
          path: "myAdoption",
          element:<MyAdoption></MyAdoption>,

      },
        {
          path: "addReview",
          element:<AddReview></AddReview>,

      },


      // for admin
        {
          path: "users",
          element:<AdminRouter><AllUsers></AllUsers></AdminRouter>,

      },
        {
          path: "addPets",
          element:<AdminRouter><AddPets></AddPets></AdminRouter>,

      },
      ]
    },
    
    
  ]);


export default router;