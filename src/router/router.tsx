import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Root from './root';
import HomePage from '../pages/HomePage/HomePage';




const router = createBrowserRouter([
    {
        element: <Root />,

        children: [
          { path: '/', element: <HomePage /> },
          
        ],
    },
]);
export default router;