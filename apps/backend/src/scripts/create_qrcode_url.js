const QRCode = require('qrcode');

function generateQRCode(url, filename = 'qrcode.png') {
  QRCode.toFile(filename, url, {
    color: {
      dark: '#000000',  // Couleur du QR code
      light: '#ffffff'  // Couleur de fond
    }
  }, function (err) {
    if (err) throw err;
    console.log(`✅ QR code généré : ${filename}`);
  });
}

generateQRCode("https://viarte.eu/offer-page/5576bba5-c3d4-4ea7-b84f-d375e1d1e74f?presentoir_offer_id=2&from_qr=1", "./src/scripts/QRcodeAvion.png");
