import { NavLink } from 'react-router-dom';
import { useRootContext } from '../../router/root';
import React, { useState , useEffect} from 'react';

export default function HomePage() {
  const { attractions } = useRootContext();
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

useEffect(() => {
  const handleResize = () => {
    setCardsToShow(window.innerWidth < 768 ? 1 : 3);
  };

  handleResize(); // Initial check
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

 const handlePrev = () => {
  setIndex((prev) =>
    prev === 0 ? attractions.length - cardsToShow : prev - 1
  );
};

const handleNext = () => {
  setIndex((prev) =>
    prev + cardsToShow >= attractions.length ? 0 : prev + 1
  );
};


  return (
    <main>
      <div className="homepage-container">
        <section className="haut">
          <div className="haut-container">
            <h2 className="haut_h2">Bienvenue</h2>
            <div className="haut_presentation">
                <div className="desc">
                  <p className="desc_1">GENRE :</p>
                  <p>HORREUR</p>
                </div>
                <div className="desc">
                  <p className="desc_1">AGE :</p>
                  <p>18 ans et +</p>
                </div>
                <div className="desc">
                  <p className="desc_1">NIVEAU DE PEUR :</p>
                  <p>🕱🕱🕱🕱🕱</p>
                </div>
              </div>
          </div>
        </section>

        <section className="milieu">
          <div className="milieu-wrapper">
            <div className="milieu-haut-gauche">
              <h2>Un parc d'attraction immersif</h2>
              <p>
                Vous pensez pouvoir échapper à l'apocalypse ? Plongez dans un univers où chaque décision compte, où chaque recoin cache un danger, et où votre sang-froid sera mis à rude épreuve. 
                Frayez-vous un chemin à travers des zones dévastées, affrontez des survivants hostiles et survivez à des épreuves intenses dans un décor plus vrai que nature.
              </p>
            </div>

            <div className="milieu-bas-droite">
              <h2>Réservez vite</h2>
              <p>
                Les survivants les plus téméraires se donnent rendez-vous ici ! Réservez dès maintenant votre entrée dans notre monde post-apocalyptique, et préparez-vous à vivre une expérience inoubliable entre frissons, adrénaline et immersion totale. 
                Attention : les places sont limitées... et la survie aussi.
              </p>
              <NavLink to="/reservation" className="button_decouvrir">Réserver</NavLink>
            </div>
          </div>
        </section>

        <section className="bas">
          {attractions && attractions.length > 0 ? (
            <div className="carousel-container">
              <button className="carousel-arrow left" onClick={handlePrev}>
                &lt;
              </button>

              <div className="carousel-track">
                {attractions.slice(index, index + cardsToShow).map((attraction) => (
                    <div key={attraction.id} className="attraction-card">
                      <div className="image-overlay">
                        <h2 className="attraction-title">{attraction.name}</h2>
                        <NavLink to={`/attraction/${attraction.id}`} className="attraction-link">
                          <button className="attraction-button">Découvrir</button>
                        </NavLink>
                      </div>
                      <img
                        src={attraction.image}
                        alt={`Image de ${attraction.name}`}
                        className="attraction-image"
                      />
                    </div>
                  ))}
              </div>

              <button className="carousel-arrow right" onClick={handleNext}>
                &gt;
              </button>
            </div>
          ) : (
            <p>Aucune attraction à afficher</p>
          )}
        </section>
      </div>
    </main>
  );
}
