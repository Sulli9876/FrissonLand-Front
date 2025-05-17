import React, { useEffect, useState } from "react";
import { Iticket } from "../../type/types";
import DeleteModal from "./deleteModal.tsx";

interface TicketsProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeTickets({ token, apiBaseUrl }: TicketsProps) {
  const [tickets, setTickets] = useState<Iticket[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formTicket, setFormTicket] = useState<Partial<Iticket>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${apiBaseUrl}/admin/tickets`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets || data))
      .catch(console.error);
  }, []);

  const openFormModal = (ticket?: Iticket) => {
    setIsEditing(!!ticket);
    setFormTicket(ticket || {});
    setShowFormModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTicket((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = () => {
    if (!formTicket.name || formTicket.value == null) {
      alert("Nom et valeur requis");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${apiBaseUrl}/admin/tickets/${formTicket.id}`
      : `${apiBaseUrl}/admin/tickets`;

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formTicket),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isEditing) {
          setTickets((prev) => prev.map((t) => (t.id === data.id ? data : t)));
        } else {
          setTickets((prev) => [...prev, data]);
        }
        setShowFormModal(false);
        setFormTicket({});
      })
      .catch(() => alert("Erreur lors de la sauvegarde"));
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    fetch(`${apiBaseUrl}/admin/tickets/${selectedId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setTickets((prev) => prev.filter((t) => t.id !== selectedId));
        setShowDeleteModal(false);
        setSelectedId(null);
      })
      .catch(() => alert("Erreur suppression"));
  };

  return (
    <main className="backoffice backoffice-tickets">
      <h2>Tickets</h2>
      <button className="add-btn" onClick={() => openFormModal()}>
        ➕ Ajouter un ticket
      </button>

      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            {t.name} — {t.value}€
            <button className="action-btn" onClick={() => openFormModal(t)}>✏️ Modifier</button>
            <button className="action-btn" onClick={() => confirmDelete(t.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? "Modifier" : "Créer"} un ticket</h3>
            <input
              name="name"
              placeholder="Nom"
              value={formTicket.name || ""}
              onChange={handleFormChange}
            />
            <input
              name="value"
              type="number"
              placeholder="Valeur (€)"
              value={formTicket.value ?? ""}
              onChange={handleFormChange}
            />
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              {isEditing ? "Modifier" : "Créer"}
            </button>
            <button className="btn btn-secondary" onClick={() => setShowFormModal(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message="Voulez-vous vraiment supprimer ce ticket ?"
      />
    </main>
  );
}