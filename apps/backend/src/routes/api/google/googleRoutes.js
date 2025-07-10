const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../../../db/index");
const { getOfferBySlug } = require("../../../db/Models/offerModel");
require("dotenv").config();


// 🔹 Étape 1 : Rediriger vers Google
router.get("/auth", (req, res) => {
  const { provider_id } = req.query;
  
  const state = encodeURIComponent(provider_id);

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_CALENDAR}` +
    `&response_type=code&access_type=offline&prompt=consent` +
    `&scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email`+
    `&state=${state}`;
  res.redirect(url);
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  const provider_id = state;

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI_CALENDAR,
        grant_type: "authorization_code"
      })
    });

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token } = tokens;

    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const userData = await userInfoResponse.json();
    const { email } = userData;

    const isAlready = await pool.query(`
      SELECT * FROM provider_booking_integrations WHERE provider_id = $1
    `, [provider_id]);

    let calendarId = isAlready.rows[0]?.calendar_id;
    console.log("calendarI : " + calendarId);
    if (isAlready.rowCount > 0) {

      const calendarListRes = await fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      const calendarListData = await calendarListRes.json();

      const calendarExists = calendarListData.items.some(cal => cal.id === calendarId);
      console.log("✅ Présence dans calendarList:", calendarExists);



      // Si pas de calendarId en base OU calendrier supprimé → en créer un nouveau
      console.log("calendarId = :" + calendarId + "Et le existe = :" + calendarExists)
      if (!calendarId || !calendarExists) {
        console.log("🚨 Soit pas de calendarId en base, soit il n'existe plus dans Google → je crée un calendrier");
        const newCalendarId = await createDedicatedCalendar(access_token);
        if (!newCalendarId) throw new Error("Erreur création calendrier Google");
        calendarId = newCalendarId;

        await pool.query(`
          UPDATE provider_booking_integrations
          SET platform=$1, access_token=$2, refresh_token=$3, email=$4, calendar_id=$5
          WHERE provider_id=$6
        `, ["google_calendar", access_token, refresh_token, email, calendarId, provider_id]);
      } else {
        // Si le calendrier existe → juste update les tokens
        await pool.query(`
          UPDATE provider_booking_integrations
          SET platform=$1, access_token=$2, refresh_token=$3, email=$4
          WHERE provider_id=$5
        `, ["google_calendar", access_token, refresh_token, email, provider_id]);
      }

    } else {
      // Premier enregistrement → création du calendrier obligatoire
      const newCalendarId = await createDedicatedCalendar(access_token);
      if (!newCalendarId) throw new Error("Erreur création calendrier Google");

      calendarId = newCalendarId;

      await pool.query(`
        INSERT INTO provider_booking_integrations
        (provider_id, platform, access_token, refresh_token, email, calendar_id)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [provider_id, "google_calendar", access_token, refresh_token, email, calendarId]);
    }


    res.redirect(`${process.env.FRONTEND_URL}/booking-system?email=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error("❌ Erreur callback :", err);
    res.status(500).json({ error: "Erreur lors de la connexion Google" });
  }
});


async function getAccessToken(provider_id) {
  try {
    const result = await pool.query(
      "SELECT access_token, refresh_token FROM provider_booking_integrations WHERE provider_id = $1",
      [provider_id]
    );

    if (result.rows.length === 0) throw new Error("Aucune intégration trouvée pour ce provider");

    let { access_token, refresh_token } = result.rows[0];

    // Optionnel : tester le token
    const testRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (testRes.status === 401) {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: refresh_token,
          grant_type: "refresh_token"
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error_description || "Erreur de renouvellement du token");

      access_token = data.access_token;

      await pool.query(`
        UPDATE provider_booking_integrations
        SET access_token = $1
        WHERE provider_id = $2
      `, [access_token, provider_id]);
    }

    return access_token;
  } catch (err) {
    console.log("❌ Erreur access token :", err.message);
    return null;
  }
}


async function createDedicatedCalendar(access_token) {
  try {
    const calendarRes = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary: `Viarte - Réservations`,
        description: "Calendrier dédié pour les réservations Viarte",
        timeZone: "Europe/Paris"
      })
    });

    const calendar = await calendarRes.json();

    if (calendar.id) {
      console.log("✅ Nouveau calendrier créé :", calendar.id);
      return calendar.id;
    } else {
      console.error("❌ Erreur création calendrier :", calendar);
      return null;
    }
  } catch (err) {
    console.error("❌ Erreur createDedicatedCalendar :", err);
    return null;
  }
}



router.get("/events", async (req, res) => {
  const { provider_id } = req.query;

  try {
    const access_token = await getAccessToken(provider_id);
    if (!access_token) return res.status(401).json({ error: "Token invalide" });

    const calendarRes = await pool.query(`
      SELECT calendar_id FROM provider_booking_integrations WHERE provider_id = $1
    `, [provider_id]);

    let calendarId = calendarRes.rows[0]?.calendar_id;
    if (!calendarId) throw new Error("Erreur aucun calendrier Google");

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const events = await response.json();
    res.json(events);
  } catch (err) {
    console.error("❌ Erreur events :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



async function findExistingCreneauOrCreate(provider_id, offerSlug, date, start_hour, end_hour, total_participants, price_per_person) {
  const query = `
    SELECT 
      *
    FROM reservation_slots r
    WHERE provider_id = $1
      AND offer_slug = $2
      AND date = $3
      AND start_hour = $4
      AND end_hour = $5
    LIMIT 1;
  `;
  const values = [provider_id, offerSlug, date, start_hour, end_hour];
  const result = await pool.query(query, values);


  const offer_result = await pool.query(`
    SELECT total_capacity
      FROM offers
      WHERE slug = $1;`, [offerSlug]);
  const total_capacity = offer_result.rows[0].total_capacity

  let slot_id;
  let newTotalReserved;
  let newStatus;
  if (result.rowCount > 0) {
    slot_id = result.rows[0].id


    newTotalReserved = total_participants + result.rows[0].total_reserved;
    newStatus = newTotalReserved < total_capacity ? "available" : "full";

    await pool.query(`
      UPDATE reservation_slots
      SET total_reserved = $1, status = $2, updated_at = NOW()
      WHERE id = $3
    `, [newTotalReserved, newStatus, slot_id]);

  } else {
    newTotalReserved = total_participants;
    newStatus = "available";
    newStatus = newTotalReserved < total_capacity ? "available" : "full";

    const { rows } = await pool.query(`
      INSERT INTO reservation_slots (
        provider_id, 
        offer_slug, 
        date, 
        start_hour, 
        end_hour, 
        total_reserved,
        price_per_person, 
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `, [provider_id, offerSlug, date, start_hour, end_hour, total_participants, price_per_person, newStatus]);
    
    if (!rows[0]?.id) throw new Error("Création du créneau échouée");
    slot_id = rows[0].id;
  }

  return [ slot_id, newTotalReserved, newStatus ];
}

async function findExistingGoogleEvent(access_token, calendarId, summary, startTime, endTime) {
  const timeMin = new Date(startTime).toISOString();
  const timeMax = new Date(endTime).toISOString();

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&timeMax=${timeMax}&q=${encodeURIComponent(summary)}`, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const data = await response.json();
  return data.items?.find(event => event.summary === summary);
}




router.post("/save-creaneau", async (req, res) => {
  const { user_id, provider_id, offerSlug, date, start_hour, end_hour, location, participants, total_participants, price_per_person, title } = req.body;

  console.log(user_id, provider_id, offerSlug, date, start_hour, end_hour, location, participants, total_participants, price_per_person, title)

  try {

    const [ slot_id, newTotalReserved, newStatus ] = await findExistingCreneauOrCreate(provider_id, offerSlug, date, start_hour, end_hour, total_participants, price_per_person);

    const participantsJson = JSON.stringify(participants); 

    const reservation_individual = await pool.query(`
      INSERT INTO reservations_individuals (
        user_id,
        slot_id,
        participants,
        total_participants,
        total_price,
        payment_status,
        reservation_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [user_id, slot_id, participantsJson, total_participants, price_per_person * (total_participants), "paid", "confirmed"]);



    //Teste si le prestataire est sur google calendar
    const isBookingSystem = await pool.query(`
      SELECT * FROM provider_booking_integrations WHERE provider_id = $1
    `, [provider_id]);
    
    if(isBookingSystem.rowCount > 0){//A un System de réservation
      console.log("J'ai un BOOKING SYSTEM");
      const access_token = await getAccessToken(provider_id);
      if (!access_token) return res.status(401).json({ success: false, message: "Pas d'accès au calendrier Google." });

      const calendarRes = await pool.query(`
        SELECT calendar_id FROM provider_booking_integrations WHERE provider_id = $1
      `, [provider_id]);

      const calendarId = calendarRes.rows[0]?.calendar_id;
      if (!calendarId) return res.status(400).json({ success: false, message: "Aucun calendrier associé." });

      // const startTime = `${date}T${start_hour}:00`;
      // const endTime = `${date}T${end_hour}:00`;

      const startTime = `${date}T${start_hour}:00+02:00`;
      const endTime = `${date}T${end_hour}:00+02:00`;


      
      const participantsList = participants.map(p => `- ${p.firstName} ${p.lastName} (${p.type})`).join('\n');

      const eventObject = {
        summary: `${title.slice(0, 20)}... \n(${newStatus == "full" ? "COMPLET - " : ""}${newTotalReserved} participants)`,
        description: `${title}\n\nParticipants : ${newTotalReserved}${newStatus == "full" ? " (COMPLET)" : ""}\nTotal : ${newTotalReserved * price_per_person} €\n\nListe des participants :\n${participantsList}
        `,
        location: location,
        start: { dateTime: startTime, timeZone: "Europe/Paris" },
        end: { dateTime: endTime, timeZone: "Europe/Paris" },
        colorId: "8"
      };


      // console.log("✅ EventObject envoyé :", JSON.stringify(eventObject, null, 2));
    
   
      const isCreneauGoogleCalendar = await pool.query(`
        SELECT * FROM reservations_creneaux_google_calendar WHERE reservation_slots_id = $1 AND provider_id = $2
      `, [slot_id, provider_id]);

      let googleEventId;
      if(isCreneauGoogleCalendar.rowCount == 0 ){
        const createRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
          method: "POST",
          headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify(eventObject)
        });
        const createdEvent = await createRes.json();

        if (!createdEvent.id) {
          console.error("❌ Échec de création de l'événement Google :", createdEvent);
          throw new Error("Échec de création de l'événement Google");
        }

        googleEventId = createdEvent.id;

        await pool.query(`
          INSERT INTO reservations_creneaux_google_calendar (
            reservation_slots_id, 
            provider_id, 
            google_event_id)
            VALUES ($1, $2, $3)
        `, [ slot_id, provider_id, createdEvent.id]);
      }else{
        googleEventId = isCreneauGoogleCalendar.rows[0].google_event_id;
        const updateRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${googleEventId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify(eventObject)
        });

        if (!updateRes.ok) {
          const errorText = await updateRes.text();
          console.error("❌ Erreur update Google Calendar:", errorText);
          throw new Error("Erreur lors de la mise à jour de l'événement Google Calendar");
        }
      }

      return res.json({ success: true, message: "Réservation enregistrée dans calendrier Google."});

  
  } else{//Pas de system de reservation
    console.log("NO CALENDAR associé GOOGLE")
    return res.json({ success: true, message: "Réservation enregistrée sans system de réservation."});
  }


  } catch (err) {
    console.error("❌ Erreur save-creaneau :", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});


module.exports = router;
