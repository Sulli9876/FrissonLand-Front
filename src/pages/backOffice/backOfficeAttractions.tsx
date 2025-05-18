import React, { useEffect, useState } from "react";
import { useRootContext } from "../../router/root";
import { Iattractions, Icategory } from "../../type/types";
import DeleteModal from "./deleteModal";

interface BackOfficeAttractionsProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeAttractions({ token, apiBaseUrl }: BackOfficeAttractionsProps) {
  const { attractions, setAttractions } = useRootContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAttraction, setEditedAttraction] = useState<Partial<Iattractions>>({});
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [attractionToDelete, setAttractionToDelete] = useState<number | null>(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [formAttraction, setFormAttraction] = useState<Partial<Iattractions>>({});

  useEffect(() => {
    fetch(`${apiBaseUrl}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error("Erreur de chargement des catégories :", err));
  }, [apiBaseUrl]);

  const confirmDelete = (id: number) => {
    setAttractionToDelete(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (attractionToDelete === null) return;

    fetch(`${apiBaseUrl}/admin/attractions/${attractionToDelete}`, {
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
        setShowModal(false);
        setAttractionToDelete(null);
      })
      .catch((err) => {
        console.error(err);
        setShowModal(false);
        setAttractionToDelete(null);
      });
  };

  const handleEdit = (attraction: Iattractions) => {
    setEditingId(attraction.id);
    setEditedAttraction({ ...attraction });
  };

  const handleSave = (id: number) => {
    if (
      editedAttraction.category_id == null ||
      typeof editedAttraction.category_id !== "number"
    ) {
      alert("Veuillez sélectionner une catégorie valide.");
      return;
    }

    fetch(`${apiBaseUrl}/admin/attractions/${id}`, {
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

  const openFormModal = () => {
    if (categories.length === 0) {
      alert("Aucune catégorie disponible. Créez-en une avant d'ajouter une attraction.");
      return;
    }

    setFormAttraction({
      name: "",
      description: "",
      image: "",
      duration: "00:00:00",
      category_id: categories[0].id,
    });
    setShowFormModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormAttraction((prev) => ({
      ...prev,
      [name]: name === "category_id" ? (value === "" ? undefined : parseInt(value)) : value,
    }));
  };

  const handleFormSubmit = () => {
    if (!formAttraction.name || !formAttraction.category_id) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    fetch(`${apiBaseUrl}/admin/attractions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formAttraction),
    })
      .then((res) => res.json())
      .then((data: Iattractions) => {
        setAttractions([...attractions, data]);
        setShowFormModal(false);
        setFormAttraction({});
      })
      .catch(() => alert("Erreur lors de la création de l'attraction"));
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
      <button onClick={openFormModal} className="add-btn">➕ Ajouter une attraction</button>

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
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  name="duration"
                  value={editedAttraction.duration || "00:00:00"}
                  onChange={handleChange}
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
                    alt="Aperçu"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <button onClick={() => handleSave(attraction.id)} className="action-btn">💾 Sauvegarder</button>
                <button onClick={() => setEditingId(null)} className="action-btn">❌ Annuler</button>
              </>
            ) : (
              <>
                <strong>{attraction.name}</strong> — {attraction.description}
                <div>
                  <button onClick={() => handleEdit(attraction)} className="action-btn">✏️ Modifier</button>
                  <button onClick={() => confirmDelete(attraction.id)} className="action-btn">🗑️ Supprimer</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Créer une nouvelle attraction</h3>
            <input
              name="name"
              placeholder="Nom"
              value={formAttraction.name || ""}
              onChange={handleFormChange}
            />
            <input
              name="description"
              placeholder="Description"
              value={formAttraction.description || ""}
              onChange={handleFormChange}
            />
            <input
              name="image"
              placeholder="URL de l'image"
              value={formAttraction.image || ""}
              onChange={handleFormChange}
            />
            <input
              type="time"
              step="1"
              name="duration"
              value={formAttraction.duration || "00:00:00"}
              onChange={handleFormChange}
            />
            <select
              name="category_id"
              value={formAttraction.category_id ?? ""}
              onChange={handleFormChange}
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {formAttraction.image && (
              <img
                src={formAttraction.image}
                alt="Aperçu"
                style={{ maxWidth: "100%", marginTop: "1rem" }}
              />
            )}
            <button className="btn btn-primary" onClick={handleFormSubmit}>Créer</button>
            <button className="btn btn-secondary" onClick={() => setShowFormModal(false)}>Annuler</button>
          </div>
        </div>
      )}

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Voulez-vous vraiment supprimer cette attraction ?"
      />
    </main>
  );
}
