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

generateQRCode("https://codepen.io/tom-payan", "./src/scripts/codepen.png");
