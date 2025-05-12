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
                  <p>5/5</p>
                </div>
              </div>
          </div>
        </section>

        <section className="milieu">
          <div className="milieu-wrapper">
            <div className="milieu-haut-gauche">
              <h2>Un parc d'attraction immersif</h2>
              <p>Vous pensez pouvoir échapper à l'apocalypse ? Venez mettre vos nerfs à l'épreuve et découvrez si vous avez ce qu'il faut pour survivre.</p>
            </div>

            <div className="milieu-bas-droite">
              <h2>Réservez vite</h2>
              <p>Vous pouvez réserver dès maintenant sur notre site avant que les places ne soient plus disponibles.</p>
              <NavLink to="/reservation" className="button_decouvrir">Réserver</NavLink>
            </div>
          </div>
        </section>

        <section className="bas">
          <h2 className="attractions-heading">Liste des Attractions</h2>
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
