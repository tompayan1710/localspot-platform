import "./Carrousel.css";
import { useEffect, forwardRef } from "react";
import extendIcon from "../../assets/images/extendIcon.png"

const Carrousel = forwardRef(function Carrousel({ setNavigationSelected, photos, scrollSyncEnabled  }, ref) {
  useEffect(() => {
    const carrousel = ref?.current;
    if (!carrousel || !Array.isArray(photos)) return;

    console.log("Je suis le début qui ajoute");
    const onScroll = () => {
      if (!scrollSyncEnabled) return;

      const scrollLeft = carrousel.scrollLeft;
      const containerWidth = carrousel.offsetWidth;

      // Cherche l’enfant (image) le plus proche du centre
      const children = carrousel.children;
      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const containerCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      setNavigationSelected(closestIndex);
    };

    carrousel.addEventListener("scroll", onScroll);

    return () => {
      console.log("Je sui la fin qui efface");
      carrousel.removeEventListener("scroll", onScroll);
    };
  }, [ref, photos, setNavigationSelected, scrollSyncEnabled]);

  if (!Array.isArray(photos)) return <div>Aucune Photo fournie</div>;

  return (
    <div className="carouselContainerPrincipal" aria-label="Gallery">
      <div className="CarouselListPhoto" ref={ref}>
        {photos.map((photo, index) => (
          <div key={index} className="CarouselPhotoItem">
            <img src={photo} alt={`CarrouselPhoto n°${index}`} />
          </div>
        ))}
      </div>
    </div>
  )
});

export default Carrousel;
