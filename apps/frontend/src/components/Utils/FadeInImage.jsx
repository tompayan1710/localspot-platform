import { useState } from "react";

export default function FadeInImage({ src, alt, className="", style={} ,onClick = undefined }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "loaded" : "loading"}`}
      style={style}
      onLoad={() => setLoaded(true)}
      onClick={onClick}
    />
  );
}