window.addEventListener("DOMContentLoaded", async () => {
    const mapEl = document.querySelector("gmp-map-3d"); // conteneur de la carte
  
    const qrCodes = [
      {
        label: "QR Code 1",
        position: { lat: 43.7057, lng: 7.2718 },
        altitudeMode: "relative-to-mesh",
        collisionBehavior: "required",
        drawsWhenOccluded: true,
        extruded: true,
        sizePreserved: true,
        zIndex: 10
      },
      {
        label: "QR Code 2",
        position: { lat: 43.6865, lng: 7.2695 },
        altitudeMode: "relative-to-mesh",
        collisionBehavior: "required",
        drawsWhenOccluded: true,
        extruded: true,
        sizePreserved: true,
        zIndex: 5
      },
      {
        label: "QR Code 3",
        position: { lat: 43.6945, lng: 7.2730 },
        altitudeMode: "relative-to-mesh",
        collisionBehavior: "required",
        drawsWhenOccluded: true,
        extruded: true,
        sizePreserved: true,
        zIndex: 7
      },
    ];
  
    qrCodes.forEach((qr) => {
      const marker = document.createElement("gmp-marker-3d-interactive");
  
      marker.setAttribute("position", `${qr.position.lat},${qr.position.lng}`);
      marker.setAttribute("label", qr.label);
  
      marker.setAttribute("altitude-mode", qr.altitudeMode);
      marker.setAttribute("collision-behavior", qr.collisionBehavior);
  
      if (qr.drawsWhenOccluded) {
        marker.setAttribute("draws-when-occluded", "");
      }
      
      if (qr.extruded) {
        marker.setAttribute("extruded", "");
      }
      if (qr.sizePreserved) {
        marker.setAttribute("size-preserved", "");
      }
            
      marker.setAttribute("z-index", qr.zIndex.toString());
  
      // Interaction utilisateur : clic
      marker.addEventListener("gmp-click", () => {
        alert(`📍 Vous avez cliqué sur : ${qr.label}`);
      });
  
      mapEl.appendChild(marker);
    });
  });
  