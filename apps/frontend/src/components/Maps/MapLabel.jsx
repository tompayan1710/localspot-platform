// src/components/Map2D/MapLabel.jsx
import { useEffect, useRef } from "react";

export default function MapLabel({ map, position, index, children }) {
  const divRef = useRef();

  useEffect(() => {
    if (!map || !position) return;

    const overlay = new window.google.maps.OverlayView();

    overlay.onAdd = function () {
      const pane = this.getPanes().floatPane;
      pane.appendChild(divRef.current);
    };

    overlay.draw = function () {
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(position.lat, position.lng)
      );

      const el = divRef.current;
      el.style.position = "absolute";
      el.style.left = `${point.x}px`;
      el.style.top = `${point.y}px`;
      el.style.transform = "translate(-0%, -100%)";
      if(index !== undefined ){
        el.style.zIndex = index
      }
    };

    overlay.onRemove = function () {
      if (divRef.current && divRef.current.parentNode) {
        divRef.current.parentNode.removeChild(divRef.current);
      }
    };

    overlay.setMap(map);

    return () => overlay.setMap(null);
  }, [map, position, index]);

  return (
    <div
      ref={divRef}
      // className={`${index > 10 ? "indexElever" : ""} TESTIBIG`}
    >
      {children}
    </div>
  );
}
