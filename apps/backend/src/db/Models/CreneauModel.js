const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../../../db/index");
const { getOfferBySlug } = require("../../../db/Models/offerModel");
require("dotenv").config();


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


async function saveCreneau(params) {
  const {user_id, provider_id, offerSlug, date, start_hour, end_hour, location,  nb_adult, nb_reduced, total_participants, price_per_person, name, email, phone, title } = params;
  try { 

    const [ slot_id, newTotalReserved, newStatus ] = await findExistingCreneauOrCreate(provider_id, offerSlug, date, start_hour, end_hour, total_participants, price_per_person);


    const reservation_individual = await pool.query(`
      INSERT INTO reservations_individuals (
        user_id,
        slot_id,
        nb_adult,
        nb_reduced,
        total_participants,
        total_price,
        payment_status,
        reservation_status,
        name, 
        email, 
        phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `, [user_id, slot_id, nb_adult, nb_reduced, total_participants, price_per_person * (total_participants), "paid", "confirmed", name, email, phone]);



    //Teste si le prestataire est sur google calendar
    const isBookingSystem = await pool.query(`
      SELECT * FROM provider_booking_integrations WHERE provider_id = $1
    `, [provider_id]);
    
    if(isBookingSystem.rowCount > 0){//A un System de réservation
      console.log("J'ai un BOOKING SYSTEM");
      const access_token = await getAccessToken(provider_id);
      if (!access_token) return null;

      const calendarRes = await pool.query(`
        SELECT calendar_id FROM provider_booking_integrations WHERE provider_id = $1
      `, [provider_id]);

      const calendarId = calendarRes.rows[0]?.calendar_id;
      if (!calendarId) return null

      // const startTime = `${date}T${start_hour}:00`;
      // const endTime = `${date}T${end_hour}:00`;

      const startTime = `${date}T${start_hour}:00+02:00`;
      const endTime = `${date}T${end_hour}:00+02:00`;


      
      const participantsList = participants.map(p => `- ${p.firstName} ${p.lastName} (${p.type})`).join('\n');

      const eventObject = {
        summary: `${title.slice(0, 20)}... \n(${newStatus == "full" ? "COMPLET - " : ""}${newTotalReserved} participants)`,
        description: `
          ${title}\n\n

          Participant : ${newTotalReserved}${newStatus == "full" ? " (COMPLET)" : ""}\n
          Total : ${newTotalReserved * price_per_person} €\n\n
          
          Informations:\n
          Nom: ${name}\n
          Email: ${email}\n
          Téléphone: ${phone}
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

      return reservation_individual.rows[0]

  } else{//Pas de system de reservation
    console.log("NO CALENDAR associé GOOGLE")
    return reservation_individual.rows[0];
  }


  } catch (err) {
    console.error("❌ Erreur save-creaneau :", err);
    return null;
  }
}

module.exports = { saveCreneau };
