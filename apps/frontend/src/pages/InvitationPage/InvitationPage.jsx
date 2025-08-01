import { useNavigate, useParams } from "react-router-dom"
import FadeInImage from "../../components/Utils/FadeInImage"
import "./InvitationPage.css"

import BottomBar from "../../components/BottomBar/BottomBar"

import templateOffer from "../../assets/images/templateOffer.png"
import LockGreen from "../../assets/images/LockGreen.png"
import editPenIcon from "../../assets/images/editPenIcon.png"
import { useContext, useEffect, useRef, useState } from "react"
import PopUpLogin from "../../components/Auth/PopUpLogin/PopUpLogin"
import PopUpInvitation from "./Auth/PopUpInvitation"
import { getOffersProvider } from "../../services/offers"
// import { getProviderIdByToken, linkUserToProvider } from "../../services/provider"
import { getInvitationByToken } from "../../services/invitation"
import { AuthContext } from "../../components/Auth/authContext/authContext"

import ProtectedIllustration from "../../assets/images/ProtectedIllustration.png"

export default function InvitationPage(){
    const navigate = useNavigate();
    const { checkAuth } = useContext(AuthContext);

    const queryParams = new URLSearchParams(window.location.search);
    const token_invitation = queryParams.get("token_invitation");


    const [ isOccultView, setIsOccultView ] = useState(false);
    const [ isValidInvitationToken, setIsValidInvitationToken ] = useState(true);
    const PopUpLoginRef = useRef(null);
    const PopUpConfirmRef = useRef(null);

    const [ offerProvider, setOfferProvider ] = useState({})

    useEffect(() => {


        const fetchData = async (token_invitation) => {
            try {
                const InvitationResponse =  await getInvitationByToken(token_invitation);
                if (!InvitationResponse.success || !InvitationResponse.invitation) {
                console.error("❌ Provider introuvable ou erreur");
                setIsValidInvitationToken(false);
                return;
                }

                const invitation = InvitationResponse.invitation;
                const offerResponse = await getOffersProvider(invitation.provider_id);
                if (!offerResponse.success) {
                console.error("❌ Erreur lors de la récupération des offres");
                return;
                }
                setIsValidInvitationToken(true);
                setOfferProvider(offerResponse.offers[0]);
            } catch (error) {
                console.error("❌ Erreur générale dans fetchData :", error);
            }
        };


        if (token_invitation) fetchData(token_invitation);
    }, []);



//  "7a692e3a-ff1e-49e3-aefa-23da87d6d3ff"
    // useEffect(() => {
    //     console.error(offerProvider);
    // }, [offerProvider])


    return (
        <div className="InvitationPage">
            {
                isValidInvitationToken ?
                <>
                <p className="t3">Bienvenue sur<br></br><strong>Viarte</strong></p>
            <div className="ProviderOffer">
                <button className="EditButton" onClick={() =>{
                    console.log("Cliqué")
                    PopUpLoginRef.current.classList.add("open")
                    setIsOccultView(true);
                }}>
                    <img src={editPenIcon} alt="edit pen icon"/>
                </button>
                <div className="BecomProviderBig">
                    <p className="t6">votre annonce</p>
                        <div className="BecomProviderContainer">
                        <div className="ImageWrapper">
                            <img src={templateOffer} alt="template" />
                            {offerProvider?.image_urls?.[0] && (
                            <FadeInImage src={offerProvider.image_urls[0]} alt="image 1" />
                            )}
                        </div>
                        <div className="ImageWrapper">
                            <img src={templateOffer} alt="template" />
                            {offerProvider?.image_urls?.[1] && (
                            <FadeInImage src={offerProvider.image_urls[1]} alt="image 2" />
                            )}
                        </div>
                        </div>

                    <p className="t4 maxLine maxLine1">{offerProvider?.title}</p>
                    <p className="t6 maxLine">{offerProvider?.description}</p>

                </div>
            </div>
            <div className="Important column">
                <p className="t6">
                    Votre espace prestataire a déjà été créé par notre équipe mais n'est lié à aucun compte.<br></br>
                </p>
                <p className="t6">
                    Votre annonce n’est pour le moment pas publiée. Connectez-vous et ajoutez des créneaux pour l'activer.
                </p>
            </div>
            {/* <div className="infoText">
                <p className="t5 bold">
                    Votre compte a déjà été créé par notre équipe.<br></br>
                </p>
                <p className="t6">
                    Il vous suffit de vous connecter pour prendre le contrôle de votre espace.<br></br>
                </p>
            </div> */}

            <div className="row Protected">
                <img src={LockGreen} alt="lock icon"/>
                <p className="t6">Ce lien est sécurisé, valable une seule fois, et peut expirer après un certain délai pour des raisons de sécurité.</p>
            </div>
            <BottomBar text={"Se connecter"} onClick={() =>{
                console.log("Cliqué")
                PopUpLoginRef.current.classList.add("open")
                setIsOccultView(true);
            }}/>


            <PopUpInvitation 
                googleRedirectRoute= {`/invitation?token_invitation=${token_invitation}&`}
                ref={PopUpLoginRef} 
                setIsOccultView={setIsOccultView}
                idProvider={offerProvider?.provider_id} // <-- ou autre selon structure
                confirmLinkRef={PopUpConfirmRef}
            />
            <div className={`occultView ${isOccultView ? "open" : ""}`}  
                onClick={(e) => {
                    PopUpConfirmRef.current.classList.remove("open");
                    PopUpLoginRef.current.classList.remove("open");
                    setIsOccultView(false);
            }}></div>
                </>
                :
                <div className="InvalideContainer">
                    <img src={ProtectedIllustration} alt="Protected Illustration"/>
                    <p className="t3 bold">Oups, ce lien n’est plus valide</p>
                    <p className="t5">
                        Il semble que ce lien d’invitation ait expiré ou ne soit plus disponible.
                        Vérifiez que vous avez bien utilisé le lien le plus récent ou contacte notre équipe pour obtenir un nouveau lien.
                    </p>
                    <div className="NavigateButton column">
                        <button onClick={() => navigate("/")}>
                            <p className="t4">Retour à l’accueil</p>
                        </button>
                        <button onClick={() => navigate("/")}>
                            <p className="t4">Contacter le support</p>
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}