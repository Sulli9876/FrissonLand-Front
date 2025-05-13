import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRootContext } from '../../router/root';
import { Iattractions, Icategory } from '../../type/types';
import React from 'react';
import { API_BASE_URL } from '../../../config';

export default function AttractionsPage() {
  const { attractions, categories } = useRootContext();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filteredAttractions = selectedCategory
    ? attractions.filter((attraction) => attraction.category_id === selectedCategory)
    : attractions;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <main className="attractions-page">
      <h2 className="attractions-title">Liste des Attractions</h2>
  
      {/* Menu Catégorie au-dessus */}
      <div className="category-menu">
        <button onClick={toggleDropdown} className="category-menu__toggle">
          Catégorie ▾
        </button>
        <ul className={`category-menu__list ${isDropdownVisible ? 'category-menu__list--visible' : ''}`}>
          <li>
            <button className="category-menu__button" onClick={() => setSelectedCategory(null)}>
              Toutes les catégories
            </button>
          </li>
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className="category-menu__button"
                onClick={() => setSelectedCategory(index + 1)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Grille des attractions */}
      <div className="attractions-grid">
        {filteredAttractions.length ? (
          filteredAttractions.map((attraction: Iattractions) => (
            <div key={attraction.id} className="attraction-card2">
              <div className="attraction-card__image-wrapper">
                <img
                  src={attraction.image}
                  alt={`Image de ${attraction.name}`}
                  className="attraction-card__image"
                />
                {/* Overlay toujours visible */}
                <div className="attraction-card__overlay">
                  <h3 className="attraction-card__title">{attraction.name}</h3>
                  <NavLink to={`/attraction/${attraction.id}`}>
                    <button className="attraction-card__button">Découvrir</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune attraction à afficher</p>
        )}
      </div>
    </main>
  );
  
  
}