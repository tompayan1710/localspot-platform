export async function getDurations({ origin, destination }) {
  const params = new URLSearchParams({
    originLat: origin.lat,
    originLng: origin.lng,
    destLat: destination.lat,
    destLng: destination.lng
  });

  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/maps/durations?${params.toString()}`);
  return await res.json();
}
