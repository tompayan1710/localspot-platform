// // src/components/Map2D/Map2D.jsx
// import { memo, useEffect, useRef } from "react";
// import { GoogleMap, Marker,  DirectionsRenderer } from "@react-google-maps/api";
// import { useState } from "react";
// import Map2DPoint from "../../assets/images/Map2DPoint.png";
// import Map2DPin from "../../assets/images/Map2DPin.png";
// import MapLabel from "./MapLabel";


// import './Map2D.css'

// function Map2D({
//   apiKey,
//   center = { lat: 43.7002, lng: 7.2620 },
//   destination = null,
//   zoom = 10,
//   containerStyle = { width: "100%", height:  "100%" },
//   markers = [],                 // [{ id, latitude, longitude, position_description, ... }]
//   onMarkerClick = () => {},     // callback quand on clique sur un marker
//   borderRadius = 40,
//   adresseTexte,
//   hotes=[],
//   duration,
//   onMapClick,
//   cursor
// }) {


//   const mapRef = useRef(null);
//   const [directions, setDirections] = useState(null);
//   const [allDirections, setAllDirections] = useState([]);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [mapReady, setMapReady] = useState(false);

//   const isApiReady = !!window.google?.maps && mapRef.current && mapReady;

//   function handleLoad(map) {
//     mapRef.current = map;
//     setMapReady(true);
//   }

//  /* 
//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.panTo(center);
//       mapRef.current.setZoom(zoom);
//     }
//   }, [center, zoom]);*/




  
//   useEffect(() => {
//     if(!isApiReady) return;
//     if (center && destination) {
//       if (
//         destination &&
//         (center.lat === destination.lat && center.lng === destination.lng)
//       ) {
//         return;
//       }

//       const directionsService = new window.google.maps.DirectionsService();
      
//       directionsService.route(
//         {
//           origin: center,
//           destination: destination,
//           travelMode: "DRIVING",
//         },
//         (result, status) => {
//           if (status === "OK") {
//             setDirections(result);

//             const bounds = new window.google.maps.LatLngBounds();
//             const route = result.routes[0];

//             if (route && route.overview_path) {
//               route.overview_path.forEach(point => {
//                 bounds.extend(point);
//               });
//               mapRef.current.fitBounds(bounds); // ← c’est lui qui fait tout

//               // ➕ Zoomer un peu plus après le fitBounds
//               const listener = window.google.maps.event.addListenerOnce(mapRef.current, "bounds_changed", () => {
//               const currentZoom = mapRef.current.getZoom();
//               if (currentZoom) {
//                 // mapRef.current.setZoom(currentZoom + 0.4); // ← Zoom un peu plus
//               }
//             });
//             }
//           } else {
//             console.error("Erreur DirectionsService :", result);

//             if (mapRef.current) {
//               mapRef.current.panTo(center);
//               mapRef.current.setZoom(zoom);
//             }
//           }
//         }
//       );
//     }
//   }, [isApiReady, center, destination, zoom]);


//   // === TRAJETS MULTIPLES SI PAS DE DESTINATION ===
//   useEffect(() => {
//     if (!isApiReady) return;
//     if (!center || destination || !Array.isArray(hotes) || hotes.length === 0) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     const promises = hotes.map((hote) => {
//       if (
//         !hote || 
//         typeof hote.latitude !== "number" || 
//         typeof hote.longitude !== "number"
//       ) {
//         return Promise.resolve(null);
//       }


//       console.log(hote)
//       return new Promise((resolve) => {
//         directionsService.route(
//           {
//             origin: { lat: hote.latitude, lng: hote.longitude },
//             destination: center,
//             travelMode: "DRIVING",
//           },
//           (result, status) => {
//             if (status === "OK") {
//               resolve(result);
//             } else {
//               console.warn("Erreur route hote :", hote.id, status);
//               resolve(null);
//             }
//           }
//         );
//       });
//     });

//     Promise.all(promises).then((results) => {
//       const valid = results.filter((r) => r !== null);
//       setAllDirections(valid);
//     });
//   }, [isApiReady, mapLoaded, center, hotes, destination]);


//   // Auto-fit la carte pour englober tous les hotes et le center, si pas de destination unique
// useEffect(() => {
//   if(!isApiReady) return;
//   if (!mapRef.current || !center || hotes.length === 0 || destination) return;

