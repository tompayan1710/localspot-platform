// src/components/Map2D/Map2D.jsx
import React, { memo, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import './Map2D.css'

function Map2D({
  apiKey,
  center = { lat: 43.7002, lng: 7.2620 },
  zoom = 13,
  containerStyle = { width: "100%", height:  "100%" },
  markers = [],                 // [{ id, latitude, longitude, position_description, ... }]
  onMarkerClick = () => {},     // callback quand on clique sur un marker
  borderRadius = 40,
}) {












  const mapRef = useRef(null);
  const [position, setPosition] = useState({
      lat: 43.7002, 
      lng: 7.2620
  });

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }





  

  // → Log clair pour chaque changement de markers
  useEffect(() => {
    console.log("Map2D: markers prop =", markers);
  }, [markers]);

// src/components/Map2D/Map2D.jsx (mapOptions uniquement)
const mapOptions = {
  disableDefaultUI: true,
  styles: [
    // Fond très clair
    { elementType: "geometry", stylers: [{ color: "#f7f7f7" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#6E6E6E" }] },

    // Eau en bleu pastel
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#92CAFF" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#4a6fa5" }],
    },

    // Parcs et végétation en vert un peu plus soutenu
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#b5d8a2" }],  // légèrement plus foncé
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3e653e" }],
    },

    // Cacher tous les autres points d’intérêt (commerces, restos…)
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.business",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.attraction",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.government",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.medical",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.school",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },

    // Routes principales en blanc, contours gris clair
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffeaa7" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7f5900" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },

    // Bâtiments et parcelles en gris très clair
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.fill",
      stylers: [{ color: "#ececec" }],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [{ color: "#e9e9e9" }],
    },

    // Transit discret
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e2e2e2" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#f0f0f0" }],
    },
  ],
};


  return (
    <LoadScript googleMapsApiKey={apiKey}   
    loadingElement={<div className="skeleton" style={{ width: "100%", height: "100%" }}></div>}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: borderRadius,
        overflow: 'hidden',
      }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position} // ton point de départ
        options={mapOptions} 
        // onLoad={(map) => (mapRef.current = map)}


        zoom={13}
      onLoad={handleLoad}
      onDragEnd={handleCenter}
      // center={position}
      id="map"

      >
        {markers.map((m) => {
          // ignore si pas de coords
          if (m.latitude == null || m.longitude == null) return null;
          return (
            <Marker
              key={m.id}
              position={{ lat: m.latitude, lng: m.longitude }}
              title={m.position_description}
              onClick={() =>{
                const position = { lat: m.latitude, lng: m.longitude };
                setTimeout(() => {
                  mapRef.current?.panTo(position);
                  mapRef.current?.setZoom(15);
                }, 100); // petit délai pour attendre le render du reste
                onMarkerClick(m);
              }}
            />
          );
        })}
      </GoogleMap>
      </div>
    </LoadScript>
  );

}

export default Map2D;
