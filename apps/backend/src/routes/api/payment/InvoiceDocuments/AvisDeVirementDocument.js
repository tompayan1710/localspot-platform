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
  page: { padding: 20, fontFamily: "Helvetica" },
  container: {
    border: "1 solid #d7d7d9",
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: { fontSize: 14, fontWeight: "bold" },
  small: { fontSize: 9, color: "#666" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: { fontSize: 10 },
  value: { fontSize: 10, fontWeight: "bold" },
  footer: {
    marginTop: 20,
    fontSize: 8,
    textAlign: "center",
    color: "#777",
  },
});

function AvisDeVirementPDF({ payout, enterprise }) {
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
          { style: styles.header },
          React.createElement(Text, { style: styles.title }, "Avis de virement"),
          React.createElement(
            Text,
            { style: styles.small },
            `Émis le ${new Date(payout.created_at).toLocaleDateString("fr-FR")}`
          )
        ),

        // ENTREPRISE
        createRow("Émetteur", enterprise.legal_name),
        createRow("SIRET", enterprise.siret),
        createRow(
          "TVA",
          enterprise.vat_number || "Non applicable – art. 293B du CGI"
        ),

        React.createElement(View, { style: { marginVertical: 10 } }),

        // BENEFICIAIRE
        createRow("Bénéficiaire", payout.beneficiary_name),
        createRow("IBAN", `**** **** **** ${payout.iban.slice(-4)}`),

        React.createElement(View, { style: { marginVertical: 10 } }),

        // VIREMENT
        createRow("ID du virement", `#${payout.id}`),
        createRow(
          "Montant versé",
          `${Number(payout.amount).toFixed(2)} €`
        ),

        React.createElement(
          Text,
          { style: styles.footer },
          `Ce document atteste du virement effectué par ${enterprise.name}.
Ce document n’est pas une facture.`
        )
      )
    )
  );
}

function createRow(label, value) {
  return React.createElement(
    View,
    { style: styles.row },
    React.createElement(Text, { style: styles.label }, label),
    React.createElement(Text, { style: styles.value }, value)
  );
}

module.exports = AvisDeVirementPDF;
