import "./TransactionInfo.css"

import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../../../components/GoBack/GoBack";
import { useSSR, useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { formatEuro } from "../../../services/formatEuro";

import EuroNavBlue from "../../../assets/images/EuroNavBlue.png"
import bankicon from "../../../assets/images/bankicon.png"
import CreditCard from "../../../assets/images/CardIconfin.png"
import BanckFin from "../../../assets/images/BanckFin.png"
import privacy from "../../../assets/images/privacy.png"
import ArrowRightRetired from "../../../assets/images/ArrowRightRetired.png"
import ArrowLearnMore from "../../../assets/images/ArrowLearnMore.png"

import TestLoading from "../../../components/Utils/TestLoading";
import { plural } from "../../../services/translation";

export default function TransactionInfo(){
    const location = useLocation(); 
    const { type, id } = location.state;
    const { authState } = useContext(AuthContext);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    console.warn(type, id);

    const [ earning, setEarning ] = useState({});
    const [ payout, setPayout ] = useState({});
    const [ loading, setLoading ] = useState(true);
    
    const fetchInfoEarning = async () => {
        try {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
         
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/transactions/get?id=${id}&provider_id=${provider_id}`, {
                method: "GET"
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();
        if (data.success) {
          setEarning(data.earning[0]);
        } else {
          alert("Erreur lors de la récupération de la transaction.");
        }
        } catch (err) {
        console.error("❌ Erreur fetchVersements:", err);
        } finally {
        setTimeout(() => {
            setLoading(false);
        }, 500)
        }
    };


    const fetchInfoPayout = async () => {
        try {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
         
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/payouts/get?id=${id}&provider_id=${provider_id}`, {
                method: "GET"
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();
        if (data.success) {
          setPayout(data.withdrawal[0]);
        } else {
          alert("Erreur lors de la récupération de la transaction.");
        }
        } catch (err) {
        console.error("❌ Erreur fetchVersements:", err);
        } finally {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
        }
    };
    
    const [individuals, setIndividuals] = useState([]);
    const [loadingIndividuals, setLoadingIndividuals] = useState(true);

    const fetchIndividuals = async (slotId) => {
    try {
        setLoadingIndividuals(true);
        const provider_id = authState.user?.provider_id;
        const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservation_individual/slot/${slotId}/individuals?provider_id=${provider_id}`
        );
        const data = await res.json();
        if (data.success) {
        setIndividuals(data.individuals || []);
        console.warn(data.individuals);
        }
    } catch (e) {
        console.error("❌ fetchIndividuals:", e);
    } finally {
        setLoadingIndividuals(false);
    }
    };

    // Quand tu as reçu l'encaissement (earning)
    useEffect(() => {
    if (earning?.id) {
        fetchIndividuals(earning.id); // earning.id == slot_id
    }
    }, [earning?.id]);



    useEffect(() => {
        if (authState.user?.provider_id) {
            if(type === "earning"){
                fetchInfoEarning();
            }else if(type === "payout"){
                console.warn("C'est un PAYOUT !");
                fetchInfoPayout();
            }
        }
    },[ authState])

    useEffect(() => {
        console.warn(earning)
    }, [earning]) 

    useEffect(() => {
        console.warn(payout)
    }, [payout]) 

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };


    
    const statusLabelsEarning = {
        full: "Complet",
        available: "Places disponibles"
    };
    const statusLabelsPayout = {
        waiting: "En attente",
        sent: "Envoyé",
        failed: "Échoué"
    };


    // D/M/Y à hh:mm — Europe/Paris
    function formatReservationDate(isoString, tz = "Europe/Paris") {
    const d = new Date(isoString);
    if (Number.isNaN(d)) return "";

    const parts = new Intl.DateTimeFormat("fr-FR", {
        timeZone: tz,
        year: "numeric",
        month: "numeric",  // pas de zéro en tête
        day: "numeric",    // pas de zéro en tête
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(d).reduce((acc, p) => (acc[p.type] = p.value, acc), {});

    return `${parts.day}/${parts.month}/${parts.year} à ${parts.hour}:${parts.minute}`;
    }


    return (
        <div className="TransactionInfo">
            {/* <TestLoading setLoading={setLoading}/> */}
            <GoBack nagigation={"/my-earnings"} scrollTo={""} text={"retour"} /> 
            {
                !loading ?
            
            
                Object.keys(earning).length > 0 ?
                <>
            <p className="t4 bold">Encaissement</p>
            <div className="IconCarte">
                <img src={EuroNavBlue} alt="Icon carte"/>
            </div>
            <p className="t4">{earning.offer_slug}</p>
            <p className="t4">REF-{earning.id}</p>
            <div className="TopInfo">
                <p className="t6">Montant total encaissé</p>
                <p className="t1">{formatEuro(parseFloat(earning.net_amount_total))} €</p>
            </div>

            <div className="AllInfo">
                <div className="row">
                    <p className="t5 firstP">Encaissé le</p>
                    <div className="row RowInfo">
                        <p className="t5">{formatDate(earning.created_at)}</p>
                    </div>
                </div>                
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Titre</p>
                    <div className="row RowInfo">
                        <p className="t5 maxLine">{earning.offer_title}</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Durée</p>
                    <div className="row RowInfo">
                        <p className="t5">{earning.offer_duration}</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Adresse</p>
                    <div className="row RowInfo">
                        <p className="t5">{earning.offer_address}</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Participants</p>
                    <div className="row RowInfo">
                        <p className="t5">{earning.total_reserved}</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Statut</p>
                    <div className="row RowInfo">
                        <p className="t5">{statusLabelsEarning[earning.status] || earning.status}</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row" style={{paddingBottom: "4px"}}>
                    <p className="t5 firstP">Début</p>
                    <div className="row RowInfo">
                        <p className="t5">{formatDate(earning.date)} à {earning.start_hour}</p>
                    </div>
                </div>
                <div className="row" style={{paddingTop: "4px"}}>
                    <p className="t5 firstP">Fin</p>
                    <div className="row RowInfo">
                        <p className="t5">{formatDate(earning.date)} à {earning.end_hour}</p>
                    </div>
                </div>
            </div>
            <div className="ParticipantRes">
                <p className="t3">Participants</p>
                {
                    individuals.length>0 && individuals.map((individual, index) => {
                        return (
                            <div className="ParticipantItem">
                                <div className="row Separation">
                                    <p className="t5 bold">RES-{individual?.id}</p>

                                    <p className="t5 bold">EUR {individual?.gross_amount}</p>
                                </div>
                                {
                                    Number(individual?.nb_adult) > 0 && 
                                        <div className="row">
                                            <p className="t6 firstP">×{Number(individual?.nb_adult)} {t(plural(Number(individual?.nb_adult), 'adult', 'adults'))}</p>
                                            <p className="t6">EUR {(Number(individual?.nb_adult) * Number(individual?.unit_price_adult)).toFixed(2)}</p>
                                        </div>
                                }
                                {
                                    Number(individual?.nb_child) > 0 && 
                                        <div className="row">
                                            <p className="t6 firstP">×{Number(individual?.nb_child)} {t(plural(Number(individual?.nb_child), 'child', 'children'))}</p>
                                            <p className="t6">EUR {(Number(individual?.nb_child) * Number(individual?.unit_price_child)).toFixed(2)}</p>
                                        </div>
                                }
                                {
                                    Number(individual?.nb_infant) > 0 && 
                                        <div className="row">
                                            <p className="t6 firstP">×{Number(individual?.nb_infant)} {t(plural(Number(individual?.nb_infant), 'infant', 'infants'))}</p>
                                            <p className="t6">EUR {(Number(individual?.nb_infant) * Number(individual?.unit_price_infant)).toFixed(2)}</p>
                                        </div>
                                }
                                <div className="row InfoParticipantRes Separation">
                                    <p className="t5 bold">Réservé par</p>
                                    <p className="t5 bold">{individual?.name}</p>
                                </div>
                                <div className="row">
                                    <p className="t6">Email</p>
                                    <p className="t6">{individual?.email}</p>
                                </div>
                                <div className="row">
                                    <p className="t6">Phone</p>
                                    <p className="t6">{individual?.phone}</p>
                                </div>
                                <div className="row">
                                    <p className="t6"></p>
                                    <button className="seeRes" onClick={() => {navigate(`/reservations/${individual?.id}`)}}><p className="t6">see reservation</p></button>
                                </div>

                                {
                                    index != (individuals.length -1)
                                    ? <div className="hlinedashed"></div>
                                    : <div className="hline"></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="bottomInfo column">
                <div className="row">
                    <p className="t6 bold">Montant Total</p>
                    <p className="t6">EUR {formatEuro(parseFloat(earning.gross_amount_total))}</p>
                </div>
                <div className="row">
                    <p className="t6 bold">Commission hôtel</p>
                    <p className="t6">EUR {formatEuro(parseFloat(earning.hotel_commission_total))}</p>
                </div>
                <div className="row">
                    <p className="t6 bold">Commission Viarte</p>
                    <p className="t6">EUR {formatEuro(parseFloat(earning.platform_commission_total))}</p>
                </div>
                <div className="row">
                    <p className="t5 bold">Total</p>
                    <p className="t5 bold greenColor">EUR {formatEuro(parseFloat(earning.net_amount_total))}</p>
                </div>
            </div>
            </>
            :
            <>
            <p className="t4 bold">Retrait</p>
            <div className="IconCarte">
                <img src={EuroNavBlue} alt="Icon carte"/>
            </div>
            {/* <p className="t4">{payout.id}</p> */}
            <p className="t4">REF-{payout.id}</p>
            <div className="TopInfo">
                <p className="t6">Montant total du retrait</p>
                <p className="t1">{formatEuro(parseFloat(payout.amount))} €</p>
            </div>

            <div className="AllInfo">
                <div className="row">
                    <p className="t4 firstP">Émetteur</p>
                    <div className="row RowInfo">
                        <div className="IconWrapper">
                            <img src={BanckFin} alt="bank icon"/>
                        </div>
                        <p className="t6 bold">COMPTE Viarte</p>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t4 firstP">Bénéficiaire</p>
                    <div className="row RowInfo">
                        <div className="IconWrapper">
                            <img src={BanckFin} alt="bank icon"/>
                        </div>
                        <div className="column IbanSwift">
                            <p className="t6 bold">IBAN-{payout.iban}</p>
                            {
                                payout.swift && <p className="t6">SWIFT-{payout.swift}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Méthode</p>
                    <div className="row RowInfo">
                        <p className="t5">{payout.method}</p>
                    </div>
                </div> 
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Émis le</p>
                    <div className="row RowInfo">
                        <p className="t5">{formatDate(payout.created_at)}</p>
                    </div>
                </div> 
                <div className="hline"></div>
                <div className="row">
                    <p className="t5 firstP">Statut</p>
                    <div className="row RowInfo">
                        <p className="t5">{statusLabelsPayout[payout.status] || payout.status}</p>
                    </div>
                </div>
                <div className="hline"></div>
                {
                    !payout.send_at == null &&
                    <>
                    <div className="row">
                        <p className="t5 firstP">Envoyé le</p>
                        <div className="row RowInfo">
                            <p className="t5">{formatDate(payout.send_at)}</p>
                        </div>
                    </div> 
                    <div className="hline"></div>
                    </>
                }               
                <div className="row" style={{paddingBottom: "4px"}}>
                    <p className="t5 firstP">Nom</p>
                    <div className="row RowInfo">
                        <p className="t5 maxLine">{payout.last_name}</p>
                    </div>
                </div>
                <div className="row" style={{paddingTop: "4px"}}>
                    <p className="t5 firstP">Prénom</p>
                    <div className="row RowInfo">
                        <p className="t5">{payout.first_name}</p>
                    </div>
                </div>
                <div className="hline"></div>
                {
                    payout.paypal_email &&
                    <>
                    <div className="row">
                        <p className="t5 firstP">Email</p>
                        <div className="row RowInfo">
                            <p className="t5">{payout.paypal_email}</p>
                        </div>
                    </div>
                    <div className="hline"/>
                    </>
                }
                <div className="row">
                    <p className="t5 firstP">Détails</p>
                    <div className="row RowInfo">
                        <p className="t5">{payout.details}</p>
                    </div>
                </div>
            </div>
            <div className="bottomInfo column">
                <div className="row">
                    <p className="t5 bold">Versement de</p>
                    <p className="t5 bold">EUR {formatEuro(parseFloat(payout.amount))}</p>
                </div>
            </div>

            </>
            :
            <div className="Skeleton">
                <div className="TypeSkeleton shimmer"></div>
                <div className="CardIcon">
                    <img src={EuroNavBlue} alt="euro nav"/>
                </div>
                <div className="RefSkeleton shimmer"></div>
                <div className="RefSkeleton shimmer"></div>
                <div className="SoldeSkeleton">
                    <div className="shimmer"></div>
                    <div className="shimmer"></div>
                </div>
                <div className="AllInfo">
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "4rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn">
                            <div style={{width: "70%"}} className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "2rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn Big">
                            <div className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "2.4rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn">
                            <div style={{width: "40%"}} className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "2rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn Big">
                            <div className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "3.4rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn">
                            <div style={{width: "90%"}} className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "2.4rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn">
                            <div style={{width: "30%"}} className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "2rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn Big">
                            <div className="shimmer"></div>
                        </div> 
                    </div>
                    <div className="hline"></div>
                    <div className="row">
                        <div className="firsColumn">
                            <div style={{width: "3.4rem"}} className="shimmer"></div>
                        </div>
                        <div className="lastColumn">
                            <div style={{width: "80%"}} className="shimmer"></div>
                        </div> 
                    </div>
                </div>

                <div className="InfoEuroSkeleton">
                    <div className="row">
                        <div style={{width: "4rem"}} className="shimmer"></div>
                        <div style={{width: "3.5rem"}} className="shimmer"></div>
                    </div>
                    <div className="row">
                        <div style={{width: "5rem"}} className="shimmer"></div>
                        <div style={{width: "2.7rem"}} className="shimmer"></div>
                    </div>
                    <div className="row">
                        <div style={{width: "5.5rem"}} className="shimmer"></div>
                        <div style={{width: "3rem"}} className="shimmer"></div>
                    </div>
                    <div className="row">
                        <div style={{width: "2rem"}} className="shimmer"></div>
                        <div style={{width: "4rem"}} className="shimmer"></div>
                    </div>
                </div>
            </div>    
            }  




            <div className="EndContainer">
                <div className="row learnMoreContainer">
                    <p className="t6">Vos transactions en toute sérénité.</p>
                    <button className="row learnMore" onClick={() => {
                        navigate("/payment-policy")
                    }}>
                        <p className="t6 bold">En savoir plus</p>
                        <img src={ArrowLearnMore} alt="Arrow learn more"/>
                    </button>
                </div>
                <div className="row secured">
                    <img className="" src={privacy} alt="privacy"/>
                    <p className="t6">Sécurisé par <strong>Viarte</strong></p>
                </div>
            </div>      
        </div>
    )
}