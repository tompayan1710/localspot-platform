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
    margin: "auto",
    width: "100%",
    maxWidth: 320,
    border: "1 solid #d7d7d9",
  },

  header: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallGrey: {
    fontSize: 10,
    color: "#747b88",
  },

  section: {
    padding: 15,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },

  leftText: {
    fontSize: 10,
    color: "#4E5562",
    width: "45%",
  },

  rightText: {
    fontSize: 10,
    color: "#4E5562",
    width: "55%",
    textAlign: "right",
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    borderStyle: "dashed",
    marginVertical: 16,
  },

  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  footer: {
    marginTop: 20,
    fontSize: 8,
    color: "#6b6c6e",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

/* --- Document PDF en JavaScript pur (sans JSX) --- */
function AvisDeVirementPDF({ payout, reservations, enterprise }) {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.container },

        /* HEADER */
        React.createElement(
          View,
          { style: styles.header },
          React.createElement(Image, {
            src: enterprise.logo_url,
            style: { width: 40, height: 40, objectFit: "contain", borderRadius: 4 },
          }),
          React.createElement(
            Text,
            { style: styles.smallGrey },
            `Émis le : ${payout.created_at}`
          )
        ),

        /* ENTREPRISE */
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Émetteur"),

          createRow("Entreprise", enterprise.name),
          createRow("Adresse", enterprise.address),
          createRow("SIRET", enterprise.siret),
        ),

        React.createElement(View, { style: styles.separator }),

        /* BENEFICIAIRE */
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Bénéficiaire"),

          createRow("Nom", payout.beneficiary_name),
          createRow("Méthode", "Virement bancaire"),
          createRow("IBAN", `**** **** **** ${payout.iban.slice(-4)}`),
        ),

        React.createElement(View, { style: styles.separator }),

        /* DETAILS VIREMENT */
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Détails du virement"),

          createRow("ID du virement", `#${payout.id}`),
          createRow("Date du virement", payout.created_at),
          createRowBold("Montant envoyé", `${payout.amount.toFixed(2)} €`),
        ),

        React.createElement(View, { style: styles.separator }),

        /* RÉSERVATIONS */
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Réservations incluses"),

          ...reservations.map((r) =>
            React.createElement(
              View,
              { key: r.id, style: styles.row },
              React.createElement(Text, { style: styles.leftText }, `#${r.id}`),
              React.createElement(Text, { style: styles.rightText }, `${r.net_amount} €`)
            )
          )
        ),

        React.createElement(View, { style: styles.separator }),

        /* FOOTER */
        React.createElement(
          Text,
          { style: styles.footer },
          `Ce document n’est pas une facture.\nIl atteste du virement effectué à votre profit par notre plateforme.\nPour toute question : ${enterprise.contact_email}`
        )
      )
    )
  );
}

/* Fonctions utilitaires pour lignes */
function createRow(label, value) {
  return React.createElement(
    View,
    { style: styles.row },
    React.createElement(Text, { style: styles.leftText }, label),
    React.createElement(Text, { style: styles.rightText }, value)
  );
}

function createRowBold(label, value) {
  return React.createElement(
    View,
    { style: styles.row },
    React.createElement(Text, { style: styles.leftText }, label),
    React.createElement(Text, { style: [styles.rightText, { fontWeight: "bold" }] }, value)
  );
}

module.exports = AvisDeVirementPDF;
