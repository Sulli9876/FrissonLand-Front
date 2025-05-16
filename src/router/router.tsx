import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Root from './root';
import HomePage from '../pages/HomePage/HomePage';
import AttractionsPage from '../pages/attractionsPage/attractionsPage';
import AttractionPage from '../pages/attractionPage/attractionPage';
import PresentationPage from '../pages/presentationPage/presentationPage';
import ReservationPage from '../pages/reservationPage/reservationPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import ProfilPage from '../pages/profilPage/profilPage';
import ProfilReservationPage from '../pages/profilReservationPage/profilReservationPage';
import ContactPage from '../pages/contactPage/contactPage';
import LegalMentionPage from '../pages/legalMentionPage/legalMentionPage';
import Dashboard from '../pages/backOffice/dashboard';
import BackOfficeAttractions from '../pages/backOffice/backOfficeAttractions';





const router = createBrowserRouter([
    {
        element: <Root />,

        children: [
          { path: '/', element: <HomePage /> },
          { path: '/attractions', element: <AttractionsPage /> },
          { path: '/attraction/:id', element: <AttractionPage />},
          { path: '/presentation', element: <PresentationPage />},
          { path : '/reservation' , element : <ReservationPage />},
          { path : '/login' , element : <LoginPage />},
          { path : '/register' , element : <RegisterPage />},
          { path : '/profile/:id' , element : <ProfilPage/>},
          { path : '/profile/:id/reservations' , element : <ProfilReservationPage/>},
          { path: '/contact', element: <ContactPage /> },
          { path : '/mentionsLegales', element : <LegalMentionPage/>},
          { path : '/backOffice', element : <Dashboard/>},
          { path : '/backOffice/attractions', element : <BackOfficeAttractions/>}
        ],
    },
]);
export default router;