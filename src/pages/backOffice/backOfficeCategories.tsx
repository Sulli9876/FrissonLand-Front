import React, { useEffect, useState } from "react";
import { Icategory } from "../../type/types";
import DeleteModal from "./deleteModal.tsx";

interface CategoriesProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeCategories({ token, apiBaseUrl }: CategoriesProps) {
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formCategory, setFormCategory] = useState<Partial<Icategory>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${apiBaseUrl}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || data))
      .catch(console.error);
  };

  const openFormModal = (category?: Icategory) => {
    setIsEditing(!!category);
    setFormCategory(category || {});
    setShowFormModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    if (!formCategory.name || formCategory.name.trim() === "") {
      alert("Le nom est requis");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${apiBaseUrl}/admin/categories/${formCategory.id}`
      : `${apiBaseUrl}/admin/categories`;

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isEditing) {
          setCategories((prev) => prev.map((c) => (c.id === data.id ? data : c)));
        } else {
          setCategories((prev) => [...prev, data]);
        }
        setShowFormModal(false);
        setFormCategory({});
      })
      .catch(() => alert("Erreur lors de la sauvegarde"));
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    fetch(`${apiBaseUrl}/admin/categories/${selectedId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setCategories((prev) => prev.filter((c) => c.id !== selectedId));
        setShowDeleteModal(false);
        setSelectedId(null);
      })
      .catch(() => alert("Erreur suppression"));
  };

  return (
    <main className="backoffice backoffice-categories">
      <h2>Catégories</h2>
      <button className="add-btn" onClick={() => openFormModal()}>
        ➕ Ajouter une catégorie
      </button>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button className="action-btn" onClick={() => openFormModal(c)}>✏️ Modifier</button>
            <button className="action-btn" onClick={() => confirmDelete(c.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? "Modifier" : "Créer"} une catégorie</h3>
            <input
              name="name"
              placeholder="Nom de la catégorie"
              value={formCategory.name || ""}
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
        message="Voulez-vous vraiment supprimer cette catégorie ?"
      />
    </main>
  );
}
