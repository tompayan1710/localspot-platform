const path = require("path");
const fs = require("fs");
const React = require("react");
const { renderToFile } = require("@react-pdf/renderer");
const AvisDeVirementDocument = require("./AvisDeVirementDocument");

async function generateAvisDeVirementPDF(reservation) {
  const outputDir = path.join(__dirname, "pdf_tmp");
  await fs.promises.mkdir(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `avies_virement_${reservation.reservation_id}.pdf`);
  await renderToFile(
    React.createElement(AvisDeVirementDocument, { reservation }),
    filePath
  );
  return filePath;
}

module.exports = { generateAvisDeVirementPDF };
