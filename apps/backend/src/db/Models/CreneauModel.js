  const express = require("express");
  const router = express.Router();
  const fetch = require("node-fetch");
  const db = require("../index");
  const { v4: uuidv4 } = require("uuid");
  require("dotenv").config();

  const hotelRate = parseFloat(process.env.HOTEL_COMMISSION_RATE) || 0;
  const platformRate = parseFloat(process.env.PLATFORM_COMMISSION_RATE) || 0;


  async function findExistingCreneauOrCreate(provider_id, offerSlug, date, start_hour, end_hour, total_places_used, grossAmount, hotelCommission, platformCommission, netAmount) {
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
    const result = await db.query(query, values);


    const offer_result = await db.query(`
      SELECT total_capacity
        FROM offers
        WHERE slug = $1;`, [offerSlug]);
    const total_capacity = offer_result.rows[0].total_capacity

    let slot_id;
    let newTotalReserved;
    let newStatus;
      
    if (result.rowCount > 0) {
      slot_id = result.rows[0].id

      const row = result.rows[0];

      newTotalReserved = total_places_used + row.total_reserved;
      newStatus = newTotalReserved < total_capacity ? "available" : "full";

      const oldGross    = Number(row.gross_amount_total)        || 0;
      const oldHotel    = Number(row.hotel_commission_total)    || 0;
      const oldPlatform = Number(row.platform_commission_total) || 0;
      const oldNet      = Number(row.net_amount_total)          || 0;

      const new_gross_amount_total     = oldGross    + grossAmount;
      const new_hotel_commission_total = oldHotel    + hotelCommission;
      const new_platform_commission_total = oldPlatform + platformCommission;
      const new_net_amount_total       = oldNet      + netAmount;


      await db.query(`
        UPDATE reservation_slots
        SET total_reserved = $1, 
            status = $2,
            gross_amount_total  = $3,
            hotel_commission_total = $4,
            platform_commission_total = $5,
            net_amount_total = $6,
            updated_at = NOW()
        WHERE id = $7
      `, [newTotalReserved, newStatus, new_gross_amount_total, new_hotel_commission_total, new_platform_commission_total, new_net_amount_total, slot_id]);

    } else {
      newTotalReserved = total_places_used;
      newStatus = newTotalReserved < total_capacity ? "available" : "full";

      const { rows } = await db.query(`
        INSERT INTO reservation_slots (
          provider_id, 
          offer_slug, 
          date, 
          start_hour, 
          end_hour, 
          total_reserved,
          status,
          gross_amount_total, 
          hotel_commission_total, 
          platform_commission_total, 
          net_amount_total
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `, [provider_id, offerSlug, date, start_hour, end_hour, total_places_used, newStatus, grossAmount, hotelCommission, platformCommission, netAmount]);
      
      if (!rows[0]?.id) throw new Error("Création du créneau échouée");
      slot_id = rows[0].id;
    }

    return [ slot_id, newTotalReserved, newStatus,  ];
  }


  async function getAccessToken(provider_id) {
    try {
      const result = await db.query(
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

        await db.query(`
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
    const {user_id, provider_id, offerSlug, id_hote, date, start_hour, end_hour, adresse, nb_adult, nb_child, nb_infant, unit_price_adult, unit_price_child, unit_price_infant,total_places_used, total_price_eur, name, email, phone, title, payment_intent_id, payment_method } = params;

    console.log("saveCreneau en cours")
    try { 

      const grossAmount = total_price_eur;
      const hotelCommission = grossAmount * hotelRate;
      const platformCommission = grossAmount * platformRate;
      const netAmount = grossAmount - hotelCommission - platformCommission;

      console.log("findExistingCreneauOrCreate")
      const [ slot_id, newTotalReserved, newStatus ] = await findExistingCreneauOrCreate(provider_id, offerSlug, date, start_hour, end_hour, total_places_used, grossAmount, hotelCommission, platformCommission, netAmount);


      const token_validate = uuidv4();

      const reservation_individual = await db.query(`
        INSERT INTO reservations_individuals (
          user_id,
          slot_id,
          nb_adult,
          nb_child,
          nb_infant,
          total_places_used,
          payment_status,
          reservation_status,
          name, 
          email,
          phone,
          id_hote,
          stripe_payment_intent_id,
          gross_amount,
          hotel_commission,
          platform_commission,
          net_amount,
          unit_price_adult, 
          unit_price_child, 
          unit_price_infant,
          token_validate
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *, id AS reservation_id;
      `, [user_id, 
          slot_id, 
          nb_adult, 
          nb_child,
          nb_infant, 
          total_places_used, 
          "paid", 
          "confirmed", 
          name, 
          email, 
          phone, 
          id_hote,
          payment_intent_id, 
          grossAmount,
          hotelCommission,
          platformCommission,
          netAmount,
          unit_price_adult,
          unit_price_child,
          unit_price_infant,
          token_validate
        ]);

        
      
      // Récupère toutes les résas du créneau pour construire la description complète
      const { rows: participants } = await db.query(`
        SELECT name, email, phone, nb_adult, nb_child, nb_infant, gross_amount, created_at
        FROM reservations_individuals
        WHERE slot_id = $1
        ORDER BY created_at ASC
      `, [slot_id]);

      // Totaux agrégés (créneau)
      const totalAdults  = participants.reduce((s,p) => s + (p.nb_adult  || 0), 0);
      const totalChild   = participants.reduce((s,p) => s + (p.nb_child  || 0), 0);
      const totalInfant  = participants.reduce((s,p) => s + (p.nb_infant || 0), 0);
      const slotGross    = participants.reduce((s,p) => s + (Number(p.gross_amount) || 0), 0);

      // Lignes de participants
      const participantsLines = participants.map((p, i) => {
        const lineName  = p.name  ? p.name  : "—";
        const lineEmail = p.email ? p.email : "—";
        const linePhone = p.phone ? p.phone : "—";
        return `#${i+1} ${lineName} — ${lineEmail} — ${linePhone}  [A:${p.nb_adult||0} C:${p.nb_child||0} I:${p.nb_infant||0}]`;
      }).join('\n');

      //Teste si le prestataire est sur google calendar
      const isBookingSystem = await db.query(`
        SELECT * FROM provider_booking_integrations WHERE provider_id = $1
      `, [provider_id]);
      
      if(isBookingSystem.rowCount > 0){//A un System de réservation
        console.log("J'ai un BOOKING SYSTEM");
        const access_token = await getAccessToken(provider_id);
        if (!access_token) return null;

        const calendarRes = await db.query(`
          SELECT calendar_id FROM provider_booking_integrations WHERE provider_id = $1
        `, [provider_id]);

        const calendarId = calendarRes.rows[0]?.calendar_id;
        if (!calendarId) return null

        // const startTime = `${date}T${start_hour}:00`;
        // const endTime = `${date}T${end_hour}:00`;

        // const startTime = `${date}T${start_hour}:00+02:00`;
        // const endTime = `${date}T${end_hour}:00+02:00`;
        const startTime = `${date}T${start_hour}:00`;
        const endTime   = `${date}T${end_hour}:00`;

        
        // const participantsList = participants.map(p => `- ${p.firstName} ${p.lastName} (${p.type})`).join('\n');

        // const eventObject = {
        //   summary: `${title.slice(0, 20)}... \n(${newStatus === "full" ? "COMPLET - " : ""}${newTotalReserved} participants)`,
        //   description: `
        //     ${title}\n\n

        //     Participant : ${newTotalReserved}${newStatus === "full" ? " (COMPLET)" : ""}\n
        //     Total : ${grossAmount} €\n\n
            
        //     Informations:\n
        //     Nom: ${name}\n
        //     Email: ${email}\n
        //     Téléphone: ${phone}
        //   `,
        //   location: adresse,
        //   start: { dateTime: startTime, timeZone: "Europe/Paris" },
        //   end: { dateTime: endTime, timeZone: "Europe/Paris" },
        //   colorId: "8"
        // };

        const eventObject = {
          summary: `${title.slice(0, 20)}... (${newStatus === "full" ? "COMPLET - " : ""}${newTotalReserved} participants)`,
          description: [
            `${title}`,
            "",
            `Participant${newTotalReserved > 1 ? 's' : ''} : ${newTotalReserved}`,
            `- Adultes : ${totalAdults}${totalChild > 0 ? ` | Enfants : ${totalChild}` :""} ${totalInfant > 0 ? ` | Bébés : ${totalInfant}` :""}`,
            `Montant total (créneau) : ${slotGross.toFixed(2)} €`,
            "",
            `Détail des réservations :`,
            participantsLines || "(aucune encore)",
            "",
            `Dernière réservation ajoutée :`,
            `Nom : ${name || "—"}`,
            `Email : ${email || "—"}`,
            `Téléphone : ${phone || "—"}`
          ].join('\n'),
          location: adresse,
          start: { dateTime: startTime, timeZone: "Europe/Paris" },
          end:   { dateTime: endTime,   timeZone: "Europe/Paris" },
          colorId: "8",
        };



        // console.log("✅ EventObject envoyé :", JSON.stringify(eventObject, null, 2));
      
    
        const isCreneauGoogleCalendar = await db.query(`
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

          await db.query(`
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
