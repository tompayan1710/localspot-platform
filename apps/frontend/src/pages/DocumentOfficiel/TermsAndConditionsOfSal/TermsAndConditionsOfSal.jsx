import React from "react";
import "../OfficialDocument.css";

export default function TermsAndConditionsOfSale() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 28/06/2025</p>
      <h1 className="t2">Conditions Générales de Vente (CGV)</h1>

      <section>
        <h2 className="t32">1. Objet</h2>
        <p className="t6">
          Les présentes conditions générales régissent les ventes de prestations touristiques proposées via notre plateforme. Toute réservation implique l’acceptation sans réserve des présentes CGV.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Prestations proposées</h2>
        <p className="t6">
          Notre plateforme permet la réservation d’activités, visites guidées, ateliers, expériences locales, ou tout autre service proposé par des prestataires partenaires.
        </p>
        <p className="t6">
          Chaque prestation fait l’objet d’une fiche descriptive mentionnant ses caractéristiques essentielles.
        </p>
      </section>

      <section>
        <h2 className="t32">3. Réservations</h2>
        <p className="t6">
          La réservation est effectuée via notre site et est confirmée après réception du paiement. Un email de confirmation est envoyé à l'utilisateur. Le prestataire peut dès lors consulter la réservation, notamment la date et à l'heure prévues à laquelle celle-ci s'est déroulée.
        </p>
      </section>

      <section>
        <h2 className="t32">4. Tarifs et paiements</h2>
        <p className="t6">
          Les prix sont affichés en euros et toutes taxes comprises. Les paiements sont sécurisés et traités via notre prestataire de paiement agréé (ex. Stripe).
        </p>
        <p className="t6">
          Le montant est débité au moment de la réservation. Une commission est prélevée automatiquement pour la gestion de la plateforme et du service rendu.
        </p>
      </section>

      <section>
        <h2 className="t32">5. Annulations et remboursements</h2>
        <p className="t6">
          Les conditions d’annulation sont précisées. Selon le cas, un remboursement total ou partiel peut être effectué. En cas d’annulation du prestataire, un remboursement intégral sera proposé ou une solution alternative sera proposée.
        </p>
      </section>

      <section>
        <h2 className="t32">6. Responsabilités</h2>
        <p className="t6">
          La plateforme agit comme intermédiaire entre l’utilisateur et le prestataire. Elle ne peut être tenue responsable d’un manquement ou d’une mauvaise exécution de la prestation par le prestataire.
        </p>
        <p className="t6">
          Le prestataire est seul responsable de la conformité, de la sécurité, et de la qualité du service fourni.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Données personnelles</h2>
        <p className="t6">
          Les données collectées lors de la réservation sont traitées conformément à notre <a href="/privacy-policy" className="t6">politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2 className="t32">8. Droit de rétractation</h2>
        <p className="t6">
          Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux prestations de services d’activités de loisirs fournies à une date ou selon une périodicité déterminée.
        </p>
      </section>

      <section>
        <h2 className="t32">9. Litiges</h2>
        <p className="t6">
          En cas de litige, une solution amiable sera recherchée. À défaut, le litige sera porté devant les tribunaux compétents du lieu du siège social de la société.
        </p>
      </section>

      <section>
        <h2 className="t32">10. Modifications des CGV</h2>
        <p className="t6">
          Nous nous réservons le droit de modifier les présentes conditions à tout moment. Les nouvelles conditions s’appliqueront à toute nouvelle réservation effectuée après leur mise à jour.
        </p>
      </section>
    </div>
  );
}