//   const bounds = new window.google.maps.LatLngBounds();

//   // Inclure le center
//   bounds.extend(center);

//   // Ajouter chaque hôte si coordonnées valides
//   hotes.forEach((hote) => {
//     if (hote.latitude && hote.longitude) {
//       bounds.extend({ lat: hote.latitude, lng: hote.longitude });
//     }
//   });

//   // Adapter la carte aux limites calculées
//   mapRef.current.fitBounds(bounds);

//   // Optionnel : limiter le zoom s’il est trop proche
//   const listener = window.google.maps.event.addListenerOnce(mapRef.current, "bounds_changed", () => {
//     const currentZoom = mapRef.current.getZoom();
//     if (currentZoom > 17) {
//       mapRef.current.setZoom(17); // limite max du zoom
//     }
//   });

// }, [isApiReady, mapLoaded, center, hotes, destination]);


// // src/components/Map2D/Map2D.jsx (mapOptions uniquement)
// // const mapOptions = {
// //   disableDefaultUI: true,
// //   styles: [
// //     // Fond très clair
// //     { elementType: "geometry", stylers: [{ color: "#f7f7f7" }] },
// //     { elementType: "labels.text.fill", stylers: [{ color: "#6E6E6E" }] },

// //     // Eau en bleu pastel
// //     {
// //       featureType: "water",
// //       elementType: "geometry",
// //       stylers: [{ color: "#92CAFF" }],
// //     },
// //     {
// //       featureType: "water",
// //       elementType: "labels.text.fill",
// //       stylers: [{ color: "#4a6fa5" }],
// //     },

// //     // Parcs et végétation en vert un peu plus soutenu
// //     {
// //       featureType: "poi.park",
// //       elementType: "geometry.fill",
// //       stylers: [{ color: "#b5d8a2" }],  // légèrement plus foncé
// //     },
// //     {
// //       featureType: "poi.park",
// //       elementType: "labels.text.fill",
// //       stylers: [{ color: "#3e653e" }],
// //     },

// //     // Cacher tous les autres points d’intérêt (commerces, restos…)
// //     {
// //       featureType: "poi",
// //       elementType: "labels.icon",
// //       stylers: [{ visibility: "off" }],
// //     },
// //     {
// //       featureType: "poi.business",
// //       elementType: "all",
// //       stylers: [{ visibility: "off" }],
// //     },
// //     {
// //       featureType: "poi.attraction",
// //       elementType: "all",
// //       stylers: [{ visibility: "off" }],
// //     },
// //     {
// //       featureType: "poi.government",
// //       elementType: "all",
// //       stylers: [{ visibility: "off" }],
// //     },
// //     {
// //       featureType: "poi.medical",
// //       elementType: "all",
// //       stylers: [{ visibility: "off" }],
// //     },
// //     {
// //       featureType: "poi.school",
// //       elementType: "all",
// //       stylers: [{ visibility: "off" }],
// //     },

// //     // Routes principales en blanc, contours gris clair
// //     {
// //       featureType: "road",
// //       elementType: "geometry",
// //       stylers: [{ color: "#ffffff" }],
// //     },
// //     {
// //       featureType: "road",
// //       elementType: "geometry.stroke",
// //       stylers: [{ color: "#e5e5e5" }],
// //     },
// //     {
// //       featureType: "road.highway",
// //       elementType: "geometry.fill",
// //       stylers: [{ color: "#ffeaa7" }],
// //     },
// //     {
// //       featureType: "road.highway",
// //       elementType: "labels.text.fill",
// //       stylers: [{ color: "#7f5900" }],
// //     },
// //     {
// //       featureType: "road.local",
// //       elementType: "labels.text.fill",
// //       stylers: [{ color: "#9e9e9e" }],
// //     },

// //     // Bâtiments et parcelles en gris très clair
// //     {
// //       featureType: "administrative.land_parcel",
// //       elementType: "geometry.fill",
// //       stylers: [{ color: "#ececec" }],
// //     },
// //     {
// //       featureType: "landscape.man_made",
// //       elementType: "geometry.fill",
// //       stylers: [{ color: "#e9e9e9" }],
// //     },

