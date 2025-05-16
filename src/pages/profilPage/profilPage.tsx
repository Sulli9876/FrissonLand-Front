import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../../config';
import { Ireviews } from '../../type/types';




const ProfilPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', mail: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isReviewEditModalOpen, setIsReviewEditModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Ireviews[]>([]);
  const [selectedReview, setSelectedReview] = useState<Ireviews | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Ireviews | null>(null);
  const reviewsPerPage = 5;
  const navigate = useNavigate();

  const openDeleteModal = (review: Ireviews) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };
  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/review/${reviewToDelete.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;
  
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          setFormData(data);
        }
  
        const reviewsRes = await fetch(`${API_BASE_URL}/auth/profile/${userId}/reviews`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (err) {
        console.error('Erreur lors du chargement du profil ou des avis :', err);
      }
    })();
  }, [navigate]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedReview) {
      setSelectedReview({ ...selectedReview, commentaire: e.target.value });
    }
  };

  const handleUpdateReview = async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedReview) return;

    const res = await fetch(`${API_BASE_URL}/auth/review/${selectedReview.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentaire: selectedReview.commentaire,
        note: selectedReview.note,
      }),
    });
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === selectedReview.id ? selectedReview : r))
      );
      setIsReviewEditModalOpen(false);
    }
  };

  const handleDeleteReview = async (id: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cet avis ?");
    if (!confirm) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/review/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decoded: any = jwtDecode(token!);
    const res = await fetch(`${API_BASE_URL}/auth/profile/${decoded.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const updated = await res.json();
      setUserData(updated);
      setSuccessMessage('Profil mis à jour avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decoded: any = jwtDecode(token!);

    const res = await fetch(`${API_BASE_URL}/auth/profile/${decoded.id}/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    if (res.ok) {
      setSuccessMessage('Mot de passe modifié avec succès');
      setErrorMessage('');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setIsPasswordModalOpen(false);
    } else {
      setErrorMessage('Erreur lors du changement de mot de passe');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const startIdx = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIdx, startIdx + reviewsPerPage);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  if (!userData) return <p>Chargement...</p>;

  return (
    <main className='profile-page'>
      <h2 className="profile-title">Mon Profil</h2>

      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

      <div className="profile-main">
        {/* Partie profil */}
        <section className="profile-details">
          <h3>Informations personnelles</h3>
          <p><strong>Prénom:</strong></p>
          <input name="first_name" value={formData.first_name} onChange={handleInputChange} />
          <p><strong>Nom:</strong></p>
          <input name="last_name" value={formData.last_name} onChange={handleInputChange} />
          <p><strong>Email:</strong></p>
          <input name="mail" value={formData.mail} readOnly style={{ backgroundColor: '#333', cursor: 'not-allowed' }} />

          <div className="profile-buttons">
            <button onClick={handleSubmitProfile}>Sauvegarder</button>
            <button onClick={() => setIsPasswordModalOpen(true)}>Changer mot de passe</button>
          </div>
        </section>

        {/* Partie reviews */}
        <section className="profile-reviews">
          <h3>Mes avis</h3>
          {reviews.length === 0 ? (
            <p className="no-reviews">Pas d'avis pour le moment.</p>
          ) : (
            <>
              {currentReviews.map((r) => (
                <div key={r.id} className="review-item">
                  <p><strong>{r.attraction.name}</strong></p>
                  <p>Note: {r.note} - "{r.commentaire}"</p>
                  <button onClick={() => { setSelectedReview(r); setIsReviewEditModalOpen(true); }}>Modifier</button>
                  <button onClick={() => openDeleteModal(r)}>Supprimer</button>                </div>
              ))}
            {isDeleteModalOpen && reviewToDelete && (
                <div className="modal-backdrop" onClick={() => setIsDeleteModalOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h3>Confirmer la suppression</h3>
                    <p>Voulez-vous vraiment supprimer cet avis ?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button onClick={confirmDeleteReview}>Oui, supprimer</button>
                        <button onClick={cancelDelete}>Annuler</button>
                    </div>
                    </div>
                </div>
                )}
                    
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Modal changement mot de passe */}
      {isPasswordModalOpen && (
            <div className="modal-backdrop" onClick={() => setIsPasswordModalOpen(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmitPassword}>
                    <input type="password" name="currentPassword" placeholder="Mot de passe actuel" onChange={handlePasswordChange} />
                    <input type="password" name="newPassword" placeholder="Nouveau mot de passe" onChange={handlePasswordChange} />
                    <button type="submit">Changer le mot de passe</button>
                    <button type="button" onClick={() => setIsPasswordModalOpen(false)}>Annuler</button>
                </form>
                </div>
            </div>
            )}

        {/* Modal édition avis */}
        {isReviewEditModalOpen && selectedReview && (
        <div className="modal-backdrop" onClick={() => setIsReviewEditModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={async (e) => { e.preventDefault(); await handleUpdateReview(); }}>
                <label>Note :</label>
                <input
                type="number"
                min="0"
                max="5"
                value={selectedReview.note}
                onChange={(e) =>
                    setSelectedReview({ ...selectedReview, note: Number(e.target.value) })
                }
                />
                <label>Commentaire :</label>
                <textarea value={selectedReview.commentaire} onChange={handleReviewChange} />
                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={() => setIsReviewEditModalOpen(false)}>Annuler</button>
            </form>
            </div>
        </div>
        )}
     
    </main>
  );
};

export default ProfilPage;
