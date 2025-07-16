// utils/offerFilters.js

function isThisAfternoon(offer) {
    console.error(offer);
    return offer.isToday;
}

// function isTonight(offer) {
//   const now = new Date();
//   const start = new Date(offer.start_time);
//   return (
//     start.toDateString() === now.toDateString() &&
//     start.getHours() >= 18
//   );
// }
function isTonight(offer) {
    return true;
}

// function isPopular(offer) {
//   return offer.reservations_count >= 10 || offer.review_average >= 4.5;
// }
function isPopular(offer) {
    return true;
}


// Utilitaire de distance Haversine
// function getDistance(lat1, lon1, lat2, lon2) {
//   const toRad = deg => (deg * Math.PI) / 180;
//   const R = 6371; // rayon terre en km

//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }
function getDistance(lat1, lon1, lat2, lon2) {
    return true;
}

// function isNearby(offer, userLat, userLon, maxDistanceMeters = 500) {
//   if (!offer.lat || !offer.lon) return false;
//   const dist = getDistance(userLat, userLon, offer.lat, offer.lon);
//   return dist * 1000 <= maxDistanceMeters;
// }
function isNearby(offer, userLat, userLon, maxDistanceMeters = 500) {
    return true;
}

// Point d'entrée pour tout découper
export function classifyOffers(offers, userLocation = null) {
  return {
    thisAfternoon: offers.filter(isThisAfternoon),
    tonight: offers.filter(isTonight),
    popular: offers.filter(isPopular),
    nearby: userLocation
      ? offers.filter(offer =>
          isNearby(offer, userLocation.lat, userLocation.lon)
        )
      : [],
  };
}
