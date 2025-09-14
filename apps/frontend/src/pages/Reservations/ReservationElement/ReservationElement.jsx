import { useNavigate, useParams } from "react-router-dom"
import "./ReservationElement.css"
import ViarteV from "../../../assets/images/ViarteLogo.png"
import QRCode from "../../../assets/images/QRCode.png"
import downloadicon from "../../../assets/images/downloadicon.png"
import PartyIcon from "../../../assets/images/PartyIcon.png"
import crossiconBlack from "../../../assets/images/crossiconBlack.png"
import CodeBar from "../../../assets/images/CodeBar.png"
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { plural } from "../../../services/translation"
import FadeInImage from "../../../components/Utils/FadeInImage"


export default function ReservationsElement(){
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
    const { reservation_id } = useParams();
    const navigate = useNavigate();
    const myDivRef = useRef(null);
    const [sphereCount, setSphereCount] = useState(0);

    useEffect(() => {
        if (myDivRef.current) {
        const largeur = myDivRef.current.offsetWidth;
        const sphères = Math.floor(largeur / 28); // 30px par demi-sphère
        setSphereCount(sphères);
        }
    }, []);


    const [reservation, setReservation ] = useState([])

    const getReservation = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reservation_individual/get?reservation_id=${reservation_id}&lang=${lang}`, {
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
    const startObj = new Date(reservation?.date);

    const created_date = dateObj.toLocaleDateString(i18n.language, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    }); 

    const created_hour = dateObj.toLocaleTimeString(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    })


    const start_date = startObj.toLocaleDateString(i18n.language, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    }); 
    const start_hour = startObj.toLocaleTimeString(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    })
    // .replace(":", "h ") + "min";
    // "16h:50m"

    console.log(start_date);



    const downloadTicket = async () => {
        const body = {
            reservation_id: reservation.reservation_id,
            reservation_created_at: created_date,
            reservation_created_at_hour: created_hour,
            start_date: start_date,
            start_hour: start_hour,
            title: reservation.title,
            adresse: reservation.adresse,
            name: reservation.name,
            email: reservation.email,
            phone: reservation.phone,
            reservation_status: t(reservation.reservation_status),
            nb_adult: reservation.nb_adult,
            nb_child: reservation.nb_child,
            nb_infant: reservation.nb_infant,
            unit_price_adult: reservation.unit_price_adult,
            unit_price_child: reservation.unit_price_child,
            unit_price_infant: reservation.unit_price_infant,
            gross_amount: reservation.gross_amount,

            labels: {
                Reservation: t("Reservation"),
                Done_at: t("Done_at"),
                Activity: t("Activity"),
                Start: t("Start"),
                Address: t("Address"),
                Client: t("Client"),
                Email: t("Email"),
                Phone: t("Phone"),
                Payment: t("Payment"),
                Payment_status: t("Payment_status"),
                TOTAL: t("TOTAL"),
                all_taxes_included: t("all_taxes_included"),
                Thank_you: t("Thank_you"),
                Your_ticket_has_been_issued: t("Your_ticket_has_been_issued"),
                Transaction_details: t("Transaction_details"),
                at: t("at"),
                confirmed: t("confirmed "),
                adult: t("adult"),
                adults: t("adults"),
                child: t("child"),
                children: t("children"),
                infant: t("infant"),
                infants: t("infants"),
                text_entrance_scan: t("text_entrance_scan")
            }
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
                    <FadeInImage src={ViarteV} alt="Viarte Logo"/>
                    <p className="t6">{created_date}</p>
                </div>
                <div className="FactureBody">
                    <div className="ThanksFull">
                        {/* <img src={PartyIcon} alt="Party icon"/> */}
                        <p className="t32 bold">{t("Thank_you")}</p>
                        <p className="t6">{t("Your_ticket_has_been_issued")}</p>
                    </div>
                    <div className="hlinedashed"></div>
                    {/* <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div> */}
                    <p className="t5 bold">{t("Transaction_details")}</p>
                    <div className="row">
                        <p className="t6">{t("Reservation")}</p>
                        <p className="t6">#RES-{reservation_id}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Done_at")}</p>
                        <p className="t6">{created_date} {t("at")} {created_hour}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Activity")}</p>
                        <p className="t6">{reservation.title}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Start")}</p>
                        <p className="t6">{start_date} {t("at")} {reservation.start_hour}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Address")}</p>
                        <p className="t6">{reservation.adresse}</p>
                    </div>
                    {/* <div className="row SeparateLine">
                        <div className="half-sphere left"></div>
                        <div className="hlinedashed"></div>
                        <div className="half-sphere right"></div>
                    </div> */}
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t6">{t("Client")}</p>
                        <p className="t6">{reservation.name || t("not_specified")}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Email")}</p>
                        <p className="t6">{reservation.email || t("not_specified")}</p>
                    </div>
                    <div className="row">
                        <p className="t6">{t("Phone")}</p>
                        <p className="t6">{reservation.phone || t("not_specified")}</p>
                    </div>
                    <div className="hlinedashed"></div>
                    {/* <div className="row">
                        <p className="t6">Paiement</p>
                        <p className="t6">Carte Visa ****1234</p>
                    </div> */}
                    <div className="row">
                        <p className="t6">{t("Payment_status")}</p>
                        <p className="t6">{reservation.reservation_status}</p>
                    </div>

                    <div className="hlinedashed"></div>
                    {
                        reservation.nb_adult > 0 &&
                        <div className="row">
                            <p className="t6">×{reservation.nb_adult}&nbsp;&nbsp;&nbsp;{t(plural(reservation.nb_adult, "Adult", "Adults"))}</p>
                            <p className="t6">{(reservation.nb_adult * reservation.unit_price_adult).toFixed(2)}€</p>
                        </div>
                    }
                    {
                        reservation.nb_child > 0 &&
                        <div className="row">
                            <p className="t6">×{reservation.nb_child}&nbsp;&nbsp;&nbsp;{t(plural(reservation.nb_child, "Child", "Children"))}</p>
                            <p className="t6">{(reservation.nb_child * reservation.unit_price_child).toFixed(2)}€</p>
                        </div>
                    }
                    {
                        reservation.nb_infant > 0 &&
                        <div className="row">
                            <p className="t6">×{reservation.nb_infant}&nbsp;&nbsp;&nbsp;{t(plural(reservation.nb_infant, "Infant", "Infants"))}</p>
                            <p className="t6">{(reservation.nb_infant * reservation.unit_price_infant).toFixed(2)}€</p>
                        </div>
                    }
                    <div className="hlinedashed"></div>
                    <div className="row">
                        <p className="t32">{t("TOTAL")}</p>
                        <p className="t32">{reservation.gross_amount}€</p>
                    </div>
                    <p className="t6">{t("all_taxes_included")}</p>

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
            <p className="t6">{t("text_entrance_scan")}</p>

            {/* <button className="DownloadButton" onClick={sendEmail}>
                <img src={downloadicon} alt="download icon"/>
                <p className="t5">Send Email</p>
            </button> */}
            <button className="DownloadButton" onClick={downloadTicket}>
                <img src={downloadicon} alt="download icon"/>
                <p className="t5">{t("Download_receipt")}</p>
            </button>
        </div>
    )
}