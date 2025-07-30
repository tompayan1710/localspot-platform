// src/components/Map2D/Map2D.jsx
import { memo, useEffect, useRef } from "react";
import { GoogleMap, Marker,  DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";
import Map2DPoint from "../../assets/images/Map2DPoint.png";
import Map2DPin from "../../assets/images/Map2DPin.png";
import MapLabel from "./MapLabel";

import './Map2D.css'

function Map2D({
  apiKey,
  center = { lat: 43.7002, lng: 7.2620 },
  destination = null,
  zoom = 10,
  containerStyle = { width: "100%", height:  "100%" },
  markers = [],                 // [{ id, latitude, longitude, position_description, ... }]
  onMarkerClick = () => {},     // callback quand on clique sur un marker
  borderRadius = 40,
  adresseTexte,
  hotes=[],
  duration
}) {


  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [allDirections, setAllDirections] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);


 /* 
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom]);*/

  const handleLoad = (map) => {
    mapRef.current = map; 
    setMapLoaded(true);
  };



  
  useEffect(() => {
    if (center && destination) {
      if (
        destination &&
        (center.lat === destination.lat && center.lng === destination.lng)
      ) {
        return;
      }

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

            const bounds = new window.google.maps.LatLngBounds();
            const route = result.routes[0];

            if (route && route.overview_path) {
              route.overview_path.forEach(point => {
                bounds.extend(point);
              });
              mapRef.current.fitBounds(bounds); // ← c’est lui qui fait tout

              // ➕ Zoomer un peu plus après le fitBounds
              const listener = window.google.maps.event.addListenerOnce(mapRef.current, "bounds_changed", () => {
              const currentZoom = mapRef.current.getZoom();
              if (currentZoom) {
                // mapRef.current.setZoom(currentZoom + 0.4); // ← Zoom un peu plus
              }
            });
            }
          } else {
            console.error("Erreur DirectionsService :", result);

            if (mapRef.current) {
              mapRef.current.panTo(center);
              mapRef.current.setZoom(zoom);
            }
          }
        }
      );
    }
  }, [center, destination, zoom]);


  // === TRAJETS MULTIPLES SI PAS DE DESTINATION ===
  useEffect(() => {
    if (!center || destination || !Array.isArray(hotes) || hotes.length === 0) return;

    const directionsService = new window.google.maps.DirectionsService();

    const promises = hotes.map((hote) => {
      if (
        !hote || 
        typeof hote.latitude !== "number" || 
        typeof hote.longitude !== "number"
      ) {
        return Promise.resolve(null);
      }


      console.log(hote)
      return new Promise((resolve) => {
        directionsService.route(
          {
            origin: { lat: hote.latitude, lng: hote.longitude },
            destination: center,
            travelMode: "DRIVING",
          },
          (result, status) => {
            if (status === "OK") {
              resolve(result);
            } else {
              console.warn("Erreur route hote :", hote.id, status);
              resolve(null);
            }
          }
        );
      });
    });

    Promise.all(promises).then((results) => {
      const valid = results.filter((r) => r !== null);
      setAllDirections(valid);
    });
  }, [mapLoaded, center, hotes, destination]);


  // Auto-fit la carte pour englober tous les hotes et le center, si pas de destination unique
useEffect(() => {
  if (!mapRef.current || !center || hotes.length === 0 || destination) return;

  const bounds = new window.google.maps.LatLngBounds();

  // Inclure le center
  bounds.extend(center);

  // Ajouter chaque hôte si coordonnées valides
  hotes.forEach((hote) => {
    if (hote.latitude && hote.longitude) {
      bounds.extend({ lat: hote.latitude, lng: hote.longitude });
    }
  });

  // Adapter la carte aux limites calculées
  mapRef.current.fitBounds(bounds);

  // Optionnel : limiter le zoom s’il est trop proche
  const listener = window.google.maps.event.addListenerOnce(mapRef.current, "bounds_changed", () => {
    const currentZoom = mapRef.current.getZoom();
    if (currentZoom > 17) {
      mapRef.current.setZoom(17); // limite max du zoom
    }
  });

}, [mapLoaded, center, hotes, destination]);


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

console.log("Directions générées :", allDirections);

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

        <Marker
          position={center}
          title="Activité"
          icon={{
            url: Map2DPin,
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15,27),
          }}
        />
        {directions && (
          <>
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor: "#373737",
                  strokeWeight: 3,
                },
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
              center.lat === destination.lat && center.lng === destination.lng ?
              <></>
              :
              <Marker
                position={destination} // activité
                 icon={{
                    url: Map2DPoint,
                    scaledSize: new window.google.maps.Size(30, 30),
                    anchor: new window.google.maps.Point(15,15),
                  }}
                title="Hotel"
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

        {
          hotes.length>0 ?
          allDirections.map((dir, i) => (
            <DirectionsRenderer
              key={i}
              directions={dir}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor: "#000000",
                  strokeWeight: 3,
                },
              }}
            />
          )) : <></>
        }
        
        
      </GoogleMap> 
      {mapRef.current && destination && (
        <>
          <MapLabel map={mapRef.current} position={destination}>
            <div className="MapHotelContainer">
              <p className="t32">my </p>
              <p className="t4">Hotel</p>
            </div>
          </MapLabel>
          {/* <MapLabel map={mapRef.current} position={center}>
            <div className="MapAdresseContainer">
              <div>
                <p className="t4">{duration[0]}</p>
                <p className="t6">{duration[1]}</p>
              </div>
              <p className="t6">{adresseTexte}</p>
            </div>
          </MapLabel> */}
        </>
      )}

      { adresseTexte ?
        <MapLabel map={mapRef.current} position={center}>
          <div className="MapAdresseContainer">
            <div>
              <p className="t4">{duration ? duration[0] : ""}</p>
              <p className="t6">{duration ? duration[1] : ""}</p>
            </div>
            <p className="t6">{adresseTexte}</p>
          </div>
        </MapLabel>
        : <></>
      }


      {mapRef.current && hotes.length>0 ? (
        <>
          {/* <MapLabel map={mapRef.current} position={center} index={1000}>
            <div className="MapAdresseContainer my-annonces">
              <div>
                <p className="t4"></p>
                <p className="t6"></p>
              </div>
              <p className="t6">My Annonce</p>
            </div>
          </MapLabel> */}
          {
            hotes.map((hote) => {
              const destination = { lat: hote.latitude, lng: hote.longitude };
              return (
                <MapLabel key={hote.name} map={mapRef.current} position={destination} index={10}>
                  <div className="MapHotelInfoContainer">
                    <div className="ContainerImage">
                      {
                        hote.img ? <img src={hote.img}/>
                        : <></>
                      }
                      
                    </div>
                    <div className="info">
                      <p className="t6">{hote.name}</p>
                    </div>
                  </div>
                </MapLabel>
              )
            })
          }

        </>
      ) : <></>}  
      

{/* 
{mapRef.current && hotes.length>0 ? 
            hotes.map((hote) => {
              const destination = { lat: hote.latitude, lng: hote.longitude };
              return (
                <>
          <MapLabel key={hote.name} map={mapRef.current} position={destination}>
                  <div className="MapHotelInfoContainer">
                    <div className="ContainerImage">
                      {
                        hote.img ? <img src={hote.img}/>
                        : <></>
                      }
                      
                    </div>
                    <div className="info">
                      <p className="t6">{hote.name}</p>
                    </div>
                  </div>
                </MapLabel>
        </>
              )
            }

      ) : <></>}  */}


      </div>
  );

}

export default memo(Map2D);





