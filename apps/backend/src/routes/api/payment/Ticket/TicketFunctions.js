const puppeteer = require("puppeteer");
const path = require("path");

async function generateTicketPDF(reservation) {
    console.log("✅GENERATE PDF : reservation : ")
    console.log(reservation);
    const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
  const page = await browser.newPage();
  // Ton HTML dynamique
  const html = `
    <html>
      <head>
        <style>


:root{
  --vh: 100%
}
html, body, #root{
  scrollbar-width: none;         /* Firefox */
  -ms-overflow-style: none;      /* IE */
  height: var(--vh);
  margin: 0;
}
html, body {
  height: 100%;
  overscroll-behavior: contain; 
}


body::-webkit-scrollbar {
  display: none;                 /* Chrome/Safari */
}




*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



body{
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
} 

:root{
  --blacknormal: #3A4150;
  --greydark: #4E5562;
  --greymiddledark: #acadb2;
  --greysemidark: #e1e1e2;
  --greylight: #F3F4F6;
  --greyverylight: #FBFBFB;
  --bluelight: #F1F6FE;
  --bluenormal: #5D82EE;
  --redlight: #FFD2D2;
  --rednormal: #ED332A;
  --violetlight: #F3EDFE;
  --violetnormal: #9C5DEE;
  --greenlight: #DFF0D8;
  --greennormal: #50b849;
  --greenflash: #1fd112;
  --yellownormal: #FFD85C;
  --yellowlight: #FFF4C1;
  --beigelight: #ecead94b;
  --beigeverylight: #FCF9F4;

  /* --lineargradientblack: linear-gradient(180deg, #535353, #373737); */
  --lineargradientblack: linear-gradient(180deg, rgb(83, 83, 83), rgb(55, 55, 55));
  --lineargradientblackRight: linear-gradient(to right, rgb(83, 83, 83), rgb(55, 55, 55));
  --lineargradientgreen: linear-gradient(to bottom, #c4f5c1, #7de276);
  --lineargradientgreenRight: linear-gradient(to right, #b5edb1, var(--greennormal));
  --lineargradientred: linear-gradient(180deg, #fcb3b3, var(--rednormal));
  --lineargradienyellow: linear-gradient(180deg, #f0fcb3, var(--yellownormal));
  --maxsize: 500px;
}


p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--greydark);
}

.t1{ font-size: 3rem; }
.t2{ font-size: 2rem; }
.t3{ font-size: 1.5rem; }
.t32{ font-size: 1.2rem; }
.t4{ font-size: 1rem; }
.t5{ font-size: 0.825rem; }
.t6{ font-size: 0.7rem; }

.bold{
  font-weight: bold;
}


.row{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.maxLine {
  display: -webkit-box;
  -webkit-line-clamp: 2;   /* Nombre de lignes max */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.maxLine1{
  -webkit-line-clamp: 1;
}



.column{
  display: flex;
  flex-direction: column;
}


.FactureContainer{
    width: 92%;
    margin: 0 auto;
    max-width: 350px;
    padding-bottom: 20px;
}
.FactureContainer .LogoHead{
    height: 80px;
    width: 100%;
    justify-content: space-between;
    padding: 0 40px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #535353;
    border: 1px solid #e1e1e2;
    border-bottom: none;
}

.FactureContainer .LogoHead>img{
    height: 50px;
    width: 50px;
}
.FactureContainer .LogoHead>p{
    color: white;
}

.FactureBody{
    position: relative;
    box-shadow: inset 0px 0px 0 1px #e1e1e2;

    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-bottom: 20px:
}
.FactureBody>.ThanksFull{
    width: 88%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px
}
.FactureBody>.ThanksFull>img{
    width: 30%;
    min-width: 50px;
    aspect-ratio: 1;
    margin-bottom: 10px;
}
.FactureBody>.ThanksFull>p{
    text-align: center;
}


.FactureBody>.hline88{
    margin-top: 10px;
}

.FactureBody>p{
    padding: 0 20px;
}
.FactureBody>.row{
    justify-content: space-between;
    align-items: start;
    padding: 0 20px;
    gap: 20px;
}
.FactureBody>.row>p:last-of-type{
    text-align: end;
}
.FactureBody>.SeparateLine{
    padding: 0;
    margin: 10px 0;
}
.FactureBody>.SeparateLine .hlinedashed{
    width: 70%;
}

.FactureBody>.CodeBarContainer{
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
}
.FactureBody>.CodeBarContainer>img{
    width: 70%;
    max-width: 250px;
}
.EndPaper{
    /* background-color: red; */
    padding: 0 10px;
    justify-content: space-between;
}
.half-sphere {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transform: translateY(60%);
    border: 1px solid #e1e1e2;
    position: relative;
    display: flex;
    flex-direction: row;
}
.half-sphere.left{
    transform: translateX(-60%);
}
.half-sphere.right{
    transform: translateX(60%);
}

.hlinedashed {
    height: 1px;
    border-bottom: 1px dashed #e1e1e2;
    border-image: repeating-linear-gradient(to right, #e1e1e2 0, #e1e1e2 5px, transparent 5px, transparent 10px);
    border-image-slice: 1;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 88%;
}

        </style>
      </head>
      <body>
            <div class="FactureContainer">
                <div class="LogoHead row" style="background-color: #535353;">
                    <img src="${process.env.FRONTEND_URL}/images/ViarteV.png" alt="Viarte Logo"/>
                    <p class="t6">${reservation.date}</p>
                </div>
                <div class="FactureBody">
                    <div class="ThanksFull">
                        <p class="t32 bold">Thank you !</p>
                        <p class="t6">Your ticker has been issued<br></br>successfully</p>
                    </div>
                    <div class="hlinedashed"></div>
                    <p class="t5 bold">Transaction details</p>
                    <div class="row">
                        <p class="t6">Réservation</p>
                        <p class="t6">#RES-${reservation.reservation_id}</p>
                    </div>
                    <div class="row">
                        <p class="t6">Activité</p>
                        <p class="t6">${reservation.title}</p>
                    </div>
                    <div class="row">
                        <p class="t6">Départ</p>
                        <p class="t6">${reservation.date} à ${reservation.start_hour}</p>
                    </div>
                    <div class="row">
                        <p class="t6">Adresse</p>
                        <p class="t6">${reservation.adresse}</p>
                    </div>
                    <div class="hlinedashed"></div>
                    <div class="row">
                        <p class="t6">Client</p>
                        <p class="t6">${reservation.name || "non renseigné"}</p>
                    </div>
                    <div class="row">
                        <p class="t6">Email</p>
                        <p class="t6">${reservation.email || "non renseigné"}</p>
                    </div>
                    <div class="row">
                        <p class="t6">Téléphone</p>
                        <p class="t6">${reservation.phone || "non renseigné"}</p>
                    </div>
                    <div class="hlinedashed"></div>
                    <div class="row">
                        <p class="t6">Paiement</p>
                        <p class="t6">Carte Visa ****1234</p>
                    </div>
                    <div class="row">
                        <p class="t6">Status de payement</p>
                        <p class="t6">${reservation.reservation_status}</p>
                    </div>

                    <div class="hlinedashed"></div>
                    <div class="row">
                        <p class="t6">×${reservation.nb_adult}&nbsp;&nbsp;&nbsp;adult</p>
                        <p class="t6">${reservation.nb_adult * reservation.price_per_person}€</p>
                    </div>
                    ${
                        reservation.nb_reduced > 0 &&
                        `
                        <div class="row">
                            <p class="t6">×${reservation.nb_reduced}&nbsp;&nbsp;&nbsp;reduced</p>
                            <p class="t6">${reservation.nb_reduced * reservation.price_per_person}€</p>
                        </div>
                        `
                    }
                    <div class="hlinedashed"></div>
                    <div class="row">
                        <p class="t32">TOTAL</p>
                        <p class="t32">${reservation.total_price}€</p>
                    </div>
                    <p class="t6">(toutes taxes comprises)</p>

                    <div class="row SeparateLine">
                        <div class="half-sphere left"></div>
                        <div class="hlinedashed"></div>
                        <div class="half-sphere right"></div>
                    </div>
                    <div class="CodeBarContainer">
                        <img src="${process.env.FRONTEND_URL}/images/CodeBar.png" alt="Code Bar"/>
                    </div>
                </div>
            </div>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });

  const filePath = path.join(__dirname, `Viarte_Reservation_${reservation.reservation_id}_2025-07-26.pdf`);
  await page.pdf({ path: filePath, format: "A4", printBackground: true });
  await browser.close();
  return filePath;
}


module.exports = { generateTicketPDF };
