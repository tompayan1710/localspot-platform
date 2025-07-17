import React from "react";
import "../OfficialDocument.css";

export default function PrivacyPolicy() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 28/06/2025</p>
      <h1 className="t2">Politique de confidentialité</h1>

      <section>
        <h2 className="t32">1. Introduction</h2>
        <p className="t6">
          Cette politique de confidentialité explique comment notre plateforme collecte, utilise, partage et protège vos données personnelles lorsque vous utilisez nos services.
          En utilisant notre site, vous acceptez les pratiques décrites ci-dessous.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Données collectées</h2>
        <p className="t6">Nous pouvons collecter différents types de données personnelles :</p>
        <ul>
          <li className="t6">Informations d'identité : nom, prénom, adresse e-mail, numéro de téléphone.</li>
          <li className="t6">Données de réservation : nombre de participants, dates choisies, créneaux horaires.</li>
          <li className="t6">Données liées à la synchronisation avec des services externes (Google Calendar, etc.).</li>
        </ul>
        <p className="t6">Pour les informations de paiement, celles-ci sont traitées exclusivement par des prestataires de services de paiement agréés (ex. Stripe). Aucune donnée de carte bancaire n’est stockée ni accessible par notre plateforme.</p>
      </section>

      <section>
        <h2 className="t32">3. Utilisation des données</h2>
        <p className="t6">Nous utilisons vos données pour :</p>
        <ul>
          <li className="t6">Gérer les réservations et les paiements.</li>
          <li className="t6">Personnaliser l'expérience utilisateur.</li>
          <li className="t6">Envoyer des notifications importantes liées à vos réservations.</li>
          <li className="t6">Analyser les statistiques d’usage et améliorer notre service.</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">4. Partage des données</h2>
        <p className="t6">Nous partageons vos données uniquement dans les cas suivants :</p>
        <ul>
          <li className="t6">Avec les prestataires de service pour gérer vos réservations.</li>
          <li className="t6">Avec les autorités compétentes en cas d'obligation légale.</li>
        </ul>
        <p className="t6">Nous ne vendons jamais vos données à des tiers.</p>
      </section>

      <section>
        <h2 className="t32">5. Durée de conservation</h2>
        <p className="t6">
          Vos données sont conservées aussi longtemps que nécessaire pour fournir nos services ou pour satisfaire à nos obligations légales.
        </p>
      </section>

      <section>
        <h2 className="t32">6. Sécurité</h2>
        <p className="t6">
          Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou destruction.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Vos droits</h2>
        <p className="t6">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li className="t6">Droit d’accès à vos données personnelles.</li>
          <li className="t6">Droit de rectification ou d’effacement de vos données.</li>
          <li className="t6">Droit d’opposition ou de limitation du traitement.</li>
          <li className="t6">Droit à la portabilité des données.</li>
          <li className="t6">Droit d’introduire une réclamation auprès de la CNIL.</li>
        </ul>
        <p className="t6">Vous pouvez exercer vos droits à tout moment en nous contactant par e-mail.</p>
      </section>

      <section>
        <h2 className="t32">8. Cookies</h2>
        <p className="t6">
          Nous utilisons des cookies strictement nécessaires au fonctionnement du site.
        </p>
        {/* <p className="t6">
          Nous utilisons des cookies strictement nécessaires au fonctionnement du site ainsi que des cookies analytiques anonymes. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
        </p> */}
      </section>

      <section>
        <h2 className="t32">9. Services tiers</h2>
        <p className="t6">
          Notre plateforme peut interagir avec des services externes comme Google Calendar, Stripe, ou des CRM. Ces services disposent de leurs propres politiques de confidentialité.
        </p>
      </section>

      <section>
        <h2 className="t32">10. Modifications</h2>
        <p className="t6">
          Nous nous réservons le droit de modifier cette politique à tout moment. En cas de mise à jour majeure, nous vous en informerons par e-mail ou via notre plateforme.
        </p>
      </section>

      <section>
        <h2 className="t32">11. Contact</h2>
        <p className="t6">
          Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter à : <a href="mailto:tom.payan@viarte.eu" className="t6">tom.payan@viarte.eu</a>
        </p>
      </section>
    </div>
  );
}
