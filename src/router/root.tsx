import { useEffect, useState } from 'react';
import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from "../components/header/Header"
import Footer from "../components/footer/footer"
import { API_BASE_URL } from '../../config';
import { RootContext } from '../type/types';
import { Iattractions, Iticket } from '../type/types';

export function useRootContext() {
    return useOutletContext<RootContext>();
  }

export default function Root() {
    const [attractions, setAttractions] = useState<Iattractions[]>([]);
    const [tickets, setTickets] = useState<Iticket[]>([])
    useEffect(() => {
      fetch(`${API_BASE_URL}/attractions`)
        .then((response) => response.json())
        .then((data) => {
          setAttractions(data.attractions || []); 
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des attractions:', error);
        });
    }, []);
      useEffect(() => {
        fetch(`${API_BASE_URL}/tickets`)
          .then((response) => response.json())
          .then((data) => {
            setTickets(data.tickets || []); // Si la propriété `tickets` existe, sinon tableau vide
          })
          .catch((error) => {
            console.error('Error fetching tickets:', error);
          });
      }, []);
                                   
    return (
        <div className="container">
          <Header />
          <Outlet context={{attractions, setAttractions , tickets , setTickets } satisfies RootContext} />
          <Footer />
        </div>
      );
    }