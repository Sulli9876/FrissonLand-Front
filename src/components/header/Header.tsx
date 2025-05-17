import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';
import AccountIcon from '../../../public/images/account.svg?react';
import BurgerMenu from '../../../public/images/burgerMenu.svg?react';
import CloseIcon from '../../../public/images/closeIcon.svg?react';
import { MyJwtPayload } from '../../type/types';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedInOpen, setIsLoggedInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);  
  const [isAdmin, setIsAdmin] = useState(false);  const navigate = useNavigate();

  // Typage explicite de menuRef pour éviter l'erreur TypeScript
  const menuRef = useRef<HTMLUListElement | null>(null);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setIsAdmin(decodedToken.role === "admin");
        // Autres setIsLoggedIn, setUserId ici aussi
      } catch (error) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

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
          const decodedToken = jwtDecode<MyJwtPayload>(token);
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
          <li className='nav-link'><NavLink to="/presentation">Présentation & infos</NavLink></li>
          <li className='nav-link'><NavLink to="/attractions">Nos Attractions</NavLink></li>
          <li className='nav-link'><NavLink to="/reservation">Réservation</NavLink></li>
        </ul>
      </nav>

      {/* Zone de connexion */}
      <div className="menu-connexion">
        {isLoggedIn ? (
          <>
            <div className="account-icon-wrapper" onClick={toggleLoggedIn}>
              <AccountIcon className="icon" />
            </div>
            {isLoggedInOpen && (
              <div className={`account-menu ${isLoggedInOpen ? 'open' : ''}`}>
                <NavLink className="profile" to={`/profile/${userId}`}>
                  <button className="menu-btn">Profil</button>
                </NavLink>
                <NavLink className="booking" to={`/profile/${userId}/reservations`}>
                  <button className="menu-btn">Mes réservations</button>
                </NavLink>
                 {/* Affichage conditionnel pour admin */}
                 {isAdmin && (
              <NavLink to="/backOffice">
                <button className="menu-btn">BackOffice</button>
              </NavLink>
            )}
                <button className="log-out menu-btn" onClick={handleLogout}>Déconnexion</button>
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
