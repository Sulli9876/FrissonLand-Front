import React from 'react';

export default function LegalMentionPage() {
  return (
    <main className="legal-container">
      <section className="legal-content">
        <h2 className="legal-title">Mentions Légales</h2>

        <article className="legal-section">
          <h3>Informations Générales</h3>
          <p><strong>Nom du site :</strong> ZombieLand</p>
          <p><strong>Adresse du siège social :</strong> ZombieLand S.A.S., 123 Rue de l'Apocalypse, 666 Enfer</p>
          <p><strong>Numéro de téléphone :</strong> +33 1 23 45 67 89</p>
          <p><strong>Adresse e-mail :</strong> <a href="mailto:contact@zombieland.fr">contact@zombieland.fr</a></p>
        </article>

        <article className="legal-section">
          <h3>Propriété Intellectuelle</h3>
          <p>Le contenu de ce site, y compris mais sans s'y limiter, les textes, images, graphismes, logos, et vidéos, est la propriété exclusive de ZombieLand S.A.S. ou de ses partenaires. Toute reproduction, distribution, ou utilisation de ces éléments sans autorisation expresse est interdite et constitue une violation des droits d'auteur.</p>
        </article>

        <article className="legal-section">
          <h3>Données Personnelles</h3>
          <p><strong>Responsable du traitement des données :</strong> ZombieLand S.A.S.</p>
          <p><strong>Adresse :</strong> 123 Rue de l'Apocalypse, 666 Enfer</p>
          <p><strong>Adresse e-mail :</strong> <a href="mailto:dpo@zombieland.fr">dpo@zombieland.fr</a></p>
          <p>Les données personnelles collectées via ce site sont traitées dans le respect des lois en vigueur sur la protection des données personnelles. Pour plus d’informations sur la collecte, le traitement, et la protection de vos données personnelles, veuillez consulter notre <a href="#">Politique de Confidentialité</a>.</p>
        </article>

        <article className="legal-section">
          <h3>Cookies</h3>
          <p>Le site ZombieLand utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Pour plus de détails sur notre utilisation des cookies, veuillez consulter notre <a href="#">Politique de Cookies</a>.</p>
        </article>

        <article className="legal-section">
          <h3>Responsabilité</h3>
          <p>ZombieLand S.A.S. s’efforce d’assurer l’exactitude et la mise à jour des informations fournies sur ce site. Cependant, nous ne pouvons garantir que ces informations sont exemptes d’erreurs ou d’omissions. En conséquence, ZombieLand S.A.S. décline toute responsabilité pour les éventuels dommages directs ou indirects résultant de l’utilisation de ce site ou des informations qui y figurent.</p>
        </article>

        <article className="legal-section">
          <h3>Liens Externes</h3>
          <p>Le site peut contenir des liens vers des sites web externes. ZombieLand S.A.S. n’exerce aucun contrôle sur ces sites et décline toute responsabilité concernant leur contenu. L’accès à ces sites se fait sous votre propre responsabilité.</p>
        </article>

        <article className="legal-section">
          <h3>Modifications des Mentions Légales</h3>
          <p>ZombieLand S.A.S. se réserve le droit de modifier les présentes mentions légales à tout moment. Les modifications seront publiées sur cette page et seront applicables dès leur mise en ligne. Il est recommandé de consulter régulièrement cette page pour être informé des éventuelles mises à jour.</p>
        </article>

        <article className="legal-section">
          <h3>Droit Applicable</h3>
          <p>Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l’utilisation du site sera soumis aux tribunaux compétents de Paris.</p>
        </article>
      </section>
    </main>
  );
}
