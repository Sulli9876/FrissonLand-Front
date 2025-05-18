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
import BackOfficeTickets from '../pages/backOffice/backOfficeTickets';
import BackOfficeCategories from '../pages/backOffice/backOfficeCategories';
import BackOfficeUsers from '../pages/backOffice/backOfficeUsers';
import BackOfficeReservations from '../pages/backOffice/backOfficeReservations';
import BackOfficeReviews from '../pages/backOffice/backOfficeReviews';
import { API_BASE_URL } from '../../config';
import NotFound from '../pages/ErrorsPage/notFound';
import BackOfficeAdmin from '../pages/backOffice/backOfficeMain';
import ProtectedAdminRoute from './protectedAdminRoute';
import UnauthorizedPage from '../pages/ErrorsPage/UnauthorizedPage';
import ResetPasswordPage from '../pages/loginPage/ResetPassword';
import ForgotPasswordPage from '../pages/loginPage/ForgotPassword';
import ProtectedRoute from './protectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';





const router = createBrowserRouter([
    {
        element: <Root />,

        children: [
          { path: '/', element: <HomePage /> },
          { path: '/attractions', element: <AttractionsPage /> },
          { path: '/attraction/:id', element: <AttractionPage />},
          { path: '/presentation', element: <PresentationPage />},
          { path : '/reservation' , element : <ReservationPage />},
          { path : '/login' , element :    <GoogleOAuthProvider clientId="192637832836-jl12bto3t9gv8k01rq6tind881m531le.apps.googleusercontent.com"> 
                 <LoginPage /></GoogleOAuthProvider>},
          { path : '/register' , element :     <GoogleOAuthProvider clientId="192637832836-jl12bto3t9gv8k01rq6tind881m531le.apps.googleusercontent.com"> 
             <RegisterPage /></GoogleOAuthProvider>},
          { path : '/profile/:id' , element :    <ProtectedRoute><ProfilPage/></ProtectedRoute> },
          { path : '/profile/:id/reservations' , element :<ProtectedRoute> <ProfilReservationPage/></ProtectedRoute>},
          { path: '/contact', element: <ContactPage /> },
          { path : '/mentionsLegales', element : <LegalMentionPage/>},
          { path : '/backOffice', element : 
          <ProtectedAdminRoute>
            <BackOfficeAdmin  />
          </ProtectedAdminRoute>},

          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/reset-password/:token', element: <ResetPasswordPage /> },
          { path : "*" , element : <NotFound /> } ,
          { path: '/unauthorized', element: <UnauthorizedPage /> },

          
          
          
        ],
        
    },
]);
export default router;