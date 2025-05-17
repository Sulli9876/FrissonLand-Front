import React, { useEffect, useState } from "react";
import { Ibooking } from "../../type/types.ts";
import DeleteModal from "./deleteModal.tsx";

interface ReservationsProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeReservations({ token, apiBaseUrl }: ReservationsProps) {
  const [reservations, setReservations] = useState<Ibooking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationNumber, setSelectedReservationNumber] = useState<string | null>(null);  
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch(`${apiBaseUrl}/admin/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Données reçues des réservations :", data);
        setReservations(data.books); // ✅ bonne clé ici
      })
      .catch(console.error);
  };

  // Regroupement par reservation_number + visit_date
  const groupedReservations = Array.isArray(reservations)
  ? reservations.reduce<Record<string, { visit_date: string; bookings: Ibooking[] }>>((acc, r) => {
      if (!acc[r.reservation_number]) {
        acc[r.reservation_number] = { visit_date: r.visit_date, bookings: [] };
      }
      acc[r.reservation_number].bookings.push(r);
      return acc;
    }, {})
  : {};

  const confirmDelete = (reservationNumber: string) => {
    setSelectedReservationNumber(reservationNumber);
    setShowModal(true);
  };
  const handleDelete = () => {
    if (!selectedReservationNumber) return;
    fetch(`${apiBaseUrl}/admin/reservations/${selectedReservationNumber}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur suppression");
        setReservations(reservations.filter((r) => r.reservation_number !== selectedReservationNumber));
      })
      .catch(console.error)
      .finally(() => {
        setShowModal(false);
        setSelectedReservationNumber(null);
      });
  };

  return (
    <main className="backoffice backoffice-reservations">
    <h2>Réservations</h2>
    {reservations.length === 0 && <p>Aucune réservation trouvée.</p>}
    <ul>
      {Object.entries(groupedReservations).map(([num, data]) => (
        <li key={num}>
          <strong>Réservation #{num}</strong> — Date visite : {new Date(data.visit_date).toLocaleDateString()}
          <ul>
            {data.bookings.map((b) => (
              <li key={b.id}>
                {b.ticket.name} : {b.quantity} ticket{b.quantity > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
          <button onClick={() => confirmDelete(num)} className="action-btn">
            🗑️ Supprimer
        </button>
        </li>
      ))}
    </ul>

    <DeleteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
            message="Voulez-vous vraiment supprimer cette catégorie ?" // ou "ticket", "réservation", etc.
          />
  </main>
  );
}
