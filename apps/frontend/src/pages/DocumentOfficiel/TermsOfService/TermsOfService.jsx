import React from "react";
import "../OfficialDocument.css";

export default function TermsOfService() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 28/06/2025</p>
      <h1 className="t2">Conditions Générales d’Utilisation (CGU)</h1>

      <section>
        <h2 className="t32">1. Objet</h2>
        <p className="t6">
          Les présentes Conditions Générales d’Utilisation ont pour objet de définir les modalités d’accès et
          d’utilisation des services proposés sur notre plateforme par tout utilisateur, qu’il soit simple visiteur,
          client ou prestataire.
        </p>
      </section>

      <section>
        <h2 className="t32">2. Acceptation des conditions</h2>
        <p className="t6">
          En accédant à notre site et en l’utilisant, l’utilisateur accepte sans réserve l’intégralité des présentes
          conditions. En cas de désaccord, il est prié de ne pas utiliser le service.
        </p>
      </section>

      <section>
        <h2 className="t32">3. Accès au service</h2>
        <p className="t6">
          Le site est accessible 24h/24, 7j/7 sauf en cas de force majeure ou d’interruption nécessaire à la
          maintenance technique. Nous nous réservons le droit de suspendre l’accès à tout moment sans préavis.
        </p>
      </section>

      <section>
        <h2 className="t32">4. Inscription et comptes</h2>
        <p className="t6">
          Pour accéder à certains services, l’utilisateur doit créer un compte personnel. Il s’engage à fournir des
          informations exactes et à les tenir à jour. Le compte est strictement personnel et l’utilisateur est
          responsable de toute activité réalisée depuis celui-ci.
        </p>
      </section>

      <section>
        <h2 className="t32">5. Comportement des utilisateurs</h2>
        <p className="t6">
          L’utilisateur s’engage à utiliser la plateforme de manière légale et respectueuse. Il est interdit de :
        </p>
        <ul>
          <li className="t6">Diffuser des contenus illégaux, violents, haineux ou discriminatoires</li>
          <li className="t6">Utiliser le service à des fins frauduleuses ou commerciales sans autorisation</li>
          <li className="t6">Porter atteinte à la réputation ou à la sécurité du site ou d’autres utilisateurs</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">6. Propriété intellectuelle</h2>
        <p className="t6">
          Tous les contenus présents sur la plateforme (textes, images, logos, interfaces) sont protégés par le droit
          d’auteur et demeurent la propriété exclusive de notre société ou de ses partenaires. Toute reproduction ou
          utilisation non autorisée est interdite.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Responsabilité</h2>
        <p className="t6">
          Nous ne pouvons être tenus responsables en cas de dommage indirect lié à l’utilisation de la plateforme
          (perte de données, pertes commerciales…). L’utilisateur reste seul responsable de l’usage qu’il fait du
          service.
        </p>
      </section>

      <section>
        <h2 className="t32">8. Suspension ou suppression d’un compte</h2>
        <p className="t6">
          En cas de non-respect des présentes conditions, nous nous réservons le droit de suspendre ou supprimer
          l’accès à un compte utilisateur, temporairement ou définitivement, sans préavis.
        </p>
      </section>

      <section>
        <h2 className="t32">9. Modification des CGU</h2>
        <p className="t6">
          Les présentes conditions peuvent être modifiées à tout moment. En cas de modification, la nouvelle version
          entre en vigueur dès sa publication. Il appartient à l’utilisateur de consulter régulièrement cette page.
        </p>
      </section>

      <section>
        <h2 className="t32">10. Loi applicable</h2>
        <p className="t6">
          Les présentes CGU sont régies par la loi française. En cas de litige, et après échec de toute tentative de
          résolution amiable, les tribunaux français seront seuls compétents.
        </p>
      </section>
    </div>
  );
}
