import "./InvoicesPage.css"
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ArrowDownRetired from "../../assets/images/ArrowDownRetired.png";

export default function InvoicesPage() {
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [virements, setVirements] = useState();

    function getActorId(authState) {
        if (authState.user?.provider_id) {
        return { key: "provider_id", value: authState.user.provider_id };
        }
        if (authState.user?.hote_id) {
        return { key: "hote_id", value: authState.user.hote_id };
        }
        return null;
    }
    

    function groupByYear(virements) {
        const currentYear = new Date().getFullYear();
        const startYear = 2024;

        const map = {};

        // initialise toutes les années (même vides)
        for (let year = startYear; year <= currentYear; year++) {
            map[year] = [];
        }

        // place les virements dans leur année
        virements.forEach(v => {
            const year = new Date(v.created_at).getFullYear();
            if (map[year]) map[year].push(v);
        });

        return map;
    }

    
    
    const getTransactionHistory = async () => {
        const actor = getActorId(authState);
         
        if(!actor){
            return
        }

        try {
            // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/invoice-documents/get-all-virement?${actor.key}=${actor.value}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const groupVirements = groupByYear(data.virements);
                setVirements(groupVirements);
                return data;
            } else {
                console.error("❌ Échec Récupération des virements du (provider/hote)");
                return { success: false };

            }
        } catch (error) {
            console.error("❌ Erreur Récupération des virements du (provider/hote) : ", error);
            return { success: false };
        }
    };

    async function downloadVirement(virementId) {
        try {
            const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/invoice-documents/download-avis-virement`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ virementId }),
            }
            );

            if (!response.ok) {
            throw new Error("Erreur génération PDF");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `avis_virement_${virementId}.pdf`;
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Téléchargement impossible :", err);
        }
    }

    
    
    useEffect(() => {
        if (authState.user?.hote_id || authState.user?.provider_id) {
            getTransactionHistory();
        }
    }, [authState])


    return (
        <div className="InvoicesPage">
            <p className="t32">{t("Invoice")}</p>
            <div className="virementColumn">
                <p className="t5 docfisc bold">Documents fiscaux</p>
                <p className="t5 infofisc">Les montants, les périodes concernées et les factures associées apparaissent ici dès qu’un nouveau virement est traité.</p>
                <div className="hline"></div>
            {
                virements ?
                Object.entries(virements)
                    .sort(([a], [b]) => b - a) // <-- ici on inverse l'ordre
                    .map(([year, list]) => (
                        <div key={year} className="yearGroup">
                            <p className="t3 bold">{year}</p>

                            {list.length > 0 ? (
                                list.map(virement => (
                                    <div className="virementElements" key={virement.id}>
                                        {/* <div className="column">
                                            <div className="row">
                                                <p className="t6">{virement.first_name}&nbsp;</p>
                                                <p className="t6">{virement.last_name}</p>
                                            </div>
                                            <p className="t6">Iban&nbsp;:&nbsp;{virement.iban}</p>
                                        </div>
                                        <div className="column">
                                            <div className="t4 greenColor">{virement.status}</div>
                                            <div className="t4">{virement.created_at}</div>
                                            <div className="t3 bold">{virement.amount}€</div>
                                        </div> */}
                                        {/* <a
                                            className="t5 bold underline"
                                            href={`/my-virement?id=${virement.id}`}
                                        >
                                            Virement du {new Date(virement.created_at).toLocaleDateString("fr-FR")}
                                        </a> */}

                                        <div
                                            className="virementElements"
                                            key={virement.id}
                                            onClick={() => downloadVirement(virement.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                        <img src={ArrowDownRetired} alt="Arrow Down Retired" />
                                        <p className="t5 bold underline">
                                            Virement du {new Date(virement.created_at).toLocaleDateString("fr-FR")}
                                        </p>
                                        </div>


                                    </div>
                                ))
                            ) : (
                                <p className="t5 noData">Aucun virement pour {year}</p>
                            )}
                            <div className="hline"></div>
                        </div>
                    ))
                :
                <div className="noVirementContainer">
                    <p>Aucun virement pour le moment.</p>
                </div>
                }
            </div>
            <div className="InfoContainer">   
                {
                    !authState?.user?.provider_id ? 
                        <>
                            <p className="t32 bold">Besoin d’une facture ?</p>
                            <p className="t5">Une facture est automatiquement générée à chaque virement et affichée ici par année.</p>
                        </>
                        :
                        <>
                            <p className="t5">Retrouvez ici tous vos virements classés par année</p>
                        </>
                }
            </div>
            <button className="MakeVirement" onClick={() => navigate("/payout-request")}>
                <img src={ArrowDownRetired} alt="Arrow Down Retired icon"/>
                <p className="t5">Faire un virement</p>
            </button>
        </div> 
    );
}