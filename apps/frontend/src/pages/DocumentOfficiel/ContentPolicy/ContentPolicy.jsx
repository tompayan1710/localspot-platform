import React from "react";
import "./ContentPolicy.css";

export default function ContentPolicy() {
  return (
    <div className="ContentPolicyContainer">
      <h1 className="t3">Politique de contenu</h1>

      <section>
        <h2 className="t32">Objectif</h2>
        <p className="t5">
          Cette politique vise à garantir que tout le contenu publié sur notre plateforme est fiable, respectueux, authentique
          et utile aux voyageurs. Elle s’applique à toutes les offres créées, y compris les images, titres, descriptions, adresses et autres informations visibles publiquement.
        </p>
      </section>

      <section>
        <h2 className="t32">Photos autorisées</h2>
        <ul>
          <li className="t5">Photos claires, nettes, bien cadrées</li>
          <li className="t5">Représentation fidèle de l'offre proposée (lieux, activités, équipements, repas, etc.)</li>
          <li className="t5">Photos prises sur place (pas de banques d'images génériques)</li>
          <li className="t5">Formats acceptés&nbsp;: JPG, PNG, WebP</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">Photos interdites</h2>
        <ul className="">
          <li className="t5">Contenus sexuels, violents, haineux ou inappropriés</li>
          <li className="t5">Logos seuls, QR codes, textes promotionnels ou filigranes</li>
          <li className="t5">Photos floues, pixelisées, mal orientées ou trompeuses</li>
          <li className="t5">Photos contenant des personnes non consentantes ou reconnaissables sans autorisation</li>
          <li className="t5">Captures d'écran, mèmes, GIFs</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">Descriptions</h2>
        <p className="t5">
          Les titres et descriptions doivent être <strong>précis</strong>, <strong>pertinents</strong> et <strong>exempts de fautes</strong>.
          Ils ne doivent pas&nbsp;:
        </p>
        <ul className="">
          <li className="t5">Inclure de fausses informations</li>
          <li className="t5">Contenir des propos discriminatoires, politiques ou religieux</li>
          <li className="t5">Être copiés d’autres annonces</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">Sanctions</h2>
        <p className="t5">
          Le non-respect de cette politique peut entraîner&nbsp;:
        </p>
        <ul>
          <li className="t5">La suppression du contenu sans avertissement</li>
          <li className="t5">Le rejet de l’offre lors de la validation</li>
          <li className="t5">La suspension temporaire ou définitive du compte</li>
        </ul>
      </section>

      <section>
        <h2 className="t32">Signalement</h2>
        <p className="t5">
          Tout utilisateur peut signaler une offre inappropriée via le bouton “Signaler” disponible sur chaque page d’offre.
        </p>
      </section>
    </div>
  );
}
