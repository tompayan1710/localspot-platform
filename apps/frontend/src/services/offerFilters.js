// utils/offerFilters.js


function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance en kilomètres
}


function isNearby(offer, userLat, userLon, maxDistanceMeters = 800) {
  if (!offer.latitude || !offer.longitude) return false;
 
  const distKm = getDistance(userLat, userLon, offer.latitude, offer.longitude);
  return distKm * 1000 <= maxDistanceMeters; // conversion km → m
}




// export function classifyOffers(offers, userLocation = null) {
//   // 🔽 TRI par nombre de réservation individuelles
//   const sortedOffers = [...offers].sort((a, b) => {
//     const aCount = parseInt(a.nb_reservation) || 0;
//     const bCount = parseInt(b.nb_reservation) || 0;

//     return bCount - aCount; // tri décroissant
//   });

//   return {
//     morning: sortedOffers.filter(isThisMorning),
//     afternoon: sortedOffers.filter(isThisAfternoon),
//     evenning: sortedOffers.filter(isThisEvenning),
//     popular: sortedOffers, // tout est trié par popularité ici
//     nearby: userLocation
//       ? sortedOffers.filter(offer =>
//           isNearby(offer, userLocation.lat, userLocation.lon)
//         )
//       : [],
//   };
// }




export function classifyOffers(offers, userLocation = null) {
  const sortedOffers = [...offers].sort((a, b) => {
    const aCount = parseInt(a.nb_reservation) || 0;
    const bCount = parseInt(b.nb_reservation) || 0;
    return bCount - aCount;
  });

  const usedSlugs = new Set();

  const morning = [];
  const afternoon = [];
  const evenning = [];
  const nearby = [];

  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const isBeforEndMorning = hour < 11 || (hour === 11 && minutes < 30);
  const isBeforEndAfternoon = hour < 17 || (hour === 17 && minutes < 30);
  const isBeforEndEvening = hour < 23 || (hour === 23 && minutes < 30);
 
  for (const offer of sortedOffers) {
    if (isBeforEndMorning && offer.isMorning && !usedSlugs.has(offer.slug)) {
      console.log("Je push dans morning !")
      morning.push(offer);
      usedSlugs.add(offer.slug);
      continue;
    }

    if (isBeforEndAfternoon && offer.isAfternoon && !usedSlugs.has(offer.slug)) {
      console.log("Je push dans afternoon !")
      afternoon.push(offer);
      usedSlugs.add(offer.slug);
      continue;
    }

    if (isBeforEndEvening && offer.isEvening && !usedSlugs.has(offer.slug)) {
      console.log("Je push dans evening !")
      evenning.push(offer);
      usedSlugs.add(offer.slug);
      continue;
    }

    if (
      userLocation &&
      isNearby(offer, userLocation.lat, userLocation.lon) &&
      !usedSlugs.has(offer.slug)
    ) {
      console.log("Je push dans nearby !")
      nearby.push(offer);
      usedSlugs.add(offer.slug);
    }
  }

  

  // Toutes les offres restantes (pas encore utilisées)
  const nonAdd = sortedOffers.filter(o => !usedSlugs.has(o.slug)).slice(0, 5);
  console.error(nonAdd)
  const popular = nonAdd.slice(0, 3);
  const all_remaining = nonAdd.slice(3);

  
  return {
    morning,
    afternoon,
    evenning,
    nearby,
    popular,
    all_remaining
  };
}

