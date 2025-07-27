


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
