import { NavLink } from 'react-router-dom';
import { useRootContext } from '../../router/root';
import React from 'react';

export default function HomePage() {
  const {tickets} = useRootContext();
  return (
    <>
      <main>
        <div className="homepage-container">
          <section className="left">
            <h2 className="left_h2">Présentation</h2>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
              <span className="presentation-image">
                
              </span>
            </div>
            <NavLink to="/presentation" className="button_decouvrir">Découvrir le parc</NavLink>
          </section>
          <section className="right">
            <h2>Tarifs</h2>
            {tickets.map((tickets) =>(
            <div className="tarifs">

              <p className="price">{tickets.name} : {tickets.value}€ la journée</p>
              <p className="condition">
                *Condition applicable : Annulation possible, 7 jours avant la date de visite.
              </p>
            </div>
           ) )}
            <NavLink to="/reservation" className="button_reservation">Réservez des billets</NavLink>
          </section>
        </div>
      </main>
    </>
  );
}