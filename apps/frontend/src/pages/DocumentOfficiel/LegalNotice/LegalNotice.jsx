import React from "react";
import "../OfficialDocument.css";

export default function LegalNotice() {
  return (
    <div className="OfficalDocumentContainer">
      <p className="t6">Modifié : 28/06/2025</p>
      <h1 className="t2">Mentions légales</h1>

      <section>
        <h2 className="t32">1. Éditeur du site</h2>
        <p className="t6">
          Le présent site est édité par : <strong>Viarte</strong>, micro-entreprise, immatriculée au RCS de Grasse sous le numéro <strong>985 019 488</strong>.
        </p>
        <p className="t6">
          Siège social : 16 Bd Albert 1er, 06600 Antibes<br />
          Téléphone : +33 07 65 59 40 97<br />
          Adresse e-mail : <a href="mailto:tom.payan@viarte.eu" className="t6">tom.payan@viarte.eu</a>
        </p>
      </section>

      <section>
        <h2 className="t32">2. Hébergement</h2>
        <p className="t6">
          Le site est hébergé par : <strong>Hostinger</strong><br />
          Adresse : William Grant & Sons France, 44, Av. du Capitaine Glarner 93585 Saint Ouen Cedex<br />
        </p>
      </section>

      <section>
        <h2 className="t32">3. Directeur de la publication</h2>
        <p className="t6">
          Le directeur de la publication est :  PAYAN Tom, en qualité de gérant et représentant légal de la société Viarte.
        </p>
      </section>

      <section>
        <h2 className="t32">4. Propriété intellectuelle</h2>
        <p className="t6">
          Le contenu du site (textes, images, vidéos, logos, éléments graphiques, etc.) est la propriété exclusive de Viarte ou de ses partenaires. Toute reproduction, distribution, ou utilisation sans autorisation est strictement interdite.
        </p>
      </section>

      <section>
        <h2 className="t32">5. Responsabilité</h2>
        <p className="t6">
          Viarte s'efforce de fournir des informations fiables, mais ne saurait être tenu responsable d'erreurs, d'omissions ou de résultats obtenus à partir de l’usage des informations diffusées. L'utilisateur reste seul responsable de l’utilisation des contenus proposés.
        </p>
      </section>

      <section>
        <h2 className="t32">6. Données personnelles</h2>
        <p className="t6">
          Pour plus d’informations sur la gestion des données personnelles, veuillez consulter notre <a href="/privacy-policy" className="t6">politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2 className="t32">7. Loi applicable</h2>
        <p className="t6">
          Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux du siège social de l’éditeur, sauf disposition légale contraire.
        </p>
      </section>
    </div>
  );
}
