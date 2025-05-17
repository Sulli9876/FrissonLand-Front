import React, { useEffect, useState } from "react";
import { Iuser } from "../../type/types.ts";
import DeleteModal from "./deleteModal.tsx";

interface UsersProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeUsers({ token, apiBaseUrl }: UsersProps) {
  const [users, setUsers] = useState<Iuser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(`${apiBaseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || data))
      .catch(console.error);
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    fetch(`${apiBaseUrl}/admin/users/${selectedId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur suppression");
        setUsers(users.filter((u) => u.id !== selectedId));
      })
      .catch(console.error)
      .finally(() => {
        setShowModal(false);
        setSelectedId(null);
      });
  };

  return (
    <main className="backoffice backoffice-users">
      <h2>Utilisateurs</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <span>
            <strong>{u.first_name + ' ' + u.last_name}</strong>            
            </span> 
            <p>{u.mail}</p> 
            <button onClick={() => confirmDelete(u.id)} className="action-btn">🗑️ Supprimer</button>
          </li>
        ))}
      </ul>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Voulez-vous vraiment supprimer cet utilisateur  ?" // ou "ticket", "réservation", etc.
      />
    </main>
  );
}
