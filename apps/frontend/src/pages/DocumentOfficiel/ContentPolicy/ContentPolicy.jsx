import React from "react";
import "../OfficialDocument.css";

export default function ContentPolicy() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 28/06/2025</p>
      <h1 className="t2">Politique de contenu</h1>

      <section>
        <h2 className="t32">1. Objectif</h2>
        <p className="t6">
          Cette politique vise à garantir que tout le contenu publié sur notre plateforme soit fiable, respectueux,
          authentique et utile aux voyageurs. Elle s’applique à tous les éléments de contenu créés ou partagés, 
          notamment les titres, descriptions, images, emplacements, avis, horaires, tarifs, et tout autre élément 
          visible sur les pages d’activités.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Règles relatives aux photos</h2>

        <h3 className="t4">2.1 Photos autorisées</h3>
        <ul>
          <li className="t6">Images nettes, bien éclairées, cadrées correctement</li>
          <li className="t6">Représentation fidèle du lieu ou de l’activité proposée</li>
          <li className="t6">Photos prises par le prestataire ou ses clients avec leur autorisation</li>
          <li className="t6">Aucune retouche excessive ou élément trompeur</li>
        </ul>

        <h3 className="t4">2.2 Photos interdites</h3>
        <ul>
          <li className="t6">Contenu sexuellement explicite, violent ou inapproprié</li>
          <li className="t6">Photos contenant des enfants ou personnes identifiables sans consentement</li>
          <li className="t6">Logos seuls, QR codes ou filigranes</li>
          <li className="t6">Images floues, mal orientées ou sans rapport avec l’offre</li>
          <li className="t6">Images provenant de banques d’images non autorisées</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">3. Règles relatives aux descriptions</h2>
        <p className="t6">
          Les titres et descriptions doivent être :
        </p>
        <ul>
          <li className="t6"><strong>Clairs</strong> : faciles à comprendre et structurés</li>
          <li className="t6"><strong>Précis</strong> : refléter fidèlement l’activité</li>
          <li className="t6"><strong>Authentiques</strong> : basées sur une expérience réelle</li>
        </ul>
        <p className="t6">
          Ne doivent en aucun cas&nbsp;:
        </p>
        <ul>
          <li className="t6">Contenir de fausses informations ou promesses mensongères</li>
          <li className="t6">Inclure des propos discriminatoires, haineux ou politiques</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">4. Règles relatives aux avis</h2>
        <p className="t6">
          Les avis clients doivent être authentiques, postés volontairement par les utilisateurs ayant 
          réellement participé à l’activité. Il est impossible :
        </p>
        <ul>
          <li className="t6">De publier de faux avis</li>
          <li className="t6">De modifier ou supprimer des avis négatifs injustement</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">5. Contenu interdit</h2>
        <p className="t6">Tout contenu contenant les éléments suivants sera automatiquement rejeté :</p>
        <ul>
          <li className="t6">Incitation à la haine, à la violence ou à la discrimination</li>
          <li className="t6">Langage vulgaire, insultant ou menaçant</li>
          <li className="t6">Promotions pour d'autres sites ou plateformes concurrentes</li>
          <li className="t6">Données personnelles non autorisées (emails, numéros, etc.)</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">6. Sanctions</h2>
        <p className="t6">En cas de non-respect de cette politique :</p>
        <ul>
          <li className="t6">Le contenu pourra être supprimé sans avertissement</li>
          <li className="t6">Le compte utilisateur ou partenaire pourra être suspendu temporairement ou définitivement</li>
          <li className="t6">L’accès aux fonctionnalités de publication pourra être limité</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">7. Signalement</h2>
        <p className="t6">
          Si vous constatez un contenu non conforme à cette politique, vous pouvez le signaler via le bouton
          “Signaler” disponible sur chaque page d’activité. Notre équipe examinera chaque signalement dans un délai
          raisonnable et prendra les mesures appropriées.
        </p>
      </section>

      <section>
        <h2 className="t32">8. Modifications</h2>
        <p className="t6">
          Nous nous réservons le droit de mettre à jour cette politique à tout moment. La date de dernière
          modification est indiquée en haut de cette page. En continuant à utiliser la plateforme, vous acceptez les
          changements effectués.
        </p>
      </section>
    </div>
  );
}
