import React from "react";
export default function UnauthorizedPage() {
    return (
        <main className='not-found-page' >
        <h1 className='not-found-title'>Accès non autorisé</h1>
        <p className='not-found-text'>Vous n’avez pas les droits nécessaires pour accéder à cette page.</p>
      </main >
    );
  }