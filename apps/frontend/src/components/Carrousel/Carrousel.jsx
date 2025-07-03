import "./Carrousel.css";
import { useEffect, forwardRef } from "react";

const Carrousel = forwardRef(function Carrousel({ isLoading, setNavigationSelected, photos, scrollSyncEnabled  }, ref) {
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

  // if (!Array.isArray(photos)) return <div>Aucune Photo fournie</div>;
 
  return (
    <div className="carouselContainerPrincipal" aria-label="Gallery">
      <div className="CarouselListPhoto" ref={ref}>
        {Array.isArray(photos) && photos.length > 0 && !isLoading
          ? photos.map((photo, index) => (
              <div key={index} className="CarouselPhotoItem">
                <div className="SkeletonOverlay"></div>
                <img 
                  src={photo}
                  alt={`CarrouselPhoto n°${index}`}
                  onLoad={(e) => {
                    e.currentTarget.classList.add("loaded");
                    const skeleton = e.currentTarget.previousSibling;
                    if (skeleton) skeleton.classList.add("hide");
                    e.currentTarget.parentElement.classList.add("loaded");
                  }}
                />
              </div>
            ))
          : <div className="LoadingItem"></div>
        }
      </div>
    </div>
  )
});

export default Carrousel;
