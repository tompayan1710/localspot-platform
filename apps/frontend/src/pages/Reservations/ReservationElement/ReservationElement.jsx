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


    const [reservation, setReservation ] = useState([])

    const getReservation = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reservation_individual/get?reservation_id=${reservation_id}`, {
                method: "GET",
            });

            const data = await res.json();
            if(data.success){
                return(data.reservation);
            }else{
                console.error("❌ Erreur getAllReservations :", data.error);
                return
            }
        } catch (error) {
            console.error("❌ Erreur getAllReservations :", error);
            return;
        } 
    }

    useEffect(() => {

        const fetchData = async () => {
            const reservation = await getReservation();
            if (reservation) {
                setReservation(reservation);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        console.log(reservation)
    }, [reservation])

    const dateObj = new Date(reservation?.reservation_created_at);

    const formattedDate = dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });

    console.log(formattedDate);



    const downloadTicket = async () => {
        const body = {
            reservation_id: reservation.reservation_id,
            date: formattedDate,
            title: reservation.title,
            start_hour: reservation.start_hour,
            adresse: reservation.adresse,
            name: reservation.name,
            email: reservation.email,
            phone: reservation.phone,
            reservation_status: reservation.reservation_status,
            nb_adult: reservation.nb_adult,
            nb_reduced: reservation.nb_reduced,
            price_per_person: reservation.price_per_person,
            total_price: reservation.total_price,
        }
        const url = `${process.env.REACT_APP_API_URL}/api/payment/tickets/download-ticket?reservation_id=${reservation.reservation_id}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error("Erreur de téléchargement");


            // Récupère le PDF en blob
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);

            // Crée un lien temporaire pour forcer le téléchargement
            const link = document.createElement("a");
            link.href = urlBlob;
            link.download = `Viarte_Reservation_${reservation.reservation_id}_2025-07-26.pdf`; // nom du fichier
            document.body.appendChild(link);
            link.click();

            // Nettoyage
            link.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error("Erreur downloadTicket:", error);
            alert("Impossible de télécharger le ticket.");
        }
    };


    return (
        <div className="ReservationsElement">
            <button className="CloseButton" onClick={() => navigate(-1)}>
                <img src={crossiconBlack} alt="close image"/>
            </button>
            <div className="FactureContainer">
                <div className="LogoHead row">
                    <img src={ViarteV} alt="Viarte Logo"/>
                    <p className="t6">{formattedDate}</p>
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
                        <p className="t6">{reservation.title}</p>
                    </div>
                    <div className="row">
                        <p className="t6">Départ</p>
                        <p className="t6">{formattedDate} à {reservation.start_hour}</p>
                    </div>
                    <div className="row">
                        <p className="t6">Adresse</p>
                        <p className="t6">{reservation.adresse}</p>
                    </div>
                    {/* <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div> */}
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">Client</p>
                        <p className="t6">{reservation.name || "non renseigné"}</p>
                    </div>
                    <div className="row">
                        <p className="t6">Email</p>
                        <p className="t6">{reservation.email || "non renseigné"}</p>
                    </div>
                    <div className="row">
                        <p className="t6">Téléphone</p>
                        <p className="t6">{reservation.phone || "non renseigné"}</p>
                    </div>
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">Paiement</p>
                        <p className="t6">Carte Visa ****1234</p>
                    </div>
                    <div className="row">
                        <p className="t6">Status de payement</p>
                        <p className="t6">{reservation.reservation_status}</p>
                    </div>

                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">×{reservation.nb_adult}&nbsp;&nbsp;&nbsp;adult</p>
                        <p className="t6">{reservation.nb_adult * reservation.price_per_person}€</p>
                    </div>
                    {
                        reservation.nb_reduced > 0 &&
                        <div className="row">
                            <p className="t6">×{reservation.nb_reduced}&nbsp;&nbsp;&nbsp;reduced</p>
                            <p className="t6">{reservation.nb_reduced * reservation.price_per_person}€</p>
                        </div>
                    }
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t32">TOTAL</p>
                        <p className="t32">{reservation.total_price}€</p>
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

            {/* <button className="DownloadButton" onClick={sendEmail}>
                <img src={downloadicon} alt="download icon"/>
                <p className="t5">Send Email</p>
            </button> */}
            <button className="DownloadButton" onClick={downloadTicket}>
                <img src={downloadicon} alt="download icon"/>
                <p className="t5">Download Receipt</p>
            </button>
        </div>
    )
}