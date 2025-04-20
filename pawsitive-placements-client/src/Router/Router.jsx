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
import Donate from '../components/Donate';
import PaymentHistory from '../Dashboard/D-Components/PaymentHistory';
import UserHome from '../Dashboard/D-Components/UserHome';
import AdminHome from '../Dashboard/D-Components/AdminHome';


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
            path: "/donate",
            element:<Donate></Donate>,

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
          path: "userHome",
          element:<UserHome></UserHome>,

      },
        {
          path: "myAdoption",
          element:<MyAdoption></MyAdoption>,

      },
        {
          path: "addReview",
          element:<AddReview></AddReview>,

      },
        {
          path: "paymentHistory",
          element:<PaymentHistory></PaymentHistory>,

      },


      // for admin
        {
          path: "adminHome",
          element:<AdminRouter><AdminHome></AdminHome></AdminRouter>,

      },
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