import GoBack from "../../../GoBack/GoBack";
import "./BookingSystem.css";
import { useEffect } from "react";

export default function BookingSystem() {
  const handleLogin = () => {
    window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly",
      callback: (response) => {
        if (response.error) {
          console.error(response);
        } else {
          console.log("Access Token :", response.access_token);
          // Utilise ce token comme avant
        }
      },
    }).requestAccessToken();
  };

  return (
    <div className='BookingSystemContainer'>
      <GoBack nagigation={`/profile`} scrollTo={``} text={"revenir"} />
      <p className="t2">BookingSystem</p>
      <button onClick={handleLogin} className="connectBtn">Connecter Google Calendar</button>
    </div>
  );
}
