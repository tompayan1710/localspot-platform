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
import EditVersement from "../../../components/PopUpBottom/EditVersement/EditVersement";
import VersementList from "../../../components/PopUpBottom/EditVersement/VersementList/VersementList";
import { useTranslation } from "react-i18next";


export default function PayoutRequest(){
    const {t} = useTranslation();
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


    const [loadingRequest, setLoadingRequest] = useState(false);  

    const [errorMessage, setErrorMessage] = useState("");  


    const numberPickerRef = useRef(null);
    const editPopUp = useRef(null);
    const deletePopUp = useRef(null);

    const [isOccultView, setIsOccultView] = useState(false);

    const maxAmount = 3000.00;
    const minAmount = 1.00;


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



    useEffect(() => {
        getTransactionHistory();
    }, [authState]);
    
    
    useEffect(() => {
        console.log(versements);
    }, [versements]);


    useEffect(() => {
      if (isOccultView) {
        document.body.style.overflow = "hidden";   // bloque le scroll du body
      } else {
        document.body.style.overflow = "";         // réactive le scroll
      }
    }, [isOccultView]);


    const submitRequestWithdrawals = async () => {
        setLoadingRequest(true)
        try {
            // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
            const body = {
                provider_id: authState.user?.provider_id,
                amount,
                method: "IBAN",
                details: "Demande de versement par IBAN ",
                iban: versements[selectedVersement].iban,
                swift: versements[selectedVersement].swift,
                first_name: versements[selectedVersement].first_name,
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
                    navigate("/my-earnings");
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
            <GoBack nagigation={"/my-earnings"} text={t("return")}/>

            <p className="t32">{t("Withdraw_my_earnings")}</p>
            <div className="MySolde column">
                <div className="SoldePricipal">
                    <p className="t6">{t("My_balance")}</p>
                    <p className="t2">{formatEuro(solde)}€</p>
                </div>
                <div className="SoldInfo row">
                    <div className="column center">
                        <p className="t5 bold">{t("Pending")}</p>
                        <p className="t5">{formatEuro(waiting)}€</p>
                    </div>
                    <div className="vline"></div>
                    <div className="column center">
                        <p className="t5 bold">{t("Already_withdrawn")}</p>
                        <p className="t5">{formatEuro(alreadyPaid)}€</p>
                    </div>
                </div>
            </div>

            <div className={`bodyPayoutRequest column ${isOccultView ? "noScroll" : ""}`}>
                <div className="VersementMethode">
                    <p className="t5">{t("Payout_method")}</p>
                    <VersementList setIsOccultView={setIsOccultView} editPopUp={editPopUp} deletePopUp={deletePopUp} selectedVersement={selectedVersement} setselectedVersement={setselectedVersement} versements={versements} setVersements={setVersements} selectionnable={true} origin={"/payout-request"}/>
                
                    {/* <button onClick={() => {
                        setLoading((prev) => !prev)
                    }}>
                        <p className="t4">HANGLE</p>
                    </button> */}

                </div>

                <div className="SelectingAmount">
                    <p className="t5">{t("Amount")}</p>
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
                                setAmount(300.00)
                                setselectedAmout(1)
                                }}>
                            <p className="t5">300€</p>
                        </button>
                        <button className={`MontantItem ${selectedAmount === 2 ? "selected" : ""}`}
                            onClick={() => {
                                // setAmount(solde)
                                setAmount(1000.000)
                                setselectedAmout(2)
                                }}>
                            {/* <p className="t5">Tout&nbsp;retirer</p> */}
                            <p className="t5">1000€</p>
                        </button>
                        <button
                            className={`MontantItem ${selectedAmount === 3 ? "selected" : ""}`}
                            onClick={() => {
                                setselectedAmout(3);
                                openNumberPicker();
                            }}
                            >
                            <p className="t5">{t("Custom_amount")}</p>
                        </button>
                    </div>
                </div>

                <p className={`t6 InfoMessage ${errorMessage ? "redColor" : ""}`}>
                    {t("Security_limit", { max: maxAmount })}
                </p>
            
            </div>

            <div className="SendingNav">
                <div className="row">
                    <p className="t4">{t("Total")}</p>
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
                        <p className="t5" style={{opacity: `${loadingRequest ? "0" : "1"}`}}>{t("Send")}</p>
                        <img src={ArrowRightRetired} alt="arrow right" style={{opacity: `${loadingRequest ? "0" : "1"}`}}/>
                    </button>

            </div>

            <PopUpNumber 
                ref={numberPickerRef} 
                title={t("Custom_amount")}
                // smalltext={`Montant maximum disponible : ${formatEuro(solde)} €`}
                // max={solde}
                smalltext={`${t("Available_max", {max: maxAmount.toFixed(2).replace('.', ',')})}`}
                min={minAmount}
                errorMin={`${t("Error_min", {min: minAmount.toFixed(2).replace('.', ',')})}`}
                max={maxAmount}
                errorMax={`${t("Error_max", {max: maxAmount.toFixed(2).replace('.', ',')})}`}
                onClose={closeNumberPicker} 
                setReturnValue={setAmount}
            />

            <div className={`occultView ${isOccultView ? "open" : ""}`}  
            onClick={(e) => {
                closeNumberPicker();
                setIsOccultView(false);

                // Fermer les deux si elles sont ouvertes
                if (editPopUp.current) editPopUp.current.classList.remove("open");
                if (deletePopUp.current) deletePopUp.current.classList.remove("open");
            }}></div>
        </div>
    )
}