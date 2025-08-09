import "./VersementList.css"

import editPenIcon from "../../../../assets/images/editPenIcon.png"
import ArrowTopRight from "../../../../assets/images/ArrowTopRightFin.png"
import ValidateProgress from "../../../../assets/images/ValidateProgress.png"
import warningRed from "../../../../assets/images/warningRed.png"
import bankicon from "../../../../assets/images/bankicon.png"

import { useNavigate } from "react-router-dom"
import FadeInImage from "../../../Utils/FadeInImage"
import { useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../../../Auth/authContext/authContext"
import EditVersement from "../EditVersement"
import PopUpBottom from "../../PopUpBottom"
import CancelConfirmButton from "../../CancelConfirmButton/CancelConfirmButton"
import PopUpConfirmDelete from "../../PopUpConfirmDelete/PopUpConfirmDelete"
import TestLoading from "../../../Utils/TestLoading"

export default function VersementList({setIsOccultView, editPopUp, deletePopUp, selectedVersement, setselectedVersement, versements, setVersements, selectionnable=true, origin}) {
    const navigate = useNavigate();

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

    const [errorMessage, setErrorMessage] = useState("");  


    const numberPickerRef = useRef(null);


    useEffect(() => {
        if (authState.user?.provider_id) {
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

    const handleUpdateVersement = async () => {
        setLoadingModifie(true);
        const provider_id = authState.user?.provider_id;
        const current = versements[selectedModifie];
        if (!provider_id || !current) return;

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

        const provider_id = authState.user?.provider_id;
        const iban = versements[selectedModifie]?.iban;

        if (!provider_id || !iban) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/delete-versement`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider_id, iban }),
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
                                      <p className="t6">Modifier</p>
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
                                        deletePopUp.current.classList.add("open");
                                        setIsOccultView(true);
                                    }}>
                                        <p className="t6 redColor">supprimer</p>
                                    </button>
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
            <button className="AddVersementMethode row" onClick={() => {
                navigate("/versement/new/titulaire", {
                  state: {
                    origin: origin
                  }
                })
              }}>
                <img src={ArrowTopRight} alt="Arrow top right icon"/>
                <p className="t6">Ajouter un mode de versement</p>
            </button>

            {/* <button onClick={() => {
                setLoadingModifie((prev) => !prev);
            }}>
                <p className="t4 fixedTop">handle</p>
            </button> */}

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
            <PopUpConfirmDelete ref={deletePopUp} deleteVersement={deleteVersement} setIsOccultView={setIsOccultView} loading={loadingDelete}/>
        </>
    )
}