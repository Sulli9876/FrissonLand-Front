import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Root from './root';
import HomePage from '../pages/HomePage/HomePage';
import AttractionsPage from '../pages/attractionsPage/attractionsPage';
import AttractionPage from '../pages/attractionPage/attractionPage';
import PresentationPage from '../pages/presentationPage/presentationPage';
import ReservationPage from '../pages/reservationPage/reservationPage';



const router = createBrowserRouter([
    {
        element: <Root />,

        children: [
          { path: '/', element: <HomePage /> },
          { path: '/attractions', element: <AttractionsPage /> },
          { path: '/attraction/:id', element: <AttractionPage />},
          { path: '/presentation', element: <PresentationPage />},
          {path : '/reservation' , element : <ReservationPage />}
        ],
    },
]);
export default router;