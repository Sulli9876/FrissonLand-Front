import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Ibooking, IReservationGroup } from '../../type/types';
import { API_BASE_URL } from '../../../config';

export default function ProfilReservationPage() {
  const [reservations, setReservations] = useState<IReservationGroup[]>([]);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDeleteResa, setPendingDeleteResa] = useState<string | null>(null);

  const fetchReservations = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    const res = await fetch(`${API_BASE_URL}/auth/profile/${userId}/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setReservations(data.reservations || []);
  };

  const confirmDelete = (reservationNumber: string) => {
    setPendingDeleteResa(reservationNumber);
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem('token');
    if (!token || !pendingDeleteResa) return;

    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    await fetch(`${API_BASE_URL}/auth/profile/${userId}/reservations/${pendingDeleteResa}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setModalOpen(false);
    setPendingDeleteResa(null);
    fetchReservations();
  };

  const handleEdit = (booking: Ibooking) => {
    setEditingBookId(booking.id);
    setUpdatedDate(booking.visit_date.substring(0, 10));
    setUpdatedQuantity(booking.quantity);
  };

  

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="profile-reviews profile-reservations">
      <h3>Mes Réservations</h3>

      {reservations.length === 0 ? (
        <p className="no-reviews">Aucune réservation trouvée.</p>
      ) : (
        reservations.map((res) => {
          const total = res.bookings.reduce((acc, booking) => {
            const quantity = Number(booking.quantity);
            const value = booking.ticket?.value ?? 0;
            return acc + quantity * value;
          }, 0);

          return (
            <div key={res.reservation_number} className="reservation-item flex">
              <img  
                src="/public/images/ticket2.png"
                alt="Ticket"
                className="ticket-image"
              />

              <div className="reservation-details">
                <h4>Réservation n° {res.reservation_number}</h4>
                <p>Date : {new Date(res.visit_date).toLocaleDateString()}</p>

                <ul className="ticket-list">
                  {res.bookings.map((booking, i) => (
                    <li key={i} className="ticket-line">
                      <span>{booking.ticket.name}</span>
                      {editingBookId === booking.id ? (
                        <>
                          <input
                            type="number"
                            min={1}
                            value={updatedQuantity}
                            onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
                          />
                        </>
                      ) : (
                        <>
                          <span>{booking.quantity} × {booking.ticket.value} €</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <p className="reservation-total">Total : {total} €</p>

                <div className="reservation-buttons">
                  <button onClick={() => confirmDelete(res.reservation_number)}>Annuler</button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* MODAL DE CONFIRMATION */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Confirmer l'annulation de la réservation ?</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteConfirmed}>Oui</button>
              <button onClick={() => setModalOpen(false)}>Non</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