// //     // Transit discret
// //     {
// //       featureType: "transit.line",
// //       elementType: "geometry",
// //       stylers: [{ color: "#e2e2e2" }],
// //     },
// //     {
// //       featureType: "transit.station",
// //       elementType: "geometry",
// //       stylers: [{ color: "#f0f0f0" }],
// //     },
// //   ],
// // };
// const mapOptions = {
//   disableDefaultUI: true,
//   gestureHandling: "greedy",
//   backgroundColor: "#FFFFFF",
//   styles: [
//     // Fond clair et neutre
//     { elementType: "geometry", stylers: [{ color: "#f8f8f8" }] },
//     { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//     { elementType: "labels.text.fill", stylers: [{ color: "#2E3A43" }] },
//     { elementType: "labels.text.stroke", stylers: [{ color: "#FFFFFF" }, { weight: 2 }] },

//     // Eau – bleu élégant et doux
//     { featureType: "water", elementType: "geometry",
//       stylers: [{ color: "#A4D4FF" }] },

//     // Végétation – vert frais mais pas criard
//     { featureType: "landscape.natural", elementType: "geometry.fill",
//       stylers: [{ color: "#CDE8B2" }] },
//     { featureType: "poi.park", elementType: "geometry.fill",
//       stylers: [{ color: "#B5E3A1" }] },

//     // Zones construites – gris clair pour contraste
//     { featureType: "landscape.man_made", elementType: "geometry",
//       stylers: [{ color: "#E5E5E5" }] },

//     // Routes principales
//     { featureType: "road", elementType: "geometry",
//       stylers: [{ color: "#FFFFFF" }] },
//     { featureType: "road", elementType: "geometry.stroke",
//       stylers: [{ color: "#D6D6D6" }] },

//     // Routes secondaires – petit ton pastel pour plus de vie
//     { featureType: "road.arterial", elementType: "geometry",
//       stylers: [{ color: "#FFF6CC" }] },  
//     { featureType: "road.highway", elementType: "geometry",
//       stylers: [{ color: "#FFE1A6" }] },  
//     { featureType: "road.local", elementType: "labels.text.fill",
//       stylers: [{ color: "#6E6E6E" }] },

//     // Supprimer POI inutiles
//     { featureType: "poi.business", stylers: [{ visibility: "off" }] },
//     { featureType: "poi.medical",  stylers: [{ visibility: "off" }] },
//     { featureType: "poi.school",   stylers: [{ visibility: "off" }] },

//     // Transport en gris clair
//     { featureType: "transit.line", elementType: "geometry",
//       stylers: [{ color: "#E2E6EB" }] }
//   ],
// };




// console.log("Directions générées :", allDirections);


//   return (

//       <div style={{
//         width: '100%',
//         height: '100%',
//         borderRadius: borderRadius,
//         overflow: 'hidden',
//       }}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={zoom}
//         onLoad={handleLoad}
//         options={mapOptions} 
//         // onLoad={(map) => (mapRef.current = map)}
//         onClick={(e) => {
//           if (!onMapClick) return;
//           const lat = e.latLng?.lat();
//           const lng = e.latLng?.lng();
//           if (typeof lat === "number" && typeof lng === "number") {
//             onMapClick({ lat, lng });
//           }
//         }}

//       //onDragEnd={handleCenter}
//       // center={position}
//       id="map"

//       >

//         {
//           isApiReady ?
//           <>
//           <Marker
//           position={center}
//           title="Activité"
//           icon={{
//             url: Map2DPin,
//             scaledSize: new window.google.maps.Size(30, 30),
//             anchor: new window.google.maps.Point(15,27),
//           }}
//         />
//         {directions && (
//           <>
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 suppressMarkers: true,
//                 preserveViewport: true,
//                 polylineOptions: {
//                   strokeColor: "#373737",
//                   strokeWeight: 3,
//                 },
//               }}
//             />

//             {/* <Marker
//               position={center}
//               label={{
//                 text: "H",
//                 color: "#fff",         // ✅ couleur du texte
//                 fontSize: "16px",      // ✅ taille du texte
//                 fontWeight: "bold",    // ✅ épaisseur du texte
//                 fontFamily: "Arial",   // ✅ police (standard uniquement)
//               }}
//             /> */}

