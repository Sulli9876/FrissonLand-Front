import React from "react";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export default function DeleteModal({
  show,
  onClose,
  onConfirm,
  message = "Voulez-vous vraiment supprimer cet élément ?",
}: DeleteModalProps) {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="btn btn-danger" onClick={onConfirm}>
          Confirmer
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}
