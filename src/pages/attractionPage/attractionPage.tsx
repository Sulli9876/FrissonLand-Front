import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { Iattractions, Ireviews } from '../../type/types';
import React from 'react';

export default function AttractionPage() {
  const { id } = useParams<{ id: string }>();
  const [attraction, setAttraction] = useState<Iattractions | null>(null);
  const [reviews, setReviews] = useState<Ireviews[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);  // Index de l'avis actuel
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [formError, setFormError] = useState('');
  const token = localStorage.getItem('token');
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  

const showReview = (index: number) => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentIndex(index);
    setIsAnimating(false);
  }, 300); // Durée = moitié de la transition
};

const nextReview = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    setIsAnimating(false);
  }, 300);
};

const prevReview = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    setIsAnimating(false);
  }, 300);
};

  useEffect(() => {
    if (!id) return;

    // Récupérer les informations de l'attraction
    fetch(`${API_BASE_URL}/attraction/${id}`)
      .then((res) => res.json())
      .then((data) => setAttraction(data.oneAttraction))
      .catch(() => setError("Erreur de chargement de l'attraction."));

    // Récupérer les avis de l'attraction
    fetch(`${API_BASE_URL}/review/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Trie les avis par date, du plus récent au plus ancien
      const sortedReviews = data.reviews.sort(
        (a: Ireviews, b: Ireviews) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReviews(sortedReviews);
    })
    .catch(() => setError("Erreur de chargement des avis."));
}, [id]);

  // Fonction pour afficher l'avis suivant
  

  // Fermer la modale au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  const handleStarClick = (rating: number) => {
    setNewRating(rating);
  };

  const handleSubmitReview = async () => {
    setFormError('');

    if (!token) {
      setFormError('Vous devez être connecté pour laisser un avis.');
      return;
    }

    if (newRating === 0 || newReview.trim() === '') {
      setFormError('Veuillez saisir un commentaire et une note.');
      return;
    }

    const reviewData = {
      note: newRating,
      commentaire: newReview,
      attractionId: id,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });


      if (!res.ok) {
        const errorData = await res.json();
  
        // Vérifie si l'erreur vient du fait que l'avis existe déjà
        if (res.status === 400 && errorData.message === 'Review already exists for this attraction by the same user') {
          setFormError('Vous avez déjà posté un avis pour cette attraction.');
        } else {
          setFormError('Erreur lors de l\'envoi de l\'avis.');
        }
        return;
      }
      const newReviewObj = await res.json();
      setReviews((prev) => [newReviewObj, ...prev]);
      setIsModalOpen(false);
      setNewRating(0);
      setNewReview('');
    } catch (err) {
      setFormError('Erreur lors de l\'envoi de l\'avis.');
    }
  };

  if (error) return <p>{error}</p>;
  if (!attraction) return <p>Chargement en cours...</p>;

  const currentReview = reviews[currentReviewIndex];

  return (
    <main className="attraction-page">
      {/* LEFT - Image */}
    
      <section className="attraction-left">
        <img
            src={`/public/${attraction.image}`}
            alt={`Image de ${attraction.name}`}
          className="attraction-image"
        />
      </section>

      {/* RIGHT - Infos + reviews */}
      <section className="attraction-right">
        <div className="attraction-desc">
          <h2 className="attraction-title2">{attraction.name}</h2>
          <p className="attraction-duration">Durée : {attraction.duration}</p>
          <p className="attraction-description">{attraction.description}</p>
        </div>

        <div className="attraction-reviews">
  <div className="reviews-header">
    <h3>Avis</h3>
    <div className="carousel-buttons">
      <button onClick={prevReview} aria-label="Avis précédent">←</button>
      <button onClick={nextReview} aria-label="Avis suivant">→</button>
    </div>
  </div>

  {reviews.length > 0 ? (
    <div className="review-carousel">
      <div className={`review-card ${isAnimating ? '' : 'active'}`}>
        <div className="review-top">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < currentReview.note ? '★' : '☆'}</span>
            ))}
          </div>
          <div className="review-meta">
  <span className="review-name">
    {currentReview.user
      ? `${currentReview.user.first_name} ${currentReview.user.last_name}`
      : 'Utilisateur inconnu'}
  </span>
  <span className="review-date">
    {new Date(currentReview.createdAt).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </span>
</div>
        </div>
        <p className="review-comment">{currentReview.commentaire}</p>
      </div>
    </div>
  ) : (
    <p>Aucun avis pour cette attraction.</p>
  )}

  <button className="leave-review-btn" onClick={() => setIsModalOpen(true)}>
    Laisser un avis
  </button>
</div>

      </section>

      {/* MODALE */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal" tabIndex={-1} ref={modalRef}>
            <h3>Laisser un avis</h3>
            {formError && <div className="error-message">{formError}</div>}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Votre commentaire"
            />
            <div className="star-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${newRating >= star ? 'selected' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  {newRating >= star ? '★' : '☆'}
                </span>
              ))}
            </div>
            <button onClick={handleSubmitReview}>Envoyer</button>
          </div>
        </div>
      )}
    </main>
  );
}