//             {
//               center.lat === destination.lat && center.lng === destination.lng ?
//               <></>
//               :
//               <Marker
//                 position={destination} // activité
//                  icon={{
//                     url: Map2DPoint,
//                     scaledSize: new window.google.maps.Size(30, 30),
//                     anchor: new window.google.maps.Point(15,15),
//                   }}
//                 title="Hotel"
//               />

//             }
//           </>
//         )}




//         {markers.map((m) => {
//           // ignore si pas de coords
//           if (!m.latitude || !m.longitude) return null;
//           return (
//             <Marker
//               key={m.id}
//               position={{ lat: m.latitude, lng: m.longitude }}
//               title={m.position_description}
//               onClick={() =>{
//                 // const position = { lat: m.latitude, lng: m.longitude };
//                 // setTimeout(() => {
//                 //   mapRef.current?.panTo(position);
//                 //   mapRef.current?.setZoom(15);
//                 // }, 100); // petit délai pour attendre le render du reste
//                 onMarkerClick(m);
//               }}
//             />
//           );
//         })}

//         {
//           hotes.length>0 ?
//           allDirections.map((dir, i) => (
//             <DirectionsRenderer
//               key={i}
//               directions={dir}
//               options={{
//                 suppressMarkers: true,
//                 preserveViewport: true,
//                 polylineOptions: {
//                   strokeColor: "#000000",
//                   strokeWeight: 3,
//                 },
//               }}
//             />
//           )) : <></>
//         }
//         </>
//           :
//           <></>
//         }       
//       </GoogleMap> 
//       {mapRef.current && destination && (
//         <>
//           <MapLabel map={mapRef.current} position={destination}>
//             <div className="MapHotelContainer">
//               <p className="t4">Mon </p>
//               <p className="t4">Hôtel</p>
//             </div>
//           </MapLabel>
//           {/* <MapLabel map={mapRef.current} position={center}>
//             <div className="MapAdresseContainer">
//               <div>
//                 <p className="t4">{duration[0]}</p>
//                 <p className="t6">{duration[1]}</p>
//               </div>
//               <p className="t6">{adresseTexte}</p>
//             </div>
//           </MapLabel> */}
//         </>
//       )}

//       { adresseTexte ?
//         <MapLabel map={mapRef.current} position={center}>
//           <div className="MapAdresseContainer">
//             <div>
//               <p className="t4">{duration ? duration[0] : ""}</p>
//               <p className="t6">{duration ? duration[1] : ""}</p>
//             </div>
//             <p className="t6">{adresseTexte}</p>
//           </div>
//         </MapLabel>
//         : <></>
//       }


//       {mapRef.current && hotes.length>0 ? (
//         <>
//           {/* <MapLabel map={mapRef.current} position={center} index={1000}>
//             <div className="MapAdresseContainer my-annonces">
//               <div>
//                 <p className="t4"></p>
//                 <p className="t6"></p>
//               </div>
//               <p className="t6">My Annonce</p>
//             </div>
//           </MapLabel> */}
//           {
//             hotes.map((hote) => {
//               const destination = { lat: hote.latitude, lng: hote.longitude };
//               return (
//                 <MapLabel key={hote.name} map={mapRef.current} position={destination} index={10}>
//                   <div className="MapHotelInfoContainer">
//                     <div className="ContainerImage">
//                       {
//                         hote.img ? <img src={hote.img}/>
//                         : <></>
//                       }
                      
//                     </div>
//                     <div className="info">
//                       <p className="t6">{hote.name}</p>
//                     </div>
//                   </div>
//                 </MapLabel>
//               )
//             })
//           }

//         </>
//       ) : <></>}  
      

// {/* 
// {mapRef.current && hotes.length>0 ? 
//             hotes.map((hote) => {
//               const destination = { lat: hote.latitude, lng: hote.longitude };
//               return (
//                 <>
//           <MapLabel key={hote.name} map={mapRef.current} position={destination}>
//                   <div className="MapHotelInfoContainer">
//                     <div className="ContainerImage">
//                       {
//                         hote.img ? <img src={hote.img}/>
//                         : <></>
//                       }
                      
//                     </div>
//                     <div className="info">
//                       <p className="t6">{hote.name}</p>
//                     </div>
//                   </div>
//                 </MapLabel>
//         </>
//               )
//             }

