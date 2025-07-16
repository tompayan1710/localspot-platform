import { useNavigate, useParams } from "react-router-dom"
import "./ReservationElement.css"
import ViarteV from "../../../assets/images/ViarteV.png"
import QRCode from "../../../assets/images/QRCode.png"
import downloadicon from "../../../assets/images/downloadicon.png"
import PartyIcon from "../../../assets/images/PartyIcon.png"
import crossiconBlack from "../../../assets/images/crossiconBlack.png"
import CodeBar from "../../../assets/images/CodeBar.png"
import { useEffect, useRef, useState } from "react";


export default function ReservationsElement(){
    const { reservation_id } = useParams();
    const navigate = useNavigate();
    const myDivRef = useRef(null);
    const [sphereCount, setSphereCount] = useState(0);

    useEffect(() => {
        if (myDivRef.current) {
        const largeur = myDivRef.current.offsetWidth;
        const sphères = Math.floor(largeur / 26); // 30px par demi-sphère
        setSphereCount(sphères);
        }
    }, []);

    return (
        <div className="ReservationsElement">
            <button className="CloseButton" onClick={() => navigate(-1)}>
                <img src={crossiconBlack} alt="close image"/>
            </button>
            <div className="FactureContainer">
                <div className="LogoHead row">
                    <img src={ViarteV} alt="Viarte Logo"/>
                    <p className="t6">07-11-2025</p>
                </div>
                <div className="FactureBody">
                    <div className="ThanksFull">
                        <img src={PartyIcon} alt="Party icon"/>
                        <p className="t32 bold">Thank you !</p>
                        <p className="t6">Your ticker has been issued<br></br>successfully</p>
                    </div>
                    <div className="hlinedashed"></div>
                    {/* <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div> */}
                    <p className="t5 bold">Transaction details</p>
                    <div className="row">
                        <p className="t6">Réservation</p>
                        <p className="t6">#RES-{reservation_id}</p>
                    </div>
                    <div className="row">
                        <p className="t6">Activité</p>
                        <p className="t6">Visite guidée de Nice</p>
                    </div>
                    <div className="row">
                        <p className="t6">Départ</p>
                        <p className="t6">07-11-2025 à 14h00</p>
                    </div>
                    <div className="row">
                        <p className="t6">Adresse</p>
                        <p className="t6">04 Place Godeau</p>
                    </div>
                    {/* <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div> */}
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">Client</p>
                        <p className="t6">Jean Dupont</p>
                    </div>
                    <div className="row">
                        <p className="t6">Paiement</p>
                        <p className="t6">Carte Visa ****1234</p>
                    </div>

                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">×2&nbsp;&nbsp;&nbsp;adult</p>
                        <p className="t6">70,00€</p>
                    </div>
                    <div className="row">
                        <p className="t6">×1&nbsp;&nbsp;&nbsp;reduced</p>
                        <p className="t6">30,00€</p>
                    </div>
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t32">TOTAL</p>
                        <p className="t32">100,00€</p>
                    </div>
                    <p className="t6">(toutes taxes comprises)</p>

                    {/* <div className="CompanyInfo">
                        <p className="t6">Viarte, SAS au capital de 10 000€</p>
                        <p className="t6">RCS Paris 123 456 789</p>
                        <p className="t6">contact@viarte.fr</p>
                    </div> */}


                    <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div>
                    <div className="CodeBarContainer">
                        <img src={CodeBar} alt="Code Bar"/>
                    </div>
                    <div ref={myDivRef} className="EndPaper row">
                        {
                            Array.from({ length: sphereCount}).map((_, index) => (
                                <div key={index} className="half-sphere"></div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <p className="t6">Ce ticket numérique peut être scanné à l’entrée.</p>

            <button className="DownloadButton">
                <img src={downloadicon} alt="download icon"/>
                <p className="t5">Download Receipt</p>
            </button>
        </div>
    )
}