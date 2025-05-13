import { useEffect, useState } from 'react';
import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from "../components/header/Header"
import Footer from "../components/footer/footer"
import { API_BASE_URL } from '../../config';
import { Icategory, RootContext } from '../type/types';
import { Iattractions, Iticket ,Ireviews } from '../type/types';

export function useRootContext() {
    return useOutletContext<RootContext>();
  }

export default function Root() {
    const [attractions, setAttractions] = useState<Iattractions[]>([]);
    const [tickets, setTickets] = useState<Iticket[]>([])
    const [categories, setCategories] = useState<Icategory[]>([]);

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
      useEffect(() => {
         fetch(`${API_BASE_URL}/categories`)
          .then((response) => response.json())
          .then((data) => {
            setCategories(data.categories || []); 
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);

          })
    
    
      }, []);
     
                                   
      return (
        <div className="container">
          <Header />
          <div className="main-content">
            <Outlet context={{ attractions, setAttractions, tickets, setTickets, categories, setCategories }} />
          </div>
          <Footer />
        </div>
      );
    }      