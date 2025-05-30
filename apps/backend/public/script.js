// window.addEventListener("DOMContentLoaded", async () => {
//     const mapEl = document.querySelector("gmp-map-3d"); // conteneur de la carte

//     console.log("Jesuis otm");
//     const baseUrl = window.location.origin;

//     console.log("Appel de l’API vers :", `${window.location.origin}/api/qr-placements`);

//     const response = await fetch(`${baseUrl}/api/qr-placements`);

//     const qrCodes = await response.json();

//     console.log("youpi");
//     console.log(qrCodes);


//     qrCodes.forEach((qr, index) => {
//       if(qr.latitude & qr.longitude){

//         const marker = document.createElement("gmp-marker-3d-interactive");
    
        
//         marker.setAttribute("position", `${qr.latitude},${qr.longitude}`);
//         marker.setAttribute("label", qr.position_description);
    
//         marker.setAttribute("altitude-mode", "relative-to-mesh");
//         marker.setAttribute("collision-behavior", "required");
    
      
//         marker.setAttribute("draws-when-occluded", "");
        
        
      
//         marker.setAttribute("extruded", "");
        
      
//         marker.setAttribute("size-preserved", "");
        
              
//         marker.setAttribute("z-index", index.toString());
    
//         // Interaction utilisateur : clic
//         marker.addEventListener("gmp-click", () => {
//           alert(`📍 Vous avez cliqué sur : ${qr.position_description}`);
//         });
    
//         mapEl.appendChild(marker);
//       }
//     });
//   });
  