const path = require("path");
const fs = require("fs");
const React = require("react");
const { renderToFile } = require("@react-pdf/renderer");
const AvisDeVirementDocument = require("./AvisDeVirementDocument");

async function generateAvisDeVirementPDF({ payout, enterprise }) {
  const outputDir = path.join(__dirname, "pdf_tmp");
  await fs.promises.mkdir(outputDir, { recursive: true });

  const filePath = path.join(
    outputDir,
    `avis_virement_${payout.id}.pdf`
  );

  await renderToFile(
    React.createElement(AvisDeVirementDocument, {
      payout,
      enterprise,
    }),
    filePath
  );

  return filePath;
}

module.exports = { generateAvisDeVirementPDF };
