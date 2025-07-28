const React = require("react");
const { renderToFile } = require("@react-pdf/renderer");
const TicketDocument = require("./TicketDocument");
const path = require("path");

async function generateTicketPDF(reservation) {
  const filePath = path.join(__dirname, `ticket_${reservation.reservation_id}.pdf`);
  await renderToFile(
    React.createElement(TicketDocument, { reservation }),
    filePath
  );
  return filePath;
}

module.exports = { generateTicketPDF };
