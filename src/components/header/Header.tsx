import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import AccountIcon from '../../../public/images/account.svg?react';
import BurgerMenu from '../../../public/images/burgerMenu.svg?react';
import CloseIcon from '../../../public/images/closeIcon.svg?react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedInOpen, setIsLoggedInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Typage explicite de menuRef pour éviter l'erreur TypeScript
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.burger-btn')) {
        setIsMenuOpen(false); // Fermer le menu si on clique en dehors
      }
    };

    // Ajouter un écouteur d'événements quand le menu est ouvert
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Nettoyer l'écouteur quand le menu est fermé ou le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // L'écouteur sera mis à jour chaque fois que isMenuOpen change

  // Vérifier l'état de connexion de l'utilisateur
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          // Décoder le token pour obtenir l'ID utilisateur
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken)
          setIsLoggedIn(true);
          setUserId(decodedToken.id);
          console.log("connexion réussie");
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserId(null);
        console.error("Erreur de vérification de l'authentification:", error);
      }
    };
    checkAuth();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);   
  };

  const toggleLoggedIn = () => {
    setIsLoggedInOpen(!isLoggedInOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(null);
    navigate('/login');
  };

  return (
    <header>
      <div className="containerHeader">
      {/* Bouton burger pour petits écrans */}
      <div className="burger-btn" onClick={toggleMenu}>
  {isMenuOpen ? <CloseIcon /> : <BurgerMenu />}
</div>      <h1 className="menu-logo"><NavLink to="/">FRISSONLAND</NavLink></h1>

      <nav className="menu-header">
        
        {/* Menu mobile (affiché seulement quand isMenuOpen est true) */}
        <ul ref={menuRef} className={`menu-mobile ${isMenuOpen ? 'open' : ''}`}>
          <li className='nav-link'><NavLink to="/presentation">Présentation du parc</NavLink></li>
          <li className='nav-link'><NavLink to="/attractions">Nos Attractions</NavLink></li>
          <li className='nav-link'><NavLink to="/reservation">Réservation</NavLink></li>
        </ul>
      </nav>

      {/* Zone de connexion */}
      <div className="menu-connexion">
        {isLoggedIn ? (
          <>
            <button onClick={toggleLoggedIn}>Mon Compte</button>
            {isLoggedInOpen && (
              <div className="account-menu">
                <NavLink className="booking" to={`/profile/${userId}/reservations`}><button>Mes réservations</button></NavLink>
                <NavLink className="profile" to={`/profile/${userId}`}><button>Profil</button></NavLink>
                <button className="log-out" onClick={handleLogout}>Déconnexion</button>
              </div>
            )}
          </>
        ) : (
          <NavLink className="log-in" to="/login">  <AccountIcon className="icon" /></NavLink>
        )}
      </div>
      </div>
    </header>
  );
}
