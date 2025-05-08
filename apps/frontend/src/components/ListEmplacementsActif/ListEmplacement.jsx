import React, { useEffect } from "react";
import "./ListEmplacementsActif.css";
import eyeicon from "../../assets/images/eyeblueicon.png"
import trashicon from "../../assets/images/trashicon.png"
import editicon from "../../assets/images/editicon.png"
import listeicon from "../../assets/images/listeicon.png"



export default function ListeEmplacement({markers, loading, error}) {

    useEffect(()=>{
        console.log(markers);
    })

    function formatDateFR(dateISO) {
        const date = new Date(dateISO);
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const annee = date.getFullYear();
        return `${jour}/${mois}/${annee}`;
      }
      

  return (
    <div className="ListEmplacementContainer">
      <table className="emplacementTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Adresse</th>
            <th>Date de création</th>
            <th>État</th>
            <th id="thAction">Action</th>
          </tr>
        </thead>
        <tbody>
          {markers.map((item, index) => (
            <tr key={item.id}>
              <td className="id">{markers[index]?.id}</td>
              <td>{markers[index]?.position_description}</td>
              <td>{markers[index]?.adresse}</td>
              <td>{formatDateFR(markers[index]?.created_at)}</td>
              <td>
                <span
                  className={
                    item.etat === "Actif" ? "etat actif" : "etat attente"
                  }
                >
                  {item.etat ? item.etat : "NoValue"}
                </span>
              </td>
              <td className="actions">
                <button className="icon-button view" title="Voir">
                    <img src={eyeicon} alt="eye icon"/>
                </button>
                <button className="icon-button edit" title="Éditer">
                    <img src={editicon} alt="edit icon"/>
                </button>
                <button className="icon-button delete" title="Supprimer">
                    <img src={trashicon} alt="trash icon"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="SeeAllContainer">
        <p className="t6">Affichage de <strong>1</strong> à <strong>5</strong> sur <strong>42</strong> résultats</p>
        <button id="SeeAll">
            <img src={listeicon} alt="liste icon" />
            <p className="t6">Voir tout</p>
        </button>
      </div>
    </div>
  );
}
