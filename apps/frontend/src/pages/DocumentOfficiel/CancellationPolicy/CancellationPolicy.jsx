import React from "react";
import "../OfficialDocument.css";

export default function CancellationPolicy() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 02/08/2025</p>
      <h1 className="t2">Politique d'annulation du prestataire</h1>

      <section>
        <h2 className="t32">1. Introduction</h2>
        <p className="t6">
          Cette politique d’annulation décrit les conditions applicables lorsqu’un voyageur souhaite annuler une réservation effectuée via notre plateforme. Elle s’applique spécifiquement aux offres pour lesquelles l’option <strong>« Annulation gratuite »</strong> a été activée par le prestataire.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Annulation gratuite</h2>
        <p className="t6">
          Lorsque l’option « Annulation gratuite » est activée, les voyageurs peuvent annuler leur réservation <strong>jusqu’à 2 heures avant le début de la prestation</strong> sans frais. Dans ce cas, <strong>le remboursement est intégral</strong>, et le montant total payé sera automatiquement recrédité via le mode de paiement utilisé lors de la réservation.
        </p>
      </section>

      <section>
        <h2 className="t32">3. Délai dépassé</h2>
        <p className="t6">
          Passé ce délai de 2 heures avant le début de la prestation, toute demande d’annulation ne donnera lieu à <strong>aucun remboursement</strong>. Le voyageur reste entièrement redevable du montant total de la réservation, quel que soit le motif de l’annulation.
        </p>
      </section>

      <section>
        <h2 className="t32">4. Exceptions</h2>
        <p className="t6">
          Cette politique est strictement appliquée sauf en cas de force majeure avérée (catastrophe naturelle, accident grave, etc.), auquel cas une évaluation au cas par cas pourra être réalisée à la seule discrétion de notre support client.
        </p>
      </section>

      <section>
        <h2 className="t32">5. Engagement du prestataire</h2>
        <p className="t6">
          En activant l’option « Annulation gratuite » sur une offre, le prestataire s’engage à respecter les conditions énoncées ci-dessus et à autoriser le remboursement intégral des voyageurs conformément aux modalités indiquées.
        </p>
      </section>

      <section>
        <h2 className="t32">6. Modifications</h2>
        <p className="t6">
          Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification importante sera communiquée aux utilisateurs via notre plateforme ou par e-mail.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Contact</h2>
        <p className="t6">
          Pour toute question concernant cette politique d’annulation, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:tom.payan@viarte.eu" className="t6">tom.payan@viarte.eu</a>
        </p>
      </section>
    </div>
  );
}
