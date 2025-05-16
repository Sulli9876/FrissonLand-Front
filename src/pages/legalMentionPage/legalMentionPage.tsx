import React from 'react';

export default function LegalMentionPage() {
  return (
    <main className="legal-container">
      <h2 className="legal-title">Mentions Légales</h2> {/* ✅ En dehors de .legal-content */}

      <div className="legal-content">
        {/*  Colonne gauche */}
        <section className="legal-left">
          <article className="legal-section">
            <h3>Informations Générales</h3>
            <p><strong>Nom du site :</strong> ZombieLand</p>
            <p><strong>Adresse :</strong> 123 Rue de l'Apocalypse, 666 Enfer</p>
            <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
            <p><strong>Email :</strong> <a href="mailto:contact@zombieland.fr">contact@zombieland.fr</a></p>
          </article>

          <article className="legal-section">
            <h3>Propriété Intellectuelle</h3>
            <p>Le contenu du site est la propriété de ZombieLand S.A.S.</p>
          </article>

          <article className="legal-section">
            <h3>Données Personnelles</h3>
            <p><strong>DPO :</strong> dpo@zombieland.fr</p>
            <p>Les données sont traitées dans le respect des lois.</p>
          </article>
        </section>

        {/*  Colonne droite */}
        <section className="legal-right">
          <article className="legal-section">
            <h3>Cookies</h3>
            <p>Ce site utilise des cookies pour améliorer l’expérience utilisateur.</p>
          </article>

          <article className="legal-section">
            <h3>Responsabilité</h3>
            <p>ZombieLand décline toute responsabilité pour l’usage du site.</p>
          </article>

          <article className="legal-section">
            <h3>Liens Externes</h3>
            <p>Les liens externes ne sont pas sous notre responsabilité.</p>
          </article>

          <article className="legal-section">
            <h3>Modifications</h3>
            <p>Ces mentions peuvent être modifiées à tout moment.</p>
          </article>

          <article className="legal-section">
            <h3>Droit Applicable</h3>
            <p>Les présentes sont régies par le droit français.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
