const React = require("react");
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} = require("@react-pdf/renderer");

const defaultTextColor = { color: "#4E5562" };

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 20,
    margin: "auto",
    width: "100%",
    maxWidth: 250,
    border: "1 solid #e1e1e2",
  },
  headerContainer: {
    position: "relative",
    width: "100%",
    height: 76,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  headerImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    objectFit: "cover",
  },
  dateText: {
    position: "absolute",
    top: 38,
    transform: "translateY(-50%)",
    right: 15,
    fontSize: 14,
    color: "#ffffff",
  },
  body: {
    padding: 15,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e2",
    borderStyle: "dashed",
    marginVertical: 14,     // ← espacement vertical augmenté
    opacity: 0.6,           // ← facultatif, pour adoucir la ligne
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  totalNote: {
    fontSize: 8,
    textAlign: "left",
    marginTop: 2,
    marginBottom: 12,
    marginRight: 0,
    color: "#acadb2"
  },
  footer: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 12,
  },
  barcode: {
    width: 200,
    height: 40,
    marginVertical: 10,
    alignSelf: "center",
    objectFit: "contain",
  },
});

function TicketDocument({ reservation }) {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.container },
        // HEADER
        React.createElement(
          View,
          { style: styles.headerContainer },
          React.createElement(Image, {
            src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/HeaderTicket.png",
            style: styles.headerImage,
          }),
          React.createElement(Text, { style: styles.dateText }, reservation.date)
        ),

        // BODY
        React.createElement(
          View,
          { style: styles.body },
          React.createElement(
            View,
            { style: { alignItems: "center", marginVertical: 10 } },
            React.createElement(Text, { style: [defaultTextColor, { fontSize: 14, fontWeight: "bold" }] }, "Thank you !"),
            React.createElement(Text, { style: [defaultTextColor, { fontSize: 9 }] }, "Your ticket has been issued successfully")
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(Text, { style: [styles.sectionTitle, defaultTextColor] }, "Transaction details"),

          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Réservation"),
            React.createElement(Text, { style: defaultTextColor }, `#RES-${reservation.reservation_id}`)
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Activité"),
            React.createElement(Text, { style: defaultTextColor }, reservation.title)
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Départ"),
            React.createElement(Text, { style: defaultTextColor }, `${reservation.date} à ${reservation.start_hour}`)
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Adresse"),
            React.createElement(Text, { style: defaultTextColor }, reservation.adresse)
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Client"),
            React.createElement(Text, { style: defaultTextColor }, reservation.name)
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Email"),
            React.createElement(Text, { style: defaultTextColor }, reservation.email)
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Téléphone"),
            React.createElement(Text, { style: defaultTextColor }, reservation.phone)
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Paiement"),
            React.createElement(Text, { style: defaultTextColor }, reservation.payment_method || "Inconnu")
          ),
          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, "Status de payement"),
            React.createElement(Text, { style: defaultTextColor }, reservation.reservation_status || "confirmé")
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: defaultTextColor }, `×${reservation.nb_adult}  adult`),
            React.createElement(Text, { style: defaultTextColor }, `${reservation.nb_adult * reservation.price_per_person}€`)
          ),
          reservation.nb_reduced > 0 &&
            React.createElement(View, { style: styles.row },
              React.createElement(Text, { style: defaultTextColor }, `×${reservation.nb_reduced} reduced`),
              React.createElement(Text, { style: defaultTextColor }, `${reservation.nb_reduced * reservation.price_per_person}€`)
            ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: [styles.total, defaultTextColor] }, "TOTAL"),
            React.createElement(Text, { style: [styles.total, defaultTextColor] }, `${reservation.total_price}€`)
          ),

          React.createElement(Text, { style: [styles.totalNote] }, "(toutes taxes comprises)"),

          React.createElement(Image, {
            src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/CodeBar.png",
            style: styles.barcode,
          }),
        ),
        React.createElement(Text, {
          style: {
            fontSize: 8,
            color: "#4E5562",
            textAlign: "center",
            marginTop: 4,
          },
        }, "Ce ticket numérique peut être scanné à l’entrée.")
      )
    )
  );
}

module.exports = TicketDocument;
