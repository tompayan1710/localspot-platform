const React = require("react");
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} = require("@react-pdf/renderer");

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 0,    // 👈 Zéro en bas
    margin: "auto",
    width: "100%",
    maxWidth: 280,
    border: "1 solid #e1e1e2",
  },
  headerContainer: {
    position: "relative",
    width: "100%",
    height: 60,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
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
    top: 25,
    right: 15,
    fontSize: 10,
    color: "#ffffff",
  },
  body: {
    padding: 15,
    fontSize: 10,
  },
  centeredText: {
    textAlign: "center",
    color: "#4E5562",
  },
  thankYouTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  thankYouSub: {
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#4E5562",
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginVertical: 2,
  },
  leftText: {
    color: "#4E5562",
    maxWidth: "45%",
  },
  rightText: {
    color: "#4E5562",
    maxWidth: "50%",
    textAlign: "right",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e2",
    borderStyle: "dashed",
    marginVertical: 14,
    opacity: 0.6,
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    color: "#4E5562",
  },
  totalNote: {
    fontSize: 8,
    textAlign: "left",
    marginTop: 2,
    marginBottom: 12,
    color: "#acadb2",
  },
  footerText: {
    fontSize: 8,
    color: "#4E5562",
    textAlign: "center",
    marginTop: 2,
  },
  barcode: {
    width: 200,
    height: 40,
    marginTop: 0,
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
        React.createElement(View, { style: styles.body },

          React.createElement(View, { style: { alignItems: "center", marginVertical: 10 } },
            React.createElement(Text, { style: [styles.centeredText, styles.thankYouTitle] }, "Thank you !"),
            React.createElement(Text, { style: [styles.centeredText, styles.thankYouSub] }, "Your ticket has been issued successfully")
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(Text, { style: styles.sectionTitle }, "Transaction details"),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Réservation"),
            React.createElement(Text, { style: styles.rightText }, `#RES-${reservation.reservation_id}`)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Activité"),
            React.createElement(Text, { style: styles.rightText }, reservation.title)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Départ"),
            React.createElement(Text, { style: styles.rightText }, `${reservation.date} à ${reservation.start_hour}`)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Adresse"),
            React.createElement(Text, { style: styles.rightText }, reservation.adresse)
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Client"),
            React.createElement(Text, { style: styles.rightText }, reservation.name)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Email"),
            React.createElement(Text, { style: styles.rightText }, reservation.email)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Téléphone"),
            React.createElement(Text, { style: styles.rightText }, reservation.phone)
          ),

          React.createElement(View, { style: styles.separator }),

          reservation.payment_method !== "Inconnu" &&
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Paiement"),
            React.createElement(Text, { style: styles.rightText }, reservation.payment_method)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, "Status de payement"),
            React.createElement(Text, { style: styles.rightText }, reservation.reservation_status || "confirmé")
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, `×${reservation.nb_adult} adult`),
            React.createElement(Text, { style: styles.rightText }, `${reservation.nb_adult * reservation.price_per_person}€`)
          ),
          reservation.nb_reduced > 0 &&
            React.createElement(View, { style: styles.rowItem },
              React.createElement(Text, { style: styles.leftText }, `×${reservation.nb_reduced} reduced`),
              React.createElement(Text, { style: styles.rightText }, `${reservation.nb_reduced * reservation.price_per_person}€`)
            ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.total }, "TOTAL"),
            React.createElement(Text, { style: styles.total }, `${reservation.total_price}€`)
          ),

          React.createElement(Text, { style: styles.totalNote }, "(toutes taxes comprises)"),

          React.createElement(View, { style: styles.separator }),
          React.createElement(Image, {
            src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/CodeBar.png",
            style: styles.barcode,
          })
        )
      ),
      React.createElement(Text, { style: styles.footerText },
          "Ce ticket numérique peut être scanné à l’entrée.")
    )
  );
}

module.exports = TicketDocument;