//       ) : <></>}  */}


//       </div>
//   );

// }

// export default memo(Map2D);





// src/components/Map2D/Map2D.jsx
import React, { memo, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import Map2DPoint from "../../assets/images/Map2DPoint.png";
import Map2DPin from "../../assets/images/Map2DPin.png";
import MapLabel from "./MapLabel";
import "./Map2D.css";

function Map2D({
  center = { lat: 43.7002, lng: 7.2620 },
  destination = null,               // {lat, lng} d’un hôtel éventuellement
  zoom = 10,
  containerStyle = { width: "100%", height: "100%" },
  markers = [],                     // [{ id, latitude, longitude, position_description }]
  onMarkerClick = () => {},
  borderRadius = 40,
  adresseTexte,
  hotes = [],                       // [{ latitude, longitude, name, img? }, ...]
  duration,                         // ex: ["12", "min"] ou ["1.4", "hours"]
  onMapClick,
}) {
  const mapRef = useRef(null);

  const [mapMounted, setMapMounted] = useState(false);     // la map React est montée
  const [tilesReady, setTilesReady] = useState(false);      // tuiles chargées == panes prêts
  const [directions, setDirections] = useState(null);
  const [allDirections, setAllDirections] = useState([]);

  // API prête uniquement quand google.maps est dispo ET que la carte est montée
  const googleReady = !!window.google?.maps;
  const isApiReady = googleReady && mapMounted && tilesReady;

  const handleLoad = (map) => {
    mapRef.current = map;
    setMapMounted(true);

    // On attend que les tuiles (et donc les panes) existent
    const once = window.google.maps.event.addListenerOnce(
      map,
      "tilesloaded",
      () => setTilesReady(true)
    );
    // cleanup si jamais démontage
    return () => window.google.maps.event.removeListener(once);
  };

  // 1) Itinéraire simple (center -> destination)
  useEffect(() => {
    if (!isApiReady) return;
    if (!center || !destination) return;

    if (center.lat === destination.lat && center.lng === destination.lng) return;

    const svc = new window.google.maps.DirectionsService();
    svc.route(
      {
        origin: center,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);

          // fitBounds sur l’itinéraire
          const route = result.routes?.[0];
          if (route?.overview_path?.length && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            route.overview_path.forEach((p) => bounds.extend(p));
            mapRef.current.fitBounds(bounds);
          }
        } else {
          console.warn("Directions error:", status, result);
        }
      }
    );
  }, [isApiReady, center, destination]);

  // 2) Itinéraires multiples (hôtels -> center) si aucune destination unique
  useEffect(() => {
    if (!isApiReady) return;
    if (!center || destination) return;
    if (!Array.isArray(hotes) || hotes.length === 0) return;

    const svc = new window.google.maps.DirectionsService();

    const jobs = hotes.map((h) => {
      if (
        !h ||
        typeof h.latitude !== "number" ||
        typeof h.longitude !== "number"
      ) {
        return Promise.resolve(null);
      }
      return new Promise((resolve) => {
        svc.route(
          {
            origin: { lat: h.latitude, lng: h.longitude },
            destination: center,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (res, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              resolve(res);
            } else {
              console.warn("Directions(hote) error:", h?.name, status);
              resolve(null);
            }
          }
        );
      });
    });

    Promise.all(jobs).then((arr) => {
      const valid = arr.filter(Boolean);
      setAllDirections(valid);

      // Auto-fit: center + tous les hôtels
      if (mapRef.current && valid.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(center);
        hotes.forEach((h) => {
          if (h.latitude && h.longitude) {
            bounds.extend({ lat: h.latitude, lng: h.longitude });
          }
        });
        mapRef.current.fitBounds(bounds);
      }
    });
  }, [isApiReady, center, destination, hotes]);

  // Style carte
  const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: "greedy",
    backgroundColor: "#FFFFFF",
    styles: [
      { elementType: "geometry", stylers: [{ color: "#f8f8f8" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#2E3A43" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#FFFFFF" }, { weight: 2 }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#A4D4FF" }] },
      { featureType: "landscape.natural", elementType: "geometry.fill", stylers: [{ color: "#CDE8B2" }] },
      { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#B5E3A1" }] },
      { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#E5E5E5" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#FFFFFF" }] },
      { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#D6D6D6" }] },
      { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#FFF6CC" }] },
      { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#FFE1A6" }] },
      { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#6E6E6E" }] },
      { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
      { featureType: "poi.school", stylers: [{ visibility: "off" }] },
      { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#E2E6EB" }] },
    ],
  };

  // Clé pour forcer un remount propre si center/destination changent (évite des panes “fantômes”)
  const mapKey = `${center?.lat ?? "x"},${center?.lng ?? "x"}-${destination ? "withdst" : "nodst"}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: borderRadius,
        overflow: "hidden",
      }}
    >
      <GoogleMap
        key={mapKey}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={handleLoad}
        options={mapOptions}
        onClick={(e) => {
          if (!onMapClick) return;
          const lat = e.latLng?.lat();
          const lng = e.latLng?.lng();
          if (typeof lat === "number" && typeof lng === "number") {
            onMapClick({ lat, lng });
          }
        }}
        id="map"
      >
        {/* Contenu de la carte seulement quand tout est prêt */}
        {isApiReady && (
          <>
            {/* Pin activité (center) */}
            <Marker
              position={center}
              title="Activité"
              icon={{
                url: Map2DPin,
                scaledSize: new window.google.maps.Size(30, 30),
                anchor: new window.google.maps.Point(15, 27),
              }}
            />

            {/* Itinéraire unique */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  preserveViewport: true,
                  polylineOptions: { strokeColor: "#373737", strokeWeight: 3 },
                }}
              />
            )}

            {/* Pin hôtel (destination) si différente du center */}
            {destination &&
              !(center.lat === destination.lat && center.lng === destination.lng) && (
                <Marker
                  position={destination}
                  title="Hôtel"
                  icon={{
                    url: Map2DPoint,
                    scaledSize: new window.google.maps.Size(30, 30),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                />
              )}

            {/* Markers additionnels */}
            {Array.isArray(markers) &&
              markers.map((m) =>
                m.latitude && m.longitude ? (
                  <Marker
                    key={m.id}
                    position={{ lat: m.latitude, lng: m.longitude }}
                    title={m.position_description}
                    onClick={() => onMarkerClick(m)}
                  />
                ) : null
              )}

            {/* Multi-itinéraires (liste d’hôtels) */}
            {Array.isArray(hotes) &&
              hotes.length > 0 &&
              allDirections.map((dir, i) => (
                <DirectionsRenderer
                  key={i}
                  directions={dir}
                  options={{
                    suppressMarkers: true,
                    preserveViewport: true,
                    polylineOptions: { strokeColor: "#000000", strokeWeight: 3 },
                  }}
                />
              ))}
          </>
        )}
      </GoogleMap>

      {/* Labels custom — seulement quand la map est prête */}
      {isApiReady && destination && (
        <MapLabel map={mapRef.current} position={destination}>
          <div className="MapHotelContainer">
            <p className="t4">Mon </p>
            <p className="t4">Hôtel</p>
          </div>
        </MapLabel>
      )}

      {isApiReady && adresseTexte && (
        <MapLabel map={mapRef.current} position={center}>
          <div className="MapAdresseContainer">
            <div>
              <p className="t4">{duration?.[0] ?? ""}</p>
              <p className="t6">{duration?.[1] ?? ""}</p>
            </div>
            <p className="t6">{adresseTexte}</p>
          </div>
        </MapLabel>
      )}

      {isApiReady && Array.isArray(hotes) && hotes.length > 0 && (
        <>
          {hotes.map((h) => {
            const pos = { lat: h.latitude, lng: h.longitude };
            if (!h.latitude || !h.longitude) return null;
            return (
              <MapLabel key={h.name || `${h.latitude},${h.longitude}`} map={mapRef.current} position={pos} index={10}>
                <div className="MapHotelInfoContainer">
                  <div className="ContainerImage">
                    {h.img ? <img src={h.img} alt={h.name || "Hôtel"} /> : null}
                  </div>
                  <div className="info">
                    <p className="t6">{h.name}</p>
                  </div>
                </div>
              </MapLabel>
            );
          })}
        </>
      )}
    </div>
  );
}

export default memo(Map2D);
