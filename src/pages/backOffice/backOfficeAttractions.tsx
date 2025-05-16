import React, { useEffect, useState } from "react";
import { useRootContext } from "../../router/root";
import { API_BASE_URL } from "../../../config";
import { Iattractions, Icategory } from "../../type/types";

export default function BackOfficeAttractions() {
  const { attractions, setAttractions } = useRootContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAttraction, setEditedAttraction] = useState<Partial<Iattractions>>({});
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [attractionToDelete, setAttractionToDelete] = useState<number | null>(null);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error("Erreur de chargement des catégories :", err));
  }, []);

  // Affiche la modale et mémorise l'id de l'attraction à supprimer
  const confirmDelete = (id: number) => {
    setAttractionToDelete(id);
    setShowDeleteModal(true);
  };

  // Supprime l'attraction confirmée dans la modale
  const handleDeleteConfirmed = () => {
    if (attractionToDelete === null) return;

    fetch(`${API_BASE_URL}/admin/attractions/${attractionToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur suppression");
        return res.json();
      })
      .then(() => {
        setAttractions(attractions.filter((a) => a.id !== attractionToDelete));
        setShowDeleteModal(false);
        setAttractionToDelete(null);
      })
      .catch((err) => {
        console.error(err);
        setShowDeleteModal(false);
        setAttractionToDelete(null);
      });
  };

  const handleEdit = (attraction: Iattractions) => {
    setEditingId(attraction.id);
    setEditedAttraction({
      ...attraction,
      category_id: attraction.category_id ?? undefined,
    });
  };

  const handleSave = (id: number) => {
    if (
      editedAttraction.category_id == null ||
      typeof editedAttraction.category_id !== "number"
    ) {
      alert("Veuillez sélectionner une catégorie valide.");
      return;
    }

    fetch(`${API_BASE_URL}/admin/attractions/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedAttraction),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur sauvegarde");
        return res.json();
      })
      .then((data: Iattractions) => {
        setAttractions((prev) => prev.map((a) => (a.id === id ? data : a)));
        setEditingId(null);
      })
      .catch((err) => console.error(err));
  };

  const handleCreate = () => {
    if (categories.length === 0) {
      alert("Aucune catégorie disponible. Créez-en une avant d'ajouter une attraction.");
      return;
    }

    const newAttraction: Partial<Iattractions> = {
      name: "Nouvelle attraction",
      description: "",
      image: "",
      duration: "00:00:00",
      category_id: categories[0].id,
    };
    fetch(`${API_BASE_URL}/admin/attractions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttraction),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur création");
        return res.json();
      })
      .then((data: Iattractions) => {
        setAttractions([...attractions, data]);
        setEditingId(data.id);
        setEditedAttraction(data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedAttraction((prev) => ({
      ...prev,
      [name]: name === "category_id" ? (value === "" ? undefined : parseInt(value)) : value,
    }));
  };

  return (
    <main className="backoffice backoffice-attractions">
      <h2>Attractions</h2>
      <button onClick={handleCreate}>➕ Ajouter une attraction</button>

      <ul>
        {attractions.map((attraction) => (
          <li key={attraction.id}>
            {editingId === attraction.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedAttraction.name || ""}
                  onChange={handleChange}
                  placeholder="Nom"
                />
                <input
                  type="text"
                  name="description"
                  value={editedAttraction.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <select
                  name="category_id"
                  value={editedAttraction.category_id ?? ""}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner une catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id ?? cat.name} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="time"
                  name="duration"
                  value={editedAttraction.duration || "00:00:00"}
                  onChange={handleChange}
                  placeholder="Durée (HH:MM:SS)"
                  step="1"
                />

                <input
                  type="text"
                  name="image"
                  value={editedAttraction.image || ""}
                  onChange={handleChange}
                  placeholder="URL de l'image"
                />

                {editedAttraction.image && (
                  <img
                    src={editedAttraction.image}
                    alt="Aperçu de l'attraction"
                    style={{ width: "200px", marginTop: "10px" }}
                  />
                )}

                <button onClick={() => handleSave(attraction.id)}>💾 Sauvegarder</button>
                <button onClick={() => setEditingId(null)}>❌ Annuler</button>
              </>
            ) : (
              <>
                <strong>{attraction.name}</strong> — {attraction.description}
                <button onClick={() => handleEdit(attraction)}>✏️ Modifier</button>
                <button onClick={() => confirmDelete(attraction.id)}>🗑️ Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modale de confirmation */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer cette attraction ?</p>
            <button onClick={handleDeleteConfirmed}>Oui, supprimer</button>
            <button onClick={() => setShowDeleteModal(false)}>Annuler</button>
          </div>
        </div>
      )}
    </main>
  );
}
