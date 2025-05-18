import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { fr as frLocale } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useRootContext } from "../../router/root";
import { API_BASE_URL } from '../../../config';
import React from "react";
import { set } from "date-fns";
// Enregistrer la localisation une seule fois à l'extérieur du composant
registerLocale("fr", frLocale);


export default function ReservationPage() {
    const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateError, setDateError] = useState('');
    const [ticketError, setTicketError] = useState('');
    const [authError, setAuthError] = useState(false);    
    
    // Récupérer les tickets depuis le contexte global (Root)
    const { tickets } = useRootContext();
    const navigate = useNavigate();

    // Calculer le prix total à chaque modification des quantités
    useEffect(() => {
        const total = tickets.reduce((sum, ticket) => {
            const count = ticketCounts[ticket.id] || 0; // Si la quantité n'existe pas encore, la définir à 0
            return sum + (count * ticket.value);
        }, 0);
        setTotalPrice(total);
    }, [ticketCounts, tickets]);

    const handleTicketCountChange = (ticketId: number, increment: boolean) => {
        setTicketCounts(prevCounts => {
            const currentCount = prevCounts[ticketId] || 0;
            const newCount = Math.max(0, currentCount + (increment ? 1 : -1));
            return { ...prevCounts, [ticketId]: newCount };
        });
    };

    const handleReserve = async () => {
        const AuthToken = localStorage.getItem('token');

        // Vérifications avant d'envoyer la requête
        const totalTickets = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
        if (totalTickets === 0) {
            setTicketError("Veuillez sélectionner au moins un billet.");
            return;
        }

        if (!selectedDate || selectedDate < new Date()) {
            setDateError("Veuillez sélectionner une date valide.");
            return;
        }

        if (!AuthToken) {
            setAuthError(true);
            return;
        }
        

        const reservationData = {
            ticketCounts,
            visitDate: selectedDate.toISOString(),
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reserve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthToken}`
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                console.log('Réservation réussie, ouverture de la modale.');
                setIsModalOpen(true); // Ouvrir la modale de succès
            } else {
                const result = await response.json();  
                console.error('Erreur lors de la réservation:', result.message || 'Réservation échouée');
                alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
            alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
        }
    };

    const closeModal = () => {
        console.log('Fermeture de la modale.');
        setIsModalOpen(false);
        // Redirection après la fermeture de la modale
        navigate('/');   
    };

    return (
        <>
          <main className="reservation-page">
            <h2 className="reservation-title">Réservation</h2>
      
            <div className="reservation-content">
              <div className="reservation-image">
                <img src="/public/images/ticket2.webp" alt="image du ticket"   loading="lazy"/>
              </div>
      
              <div className="reservation-form">
                <table className="reservation-table">
                  <tbody>
                    {tickets.map(ticket => (
                      <tr key={ticket.id}>
                        <td className="ticket-info">
                          <strong>{ticket.name}</strong><br />
                          <span>Prix : {ticket.value}€</span>
                          <p className="ticket-condition">* Annulable jusqu'à 7 jours avant</p>
                        </td>
                        <td className="ticket-quantity">
                          <button onClick={() => handleTicketCountChange(ticket.id, false)}>-</button>
                          <span>{ticketCounts[ticket.id] || 0}</span>
                          <button onClick={() => handleTicketCountChange(ticket.id, true)}>+</button>
                        </td>
                      </tr>
                    ))}
                    <tr> 
                      <td colSpan={2}>
                        <div className="date-picker-wrapper">
                          <label>Choix de la date :</label>
                          <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date!)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Sélectionnez une date"
                                className="date-picker"
                                locale="fr"
                                popperPlacement="bottom-start"
                                minDate={new Date()}
                                />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                          <p className={`form-error ${ticketError ? 'visible' : ''}`}>{ticketError || '\u00A0'}</p>
                <p className={`form-error ${dateError ? 'visible' : ''}`}>{dateError || '\u00A0'}</p>
                                    {authError && (
                    <div className="auth-error-message">
                        Vous devez être connecté pour réserver.{" "}
                        <button onClick={() => navigate('/login')} className="auth-link">Se connecter</button>
                    </div>
                    )}
                                <div className="reservation-summary">
                  <p>Prix Total : <strong>{totalPrice}€ TTC</strong></p>
                  <button className="reservation-button" onClick={handleReserve}>
                    Réservez les billets
                  </button>
                </div>
              </div>
            </div>
      
            {isModalOpen && (
              <div className="modal_reservation">
                <div className="modal-content_reservation">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2>Réservation réussie</h2>
                  <button onClick={closeModal}>OK</button>
                </div>
              </div>
            )}
          </main>
        </>
      );
    }      