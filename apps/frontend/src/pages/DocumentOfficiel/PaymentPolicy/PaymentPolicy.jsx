import React from "react";
import "../OfficialDocument.css";

export default function PaymentPolicy() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 09/08/2025</p>
      <h1 className="t2">Politique de paiement</h1>

      <section>
        <h2 className="t32">1. Introduction</h2>
        <p className="t6">
          Cette politique décrit le fonctionnement des encaissements clients, la
          répartition des montants entre les parties (prestataire, hôtel et plateforme),
          les délais de versement ainsi que les règles applicables en cas de
          remboursement ou de litige.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Moyens de paiement et traitement</h2>
        <p className="t6">
          Les paiements des clients sont traités par notre prestataire de paiement{" "}
          <strong>Stripe</strong>. Stripe accepte plusieurs moyens de paiement
          (ex. cartes bancaires Visa/Mastercard, Apple Pay/Google Pay, et autres
          méthodes disponibles selon le pays et l’éligibilité du compte).
        </p>
        <ul>
          <li className="t6">
            Les données de carte bancaire sont <strong>chiffrées</strong> et
            traitées exclusivement par Stripe (conformité PCI DSS). Nous n’avons
            <strong> jamais </strong> accès aux numéros de carte complets et ne
            stockons aucune donnée sensible de paiement sur nos serveurs.
          </li>
          <li className="t6">
            Une fois le paiement confirmé par Stripe, la réservation est marquée
            « payée » sur notre plateforme.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="t32">3. Répartition des montants (commissions)</h2>
        <p className="t6">
          Pour chaque réservation payée, les montants sont répartis selon la
          structure de commission suivante&nbsp;:
        </p>
        <ul>
          <li className="t6">
            <strong>Commission plateforme</strong> : <strong>13&nbsp;%</strong>
          </li>
          <li className="t6">
            <strong>Commission hôtel</strong> : <strong>7&nbsp;%</strong>
          </li>
          <li className="t6">
            <strong>Montant net prestataire</strong> : le solde restant
            (<strong>80&nbsp;%</strong>) est reversé au prestataire.
          </li>
        </ul>
        <p className="t6">
          Les pourcentages ci-dessus sont appliqués sur le montant TTC encaissé
          auprès du client, sauf mention contraire contractuelle. Tout ajustement
          de taux peut faire l’objet d’une mise à jour de la présente politique et/ou
          d’un avenant contractuel.
        </p>
      </section>

      <section>
        <h2 className="t32">4. Versements (payouts)</h2>
        <p className="t6">
          Les versements des montants nets dus sont effectués à destination des
          bénéficiaires enregistrés (prestataire et, le cas échéant, hôtel) via les
          méthodes de virement disponibles (ex.&nbsp;IBAN).
        </p>
        <ul>
          <li className="t6">
            Les fonds sont reversés après confirmation du paiement et prise en
            compte des éventuels remboursements/annulations en cours.
          </li>
          <li className="t6">
            Des délais bancaires peuvent s’appliquer selon l’établissement et le pays
            du compte destinataire.
          </li>
          <li className="t6">
            Les bénéficiaires doivent fournir des informations de versement exactes
            et tenues à jour. En cas d’échec de virement dû à des coordonnées
            incorrectes, de nouveaux frais ou délais peuvent s’appliquer.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="t32">5. Frais et taxes</h2>
        <p className="t6">
          Les frais de traitement de paiement facturés par Stripe et/ou les frais
          bancaires de virement peuvent s’appliquer. Les parties sont responsables
          de leurs obligations fiscales respectives (TVA, impôts, cotisations, etc.).
        </p>
      </section>

      <section>
        <h2 className="t32">6. Remboursements et annulations</h2>
        <p className="t6">
          Les remboursements suivent la politique d’annulation applicable à l’offre
          réservée. Lorsqu’un remboursement est validé, le montant correspondant
          est restitué au client via Stripe. Les commissions déjà perçues peuvent
          être ajustées en conséquence.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Sécurité et conformité</h2>
        <ul>
          <li className="t6">
            Stripe est certifié <strong>PCI DSS</strong>. Les transactions sont
            sécurisées via des mesures techniques et organisationnelles conformes
            aux standards de l’industrie.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="t32">8. Modifications</h2>
        <p className="t6">
          Nous pouvons mettre à jour la présente politique pour refléter des évolutions
          réglementaires, techniques ou contractuelles. En cas de modification
          substantielle, une notification sera diffusée via la plateforme et/ou par e-mail.
        </p>
      </section>

      <section>
        <h2 className="t32">9. Contact</h2>
        <p className="t6">
          Pour toute question relative à cette politique de paiement, contactez-nous&nbsp;:
          {" "}
          <a href="mailto:tom.payan@viarte.eu" className="t6">tom.payan@viarte.eu</a>
        </p>
      </section>
    </div>
  );
}
