import "./VersementList.css"

import editPenIcon from "../../../../assets/images/editPenIcon.png"
import ArrowTopRight from "../../../../assets/images/ArrowTopRightFin.png"
import ValidateProgress from "../../../../assets/images/ValidateProgress.png"
import warningRed from "../../../../assets/images/warningRed.png"
import bankicon from "../../../../assets/images/bankicon.png"

import { useNavigate } from "react-router-dom"
import FadeInImage from "../../../Utils/FadeInImage"
import { act, useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../../../Auth/authContext/authContext"
import EditVersement from "../EditVersement"
import PopUpBottom from "../../PopUpBottom"
import CancelConfirmButton from "../../CancelConfirmButton/CancelConfirmButton"
import PopUpConfirmDelete from "../../PopUpConfirmDelete/PopUpConfirmDelete"
import TestLoading from "../../../Utils/TestLoading"
import { useTranslation } from "react-i18next"

export default function VersementList({setIsOccultView, editPopUp, deletePopUp, selectedVersement, setselectedVersement, versements, setVersements, selectionnable=true, origin}) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const { authState } = useContext(AuthContext);

    const [loading, setLoading ] = useState(true);
    const [loadingDelete, setLoadingDelete ] = useState(false);


    const [amount, setAmount] = useState(100);
    const [selectedAmount, setselectedAmout] = useState(0);

    const [ transactions, setTransactions ] = useState([]);
    const [total_revenue, setTotalRevenue] = useState(0);
    const [solde, setSolde] = useState(0);
    const [alreadyPaid, setAlreadyPaid] = useState(0);
    const [waiting, setWaiting] = useState(0);

    const [selectedModifie, setSelectedModifie] = useState(0);
    const [modifiefirstname, setModifieFirstName] = useState("");  
    const [modifielastname, setModifieLastName] = useState("");  
    const [modifieIban, setModifieIban] = useState("");  
    const [modifieSwift, setModifieSwift] = useState("");  
    const [loadingModifie, setLoadingModifie] = useState(false);  
    const [loadingRequest, setLoadingRequest] = useState(false);  
    const [selectedDelete, setSelectedDelete] = useState(0);  

    const [errorMessage, setErrorMessage] = useState("");  


    const numberPickerRef = useRef(null);


    useEffect(() => {
        if (authState.user?.provider_id || authState.user?.hote_id) {
          fetchVersements();

          setTimeout(() => {
              setLoading(false);
          }, 500)
        }
    },[ authState])

  // useEffect(() => {
  //   fetchVersements();
  //   getTransactionHistory();
  // }, [authState]);

  function getActorId(authState) {
    if (authState.user?.provider_id) {
      return { key: "provider_id", value: authState.user.provider_id };
    }
    if (authState.user?.hote_id) {
      return { key: "hote_id", value: authState.user.hote_id };
    }
    return null;
  }

    const handleUpdateVersement = async () => {
        setLoadingModifie(true);
        const actor = getActorId(authState);
        const current = versements[selectedModifie];
        if (!actor || !current) return;

        const updates = {};

        if (modifielastname && modifielastname !== current.last_name)
            updates.last_name = modifielastname;

        if (modifiefirstname && modifiefirstname !== current.first_name)
            updates.first_name = modifiefirstname;

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
              [actor.key]: actor.value,
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
                  setModifieFirstName("");
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

    const deleteVersement = async () => {
        setLoadingDelete(true);
 
        const actor = getActorId(authState);
        const iban = versements[selectedDelete]?.iban;

        if (!actor || !iban) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/delete-versement`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [actor.key]: actor.value, iban }),
            });

            const data = await response.json();

            if (data.success) {
                setTimeout(() => {

                }, 400)
                await fetchVersements(); // met à jour la liste
            } else {
            alert(data.error || "Erreur inconnue");
            }
        } catch (err) {
            console.error("❌ Erreur suppression :", err);
            alert("Erreur serveur");
        } finally {
            setTimeout(() => {
                deletePopUp.current.classList.remove("open");
                setIsOccultView(false);
                setLoadingDelete(false);
            }, 1000)
        }
    };

  

    const fetchVersements = async () => {
        try {
        const actor = getActorId(authState);
         
        if(!actor){
            return
        }
         
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/payouts/getall-withdrawal_methods?${actor.key}=${actor.value}`, {
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

    // useEffect(() => {
    //     console.error(versements);
    // }, [versements])

    return (
        <>
            <div className="VersementList column">
                {   loading ?
                    <>
                        <div className="SkeletonVersement row">
                            <div className="row">
                              <div className="BankSkeleton shimmer"></div>
                              <div className="column">
                                <div className="IBANSkeleton shimmer"></div>
                                <div className="TitulaireSkeleton shimmer"></div>
                                <div className="ModifieSkeleton shimmer"></div>
                              </div>
                            </div>
                            {
                                selectionnable && <div className="selectedShow"></div>
                            }
                          </div>
                        </>
                        :
                        (
                          versements.length > 0 ? versements.map((versement, index) => {
                            return(
                              <div  className={`VersementItem row ${selectionnable && selectedVersement === index ? "selected" : ""}`} 
                                    key={index} 
                                    onClick={() => {
                                        if(selectionnable){
                                            setselectedVersement(index);
                                        }
                                    }}
                                >
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
                                    <p className="t6 Name">{versement.last_name} {versement.first_name}</p>
                                    <button className="EditButton row" onClick={() => {
                                      editPopUp.current.classList.add("open")
                                      setSelectedModifie(index);
                                      setIsOccultView(true);
                                    }}>
                                      <FadeInImage src={editPenIcon} alt="edit pen icon"/>
                                      <p className="t6">{t("Edit")}</p>
                                    </button>
                                  </div>
                                </div>
                                <div className="RightColumn">
                                    {
                                        selectionnable &&
                                        <div className="selectedShow">
                                            <img src={ValidateProgress} alt={"validate icon"}/>
                                        </div>
                                    } 
                                    <button className="DeleteVersement" onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDelete(index);
                                        deletePopUp.current.classList.add("open");
                                        setIsOccultView(true);
                                    }}>
                                        <p className="t6 redColor">{t("delete")}</p>
                                    </button>
                                </div>
                            
                              </div>
                            )
                          }) 
                          : 
                          <div className="NoVersementMethode">
                            <img src={warningRed} alt="warning red icon"/>
                            <div className="column">
                              <p className="t5 bold">{t("Add_a_payout_method")}</p>
                          <p className="t6">{t("Add_a_payout_method_description")}</p>
                        {/* <button>
                          <p className="t6">Configurer les versements</p>
                        </button> */}
                      </div>
                    </div>
                  )
                }
            </div>
            <button className="AddVersementMethode row" onClick={() => {
                navigate("/versement/new/titulaire", {
                  state: {
                    origin: origin
                  }
                })
              }}>
                <img src={ArrowTopRight} alt="Arrow top right icon"/>
                <p className="t6">{t("Add_a_payout_method")}</p>
            </button>

            <EditVersement
                editPopUp={editPopUp} // ✅ passe-le ici
                versements={versements}
                selectedModifie={selectedModifie}
                modifiefirstname={modifiefirstname}
                setModifieFirstName={setModifieFirstName}
                modifielastname={modifielastname}
                setModifieLastName={setModifieLastName}
                modifieIban={modifieIban}
                setModifieIban={setModifieIban}
                modifieSwift={modifieSwift}
                setModifieSwift={setModifieSwift}
                loadingModifie={loadingModifie}
                handleUpdateVersement={handleUpdateVersement}
                setIsOccultView={setIsOccultView}
            />
            
            {/* <TestLoading setLoading={setLoadingDelete}/> */}
            <PopUpConfirmDelete ref={deletePopUp} deletefunction={deleteVersement} setIsOccultView={setIsOccultView} loading={loadingDelete}/>
        </>
    )
}