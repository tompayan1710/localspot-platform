import "./PayoutRequest.css"
import GoBack from "../../../components/GoBack/GoBack"
import { useContext, useEffect, useRef, useState } from "react";

import warningRed from "../../../assets/images/warningRed.png"
import ArrowRightRetired from "../../../assets/images/ArrowRightRetired.png"
import ValidateProgress from "../../../assets/images/ValidateProgress.png"
import plus from "../../../assets/images/plus.png"
import bankicon from "../../../assets/images/bankicon.png"
import editPenIcon from "../../../assets/images/editPenIcon.png"
import PopUpNumber from "../../../components/PopUpBottom/PopUpNumber/PopUpNumber";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import PopUpBottom from "../../../components/PopUpBottom/PopUpBottom";
import CancelConfirmButton from "../../../components/PopUpBottom/CancelConfirmButton/CancelConfirmButton";
import FadeInImage from "../../../components/Utils/FadeInImage";
import Spinner from "../../../components/Spinner/Spinner";


export default function PayoutRequest(){
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [versements, setVersements] = useState([]);
    const [loading, setLoading] = useState(true);
 
    const [amount, setAmount] = useState(100);
    const [selectedAmount, setselectedAmout] = useState(0);
    const [selectedVersement, setselectedVersement] = useState(0);

    const [ transactions, setTransactions ] = useState([]);
    const [total_revenue, setTotalRevenue] = useState(0);
    const [solde, setSolde] = useState(0);
    const [alreadyPaid, setAlreadyPaid] = useState(0);
    const [waiting, setWaiting] = useState(0);

    const [selectedModifie, setSelectedModifie] = useState(0);
    const [modifiename, setModifieName] = useState("");  
    const [modifielastname, setModifieLastName] = useState("");  
    const [modifieIban, setModifieIban] = useState("");  
    const [modifieSwift, setModifieSwift] = useState("");  
    const [loadingModifie, setLoadingModifie] = useState(false);  
    const [loadingRequest, setLoadingRequest] = useState(false);  

    const numberPickerRef = useRef(null);
    const editPopUp = useRef(null);
    
    const [isOccultView, setIsOccultView] = useState(false);

    useEffect(() => {
      if (isOccultView) {
        document.body.style.overflow = "hidden";   // bloque le scroll du body
      } else {
        document.body.style.overflow = "";         // réactive le scroll
      }
    }, [isOccultView]);

    function formatEuro(montant) {
        return montant
            .toFixed(2) // garde 2 décimales
            .replace('.', ',') // remplace le point par une virgule
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // ajoute espace tous les 3 chiffres
    }

    const getTransactionHistory = async () => {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
        
        console.log("Récupération de l'historique du provider : ", authState.user?.provider_id);

        try {
            // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/transactions/getall-by-provider?provider_id=${authState.user?.provider_id}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTransactions(data.history || []); // ✅ on met uniquement le tableau
                setTotalRevenue(data.total_revenue || 0);
                setSolde(data.solde || 0);
                setWaiting(data.waiting || 0)
                setAlreadyPaid(data.already_paid || 0)
                return data;
            } else {
                console.error("❌ Échec Récupération des earnings et des payouts du provider");
                return { success: false };

            }
        } catch (error) {
            console.error("❌ Erreur Récupération des earnings et des payouts du provider : ", error);
            return { success: false };
        }
    };

  

    const openNumberPicker = () => {
    numberPickerRef.current?.classList.add("open");
        setIsOccultView(true);
    };

    const closeNumberPicker = () => {
    numberPickerRef.current?.classList.remove("open");
        setIsOccultView(false);
    };


    const fetchVersements = async () => {
        try {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
         
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/payouts/getall-withdrawal_methods?provider_id=${provider_id}`, {
                method: "GET"
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();

        if (data.success) {
            setVersements(data.versements);
        } else {
            alert("Erreur lors de la récupération des méthodes.");
        }
        } catch (err) {
        console.error("❌ Erreur fetchVersements:", err);
        } finally {
        setTimeout(() => {
            setLoading(false);
        }, 500)
        }
    };

    useEffect(() => {
        fetchVersements();
        getTransactionHistory();
    }, [authState]);
    
    
    useEffect(() => {
        console.log(versements);
    }, [versements]);



    const handleUpdateVersement = async () => {
        setLoadingModifie(true);
        const provider_id = authState.user?.provider_id;
        const current = versements[selectedModifie];
        if (!provider_id || !current) return;

        const updates = {};

        if (modifielastname && modifielastname !== current.last_name)
            updates.last_name = modifielastname;

        if (modifiename && modifiename !== current.name)
            updates.name = modifiename;

        if (modifieIban && modifieIban !== current.iban)
            updates.iban = modifieIban;

        if (modifieSwift && modifieSwift !== current.swift)
            updates.swift = modifieSwift;

        if (Object.keys(updates).length === 0) {
            alert("Aucune modification détectée.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/update-versement`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                provider_id,
                old_iban: current.iban,
                updates
            })
            });

            const data = await response.json();

            if (data.success) { // refresh
            setTimeout(() => {
                setLoadingModifie(false);
                editPopUp.current.classList.remove("open");
                setIsOccultView(false);

                setTimeout(() => {
                    setModifieIban("");
                    setModifieSwift("");
                    setModifieLastName("");
                    setModifieName("");
                    fetchVersements();
                }, 1000)
            }, 500)
            } else {
            alert(data.error || "Erreur inconnue");
            }

        } catch (err) {
            console.error("❌ Erreur lors de la requête PATCH :", err);
            alert("Erreur serveur");
        }
    };


    const submitRequestWithdrawals = async () => {
        setLoadingRequest(true)
        try {
            // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
            const body = {
                provider_id: authState.user?.provider_id,
                amount,
                method: "iban",
                details: "Demande de versement par IBAN ",
                iban: versements[selectedVersement].iban,
                swift: versements[selectedVersement].swift,
                name: versements[selectedVersement].name,
                last_name: versements[selectedVersement].last_name
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/request`, {
                method: "POST",
                 headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("DEMANDE ENREGISTRE !");
                setTimeout(()=> {
                    navigate("/");
                }, 1500)
                return data;
            } else {
                console.error("❌ Échec Récupération des earnings et des payouts du provider");
                return { success: false };

            }
        } catch (error) {
            console.error("❌ Erreur Récupération des earnings et des payouts du provider : ", error);
            return { success: false };
        }

    }

    return (
        <div className={`PayoutRequest ${isOccultView ? "noScroll" : ""}`}>
            <GoBack nagigation={"/my-earnings"} text={"revenir"}/>

            <p className="t32">Retirer mes gains</p>
            <div className="MySolde column">
                <div className="SoldePricipal">
                    <p className="t6">Mon solde</p>
                    <p className="t2">{formatEuro(solde)}€</p>
                </div>
                <div className="SoldInfo row">
                    <div className="column center">
                        <p className="t5 bold">En attente</p>
                        <p className="t5">{formatEuro(waiting)}€</p>
                    </div>
                    <div className="vline"></div>
                    <div className="column center">
                        <p className="t5 bold">Déjà retiré</p>
                        <p className="t5">{formatEuro(alreadyPaid)}€</p>
                    </div>
                </div>
            </div>

            <div className={`bodyPayoutRequest column ${isOccultView ? "noScroll" : ""}`}>
                <div className="VersementMethode">
                    <p className="t5">Mode de versement</p>
                    <div className="VersementList column">
                        {   loading ?
                            <>
                            <div className="SkeletonVersement row">
                                <div className="row">
                                    <div className="BankSkeleton"></div>
                                    <div className="column">
                                        <div className="IBANSkeleton"></div>
                                        <div className="TitulaireSkeleton"></div>
                                        <div className="ModifieSkeleton"></div>
                                    </div>
                                </div>
                                <div className="selectedShow"></div>
                            </div>
                            </>
                            :
                            (
                                versements.length ? versements.map((versement, index) => {
                                    return(
                                        <div className={`VersementItem row ${selectedVersement === index ? "selected" : ""}`} key={index} onClick={() => setselectedVersement(index)}>
                                            <div className="row">
                                                <div className="BankWrapper">
                                                    <FadeInImage className="BankIcon" src={bankicon} alt="bank icon"/>
                                                </div>
                                                <div className="column">
                                                    <div className="ibanNumber row">
                                                        {
                                                            Array.from({length: versement.iban.length-4}).map((_, i) => {
                                                                return (
                                                                    <div key={i} className="point"></div>
                                                                )
                                                            })
                                                        }
                                                        <p className="t6">{versement.iban.slice(-4)}</p>
                                                    </div>
                                                    <p className="t6 Name">{versement.last_name} {versement.name}</p>
                                                    <button className="EditButton row" onClick={() => {
                                                        editPopUp.current.classList.add("open")
                                                        setSelectedModifie(index);
                                                        setIsOccultView(true);
                                                    }}>
                                                        <FadeInImage src={editPenIcon} alt="edit pen icon"/>
                                                        <p className="t6">Modifier</p>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="selectedShow">
                                                <img src={ValidateProgress} alt={"validate icon"}/>
                                            </div>
                                        </div>
                                    )
                                }) 
                                : 
                                <div className="NoVersementMethode">
                                    <img src={warningRed} alt="warning red icon"/>
                                    <div className="column">
                                        <p className="t5 bold">Ajouter un mode de versement</p>
                                        <p className="t6">Ajouter mode de versement vous permet de recevoir vos gains.</p>
                                        {/* <button>
                                            <p className="t6">Configurer les versements</p>
                                        </button> */}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* <button onClick={() => {
                        setLoading((prev) => !prev)
                    }}>
                        <p className="t4">HANGLE</p>
                    </button> */}
                    <div className="AddVersementMethode row" onClick={() => {
                        navigate("/versement/new/titulaire", {
                            state: {
                                origin: "/payout-request"
                            }
                        })
                    }}>
                        <img src={plus} alt="plus icon"/>
                        <p className="t6">Ajouter un mode de versement</p>
                    </div>

                </div>

                <div className="SelectingAmount">
                    <p className="t5">Montant</p>
                    <div className="row">
                        <button className={`MontantItem ${selectedAmount === 0 ? "selected" : ""}`}
                            onClick={() => {
                                setAmount(100.00)
                                setselectedAmout(0)
                                }}>
                            <p className="t5">100€</p>
                        </button>
                        <button className={`MontantItem ${selectedAmount === 1 ? "selected" : ""}`}
                            onClick={() => {
                                setAmount(500.00)
                                setselectedAmout(1)
                                }}>
                            <p className="t5">500€</p>
                        </button>
                        <button className={`MontantItem ${selectedAmount === 2 ? "selected" : ""}`}
                            onClick={() => {
                                setAmount(solde)
                                setselectedAmout(2)
                                }}>
                            <p className="t5">Tout&nbsp;retirer</p>
                        </button>
                        <button
                            className={`MontantItem ${selectedAmount === 3 ? "selected" : ""}`}
                            onClick={() => {
                                setselectedAmout(3);
                                openNumberPicker();
                            }}
                            >
                            <p className="t5">Personnalisé</p>
                        </button>
                    </div>
                </div>

                {/* <div className="hlinedashed"></div> */}

                {/* <div className="RecapInfo column">
                    <div className="row">
                        <p className="t5">Expéditeur</p>
                        <p className="t5">Compte Viarte</p>
                    </div>
                    <div className="row">
                        <p className="t5">Destinataire</p>
                        <p className="t5">**** 3424</p>
                    </div>
                    <div className="row">
                        <p className="t5">Référence</p>
                        <p className="t5">Virement des revenus prestataire - Juillet 2025</p>
                    </div>
                    <div className="row">
                        <p className="t5">Délais estimés</p>
                        <p className="t5">1 à 2 jours ouvrés</p>
                    </div>
                </div> */}
                <p className="t6 InfoMessage">
                    Le virement sera effectué dans un délai de 1 à 3 jours ouvrés.
                </p>
            </div>

            <div className="SendingNav">
                <div className="row">
                    <p className="t4">Total</p>
                    <p className="t2">{amount ? `${parseFloat(amount).toFixed(2).replace('.', ',')} €` : '0,00 €'}</p>
                </div>

                <button
                    className="SendingButton row"
                    // onClick={handleSubmit}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > solde || !versements[selectedVersement]}
                    onClick={submitRequestWithdrawals}
                    >
                        {
                            loadingRequest && <Spinner replaceText={true}/>
                        }
                        <p className="t5" style={{opacity: `${loadingRequest ? "0" : "1"}`}}>Envoyer</p>
                        <img src={ArrowRightRetired} alt="arrow right" style={{opacity: `${loadingRequest ? "0" : "1"}`}}/>
                    </button>

            </div>

            <PopUpNumber 
                ref={numberPickerRef} 
                title={"Montant personnalisé"}
                smalltext={`Montant maximum disponible : ${formatEuro(solde)} €`}
                max={solde}
                onClose={closeNumberPicker} 
                setReturnValue={setAmount}
            />


            <PopUpBottom 
                onClose={() => {
                    editPopUp.current.classList.remove("open");
                    setIsOccultView(false);
                }}
                isHeader={true}
                ref={editPopUp}
            >
                <>
                <div className="ModifieVersement">
                    {/* <p className="t5">{versements[selectedModifie]?.iban}</p>
                    <p className="t5">{versements[selectedModifie]?.last_name}</p> */}
                    <p className="t4 bold">Titulaire du compte</p>
                    <div className="row">
                        <input
                        name="last_name"
                        className="InputText"
                        placeholder={`${versements[selectedModifie]?.name || "Nom"}`}
                        value={modifiename}
                        onChange={(e) => setModifieName(e.target.value.toUpperCase())}
                        />

                        <input
                        name="name"
                        className="InputText"
                        placeholder={`${versements[selectedModifie]?.last_name || "Prénom"}`}
                        value={modifielastname}
                        onChange={(e) => setModifieLastName(e.target.value)}
                        />
                    </div>
                    {/* <div className="hline"></div> */}
                    <p className="t4 bold">IBAN</p>
                    <input
                        name="Iban"
                        className="InputText IBAN-input"
                        placeholder={`${versements[selectedModifie]?.iban || "Numéro IBAN"}`}
                        value={modifieIban}
                        onChange={(e) => {
                            const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                            setModifieIban(cleaned);
                        }}
                    />

                    <p className="t4 bold">Code SWIFT/BIC</p>
                    <p className="t6" style={{paddingTop: "2px"}}>Facultatif pour les comptes européens (SEPA)</p>
                    <input
                        name="Swift"
                        className="InputText"
                        placeholder={`${versements[selectedModifie]?.swift || "Code SWIFT/BIC"}`}
                        value={modifieSwift}
                        onChange={(e) => {
                            const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                            setModifieSwift(cleaned);
                        }}
                    />
                    <p className="t6">
                        Assurez-vous que les informations saisies sont exactes avant de valider.
                    </p>

                </div>
                <CancelConfirmButton cancelText={"Annuler"} laoding={loadingModifie} confirmText={"Modifer"} onCancel={() => {
                    editPopUp.current.classList.remove("open");
                }} onConfirm={handleUpdateVersement}/>
                </>
          </PopUpBottom>
            

            <div className={`occultView ${isOccultView ? "open" : ""}`}  
            onClick={(e) => {
                closeNumberPicker();
                editPopUp.current.classList.remove("open");
            }}></div>
        </div>
    )
}