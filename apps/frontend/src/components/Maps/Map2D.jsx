// src/components/Map2D/Map2D.jsx
import React, { memo, useEffect, useRef } from "react";
import { GoogleMap, Marker,  DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useState } from "react";
import HotelIcon from "../../assets/images/HotelIcon.png";


import './Map2D.css'

function Map2D({
  apiKey,
  center = { lat: 43.7002, lng: 7.2620 },
  destination = null,
  zoom = 13,
  containerStyle = { width: "100%", height:  "100%" },
  markers = [],                 // [{ id, latitude, longitude, position_description, ... }]
  onMarkerClick = () => {},     // callback quand on clique sur un marker
  borderRadius = 40,
}) {












  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);


  
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom]);

  const handleLoad = (map) => {
    mapRef.current = map;
  };



  
  useEffect(() => {
    if (center && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: center,
          destination: destination,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Erreur DirectionsService :", result);
          }
        }
      );
    }
  }, [center, destination]);


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

      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: borderRadius,
        overflow: 'hidden',
      }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={handleLoad}
        options={mapOptions} 
        // onLoad={(map) => (mapRef.current = map)}


      //onDragEnd={handleCenter}
      // center={position}
      id="map"

      >

        {directions && (
          <>
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#ff4d4d",
                  strokeWeight: 5,
                },
              }}
            />


              <Marker
                position={center}
                title="Activité"
                icon={{
                  url: HotelIcon,
                  scaledSize: new window.google.maps.Size(48, 48),
                  anchor: new window.google.maps.Point(24, 48),
                }}
              />
            {/* <Marker
              position={center}
              label={{
                text: "H",
                color: "#fff",         // ✅ couleur du texte
                fontSize: "16px",      // ✅ taille du texte
                fontWeight: "bold",    // ✅ épaisseur du texte
                fontFamily: "Arial",   // ✅ police (standard uniquement)
              }}
            /> */}

            {
              center.lat == destination.lat && center.lng == destination.lng ?
              <></>
              :
              <Marker
                position={destination} // activité
                label={{
                  text: "★",
                  color: "#fff",         // ✅ couleur du texte
                  fontSize: "16px",      // ✅ taille du texte
                  fontWeight: "bold",    // ✅ épaisseur du texte
                  fontFamily: "Arial",   // ✅ police (standard uniquement)
                }}
                title="Activité"
              />

            }
          </>
        )}




        {markers.map((m) => {
          // ignore si pas de coords
          if (!m.latitude || !m.longitude) return null;
          return (
            <Marker
              key={m.id}
              position={{ lat: m.latitude, lng: m.longitude }}
              title={m.position_description}
              onClick={() =>{
                // const position = { lat: m.latitude, lng: m.longitude };
                // setTimeout(() => {
                //   mapRef.current?.panTo(position);
                //   mapRef.current?.setZoom(15);
                // }, 100); // petit délai pour attendre le render du reste
                onMarkerClick(m);
              }}
            />
          );
        })}
      </GoogleMap>
      </div>
  );

}

export default memo(Map2D);
