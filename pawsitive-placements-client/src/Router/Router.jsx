import React from 'react';
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home';
import About from '../Layout/About';
import Pets from '../Pages/Pets';
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
            path: "/about",
            element: <About></About>,

        },
        {
            path: "/pets",
            element: <Pets></Pets>,

        }
      ]
    },
    
  ]);


export default router;