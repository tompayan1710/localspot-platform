const translations = require("../../../../utils/translation_dic");
const { formatDateYYYYMMDD, formatHumanAtTime } = require("../../../../utils/helpers");

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
    maxWidth: "30%",
  },
  leftTextBig: {
    color: "#4E5562",
    maxWidth: "50%",
  },
  rightText: {
    color: "#4E5562",
    maxWidth: "70%",
    textAlign: "right",
  },
  rightTextSmall: {
    color: "#4E5562",
    maxWidth: "50%",
    textAlign: "right",
  },
  
  // separator: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#e1e1e2",
  //   borderStyle: "dashed",
  //   marginVertical: 14,
  //   opacity: 0.6,
  // },
  separator: {
    borderBottomWidth: 1.5,      // plus épais
    borderBottomColor: "#DDD",   // plus foncé
    borderStyle: "dashed",       // toujours en pointillés
    marginVertical: 16,          // plus d’espace autour
    opacity: 0.9,                // plus visible
  },
  total: {
    fontSize: 14,
    // fontWeight: "bold",
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

  const lang = reservation.lang || "fr";
  const labels = translations[lang] || translations.fr;

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
        // React.createElement(
        //   View,
        //   { style: styles.headerContainer },
        //   React.createElement(Image, {
        //     src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/HeaderTicket.png",
        //     style: styles.headerImage,
        //   }),
        //   React.createElement(Text, { style: styles.dateText }, reservation.date)
        // ),
        // HEADER
        React.createElement(
          View,
          {
            style: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#e1e1e2",
              borderStyle: "solid",
            },
          },
          React.createElement(Image, {
            src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/ViarteLogo.png",
            style: { 
              width: 40, 
              height: 40, 
              objectFit: "contain", 
              borderRadius: 3, // 👈 arrondi (ici 20px → cercle parfait)
            },
        }),
          React.createElement(Text, { style: { fontSize: 10, color: "#4E5562" } }, formatDateYYYYMMDD(reservation.reservation_created_at))
        ),




        // BODY
        React.createElement(View, { style: styles.body },

          React.createElement(View, { style: { alignItems: "center", marginVertical: 10 } },
            React.createElement(Text, { style: [styles.centeredText, styles.thankYouTitle] }, labels.Thank_you),
            React.createElement(Text, { style: [styles.centeredText, styles.thankYouSub] }, labels.Your_ticket_has_been_issued)
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(Text, { style: styles.sectionTitle }, labels.Transaction_details),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Reservation),
            React.createElement(Text, { style: styles.rightText }, `#RES-${reservation.reservation_id}`)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Done_at),
            React.createElement(Text, { style: styles.rightText }, `${formatDateYYYYMMDD(reservation.reservation_created_at)}`)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Activity),
            React.createElement(Text, { style: styles.rightText }, reservation.title)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Start),
            React.createElement(Text, { style: styles.rightText }, `${formatHumanAtTime(reservation.date, lang, reservation.start_hour)}`)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Address),
            React.createElement(Text, { style: styles.rightText }, reservation.adresse)
          ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Client),
            React.createElement(Text, { style: styles.rightText }, reservation.name)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Email),
            React.createElement(Text, { style: styles.rightText }, reservation.email)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Phone),
            React.createElement(Text, { style: styles.rightText }, reservation.phone)
          ),

          React.createElement(View, { style: styles.separator }),

          reservation.payment_method !== "Inconnu" &&
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftText }, labels.Payment),
            React.createElement(Text, { style: styles.rightText }, reservation.payment_method)
          ),
          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.leftTextBig }, labels.Payment_status),
            React.createElement(Text, { style: styles.rightTextSmall }, reservation.reservation_status || labels.confirmed)
          ),

          React.createElement(View, { style: styles.separator }),


          reservation.nb_adult > 0 &&
            React.createElement(View, { style: styles.rowItem },
              React.createElement(Text, { style: styles.leftText }, `×${reservation.nb_adult} adult`),
              React.createElement(Text, { style: styles.rightText }, `${reservation.nb_adult * reservation.unit_price_adult}€`)
            ),

          reservation.nb_child > 0 &&
            React.createElement(View, { style: styles.rowItem },
              React.createElement(Text, { style: styles.leftText }, `×${reservation.nb_child} child`),
              React.createElement(Text, { style: styles.rightText }, `${reservation.nb_child * reservation.unit_price_child}€`)
            ),

          reservation.nb_infant > 0 &&
            React.createElement(View, { style: styles.rowItem },
              React.createElement(Text, { style: styles.leftText }, `×${reservation.nb_infant} infant`),
              React.createElement(Text, { style: styles.rightText }, `${reservation.nb_infant * reservation.unit_price_infant}€`)
            ),

          React.createElement(View, { style: styles.separator }),

          React.createElement(View, { style: styles.rowItem },
            React.createElement(Text, { style: styles.total }, labels.TOTAL),
            React.createElement(Text, { style: styles.total }, `${reservation.gross_amount}€`)
          ),

          React.createElement(Text, { style: styles.totalNote }, labels.all_taxes_included),

          React.createElement(View, { style: styles.separator }),
          React.createElement(Image, {
            src: "https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/public-assets/CodeBar.png",
            style: styles.barcode,
          })
        )
      ),
      React.createElement(Text, { style: styles.footerText },
          labels.text_entrance_scan)
    )
  );
}

module.exports = TicketDocument;
