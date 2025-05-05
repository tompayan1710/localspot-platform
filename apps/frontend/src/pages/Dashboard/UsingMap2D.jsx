import { useEffect, useState, useRef } from "react";
import { useQrCodes } from "../../hooks/useQrCodes";
import Map2D from "../../components/Map3D/Map2D";
import BottomSheet from "../../components/BottomSheet/BottomSheet";




export default function UsingMap2D() {
  const { markers, loading, error } = useQrCodes();
  const [selected, setSelected]     = useState(null);


  return (
      <main
        className="MainMapRelative"
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          padding: "0rem",
          height: "calc(80vh - 80px)",
        }}
    >
        {loading && <div className="MapCharging">kkkok,</div>}
        {!loading && !error && (
        <Map2D
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            markers={markers}              // ceci vient de useQrCodes()
            onMarkerClick={(m) => setSelected(m)}
        />
        )}


        <BottomSheet
            selected={selected}
            onClose={() => setSelected(false)}

          />




      
      </main>
  );
}


