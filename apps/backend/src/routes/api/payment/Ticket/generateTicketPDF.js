const path = require("path");
const fs = require("fs");
const React = require("react");
const { renderToFile } = require("@react-pdf/renderer");
const TicketDocument = require("./TicketDocument");

async function generateTicketPDF(reservation) {
  const outputDir = path.join(__dirname, "pdf_tmp");
  await fs.promises.mkdir(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `ticket_${reservation.reservation_id}.pdf`);
  await renderToFile(
    React.createElement(TicketDocument, { reservation }),
    filePath
  );
  return filePath;
}

module.exports = { generateTicketPDF };
