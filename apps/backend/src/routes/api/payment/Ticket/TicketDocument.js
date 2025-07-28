const React = require("react");
const { Document, Page, Text, View, StyleSheet } = require("@react-pdf/renderer");

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  bold: { fontWeight: "bold" },
  header: { fontSize: 16, marginBottom: 20, textAlign: "center" },
});

function TicketDocument({ reservation }) {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { style: styles.page },

      // Header
      React.createElement(
        Text,
        { style: styles.header },
        "🎫 Confirmation de Réservation"
      ),

      // Section 1 - Infos réservation
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Réservation : "),
          `#${reservation.reservation_id}`
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Activité : "),
          reservation.title
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Date : "),
          `${reservation.date} à ${reservation.start_hour}`
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Adresse : "),
          reservation.adresse
        )
      ),

      // Section 2 - Infos client
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Client : "),
          reservation.name
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Email : "),
          reservation.email
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Téléphone : "),
          reservation.phone
        )
      ),

      // Section 3 - Participants
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Participants : "),
          `${reservation.nb_adult} adulte(s)` +
            (reservation.nb_reduced > 0
              ? ` + ${reservation.nb_reduced} réduit(s)`
              : "")
        ),
        React.createElement(
          Text,
          null,
          React.createElement(Text, { style: styles.bold }, "Total : "),
          `${reservation.total_price} €`
        )
      ),

      // Footer
      React.createElement(
        Text,
        { style: { marginTop: 20, fontSize: 10 } },
        "(Ce document fait office de ticket numérique)"
      )
    )
  );
}

module.exports = TicketDocument;
