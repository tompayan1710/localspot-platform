// // import "./Carrousel.css";
// // import { useEffect, forwardRef } from "react";

// // const Carrousel = forwardRef(function Carrousel({ isLoading, setNavigationSelected, photos, scrollSyncEnabled  }, ref) {
// //   useEffect(() => {
// //     const carrousel = ref?.current;
// //     if (!carrousel || !Array.isArray(photos)) return;

// //     console.log("Je suis le début qui ajoute");
// //     const onScroll = () => {
// //       if (!scrollSyncEnabled) return;

// //       const scrollLeft = carrousel.scrollLeft;
// //       const containerWidth = carrousel.offsetWidth;

// //       // Cherche l’enfant (image) le plus proche du centre
// //       const children = carrousel.children;
// //       let closestIndex = 0;
// //       let minDistance = Infinity;

// //       for (let i = 0; i < children.length; i++) {
// //         const child = children[i];
// //         const childCenter = child.offsetLeft + child.offsetWidth / 2;
// //         const containerCenter = scrollLeft + containerWidth / 2;
// //         const distance = Math.abs(containerCenter - childCenter);
// //         if (distance < minDistance) {
// //           minDistance = distance;
// //           closestIndex = i;
// //         }
// //       }

// //       setNavigationSelected(closestIndex);
// //     };

// //     carrousel.addEventListener("scroll", onScroll);

// //     return () => {
// //       console.log("Je sui la fin qui efface");
// //       carrousel.removeEventListener("scroll", onScroll);
// //     };
// //   }, [ref, photos, setNavigationSelected, scrollSyncEnabled]);

// //   // if (!Array.isArray(photos)) return <div>Aucune Photo fournie</div>;
 
// //   return (
// //     <div className="carouselContainerPrincipal" aria-label="Gallery">
// //       <div className="CarouselListPhoto" ref={ref}>
// //         {Array.isArray(photos) && photos.length > 0 && !isLoading
// //           ? photos.map((photo, index) => (
// //               <div key={index} className="CarouselPhotoItem">
// //                 <div className="SkeletonOverlay"></div>
// //                 <img 
// //                   src={photo}
// //                   alt={`CarrouselPhoto n°${index}`}
// //                   onLoad={(e) => {
// //                     e.currentTarget.classList.add("loaded");
// //                     const skeleton = e.currentTarget.previousSibling;
// //                     if (skeleton) skeleton.classList.add("hide");
// //                     e.currentTarget.parentElement.classList.add("loaded");
// //                   }}
// //                 />
// //               </div>
// //             ))
// //           : <div className="LoadingItem"></div>
// //         }
// //       </div>
// //     </div>
// //   )
// // });

// // export default Carrousel;



// // src/components/Carrousel/Carrousel.jsx
// import "./Carrousel.css";
// import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// const Carrousel = forwardRef(function Carrousel(
//   { isLoading, setNavigationSelected, photos = [], scrollSyncEnabled },
//   ref
// ) {
//   const containerRef = useRef(null);

//   // Expose une API propre au parent
//   useImperativeHandle(ref, () => ({
//     scrollToIndex(i) {
//       const el = containerRef.current?.children?.[i];
//       if (el) {
//         el.scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "nearest",
//         });
//       }
//     },
//   }));

//   // Sync du point de navigation pendant le scroll
//   useEffect(() => {
//     const carrousel = containerRef.current;
//     if (!carrousel || photos.length === 0) return;

//     const onScroll = () => {
//       if (!scrollSyncEnabled) return;

//       const scrollLeft = carrousel.scrollLeft;
//       const containerWidth = carrousel.offsetWidth;
//       const children = carrousel.children;

//       let closestIndex = 0;
//       let minDistance = Infinity;

//       for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         const childCenter = child.offsetLeft + child.offsetWidth / 2;
//         const containerCenter = scrollLeft + containerWidth / 2;
//         const distance = Math.abs(containerCenter - childCenter);
//         if (distance < minDistance) {
//           minDistance = distance;
//           closestIndex = i;
//         }
//       }

//       setNavigationSelected(closestIndex);
//     };

//     carrousel.addEventListener("scroll", onScroll, { passive: true });
//     return () => carrousel.removeEventListener("scroll", onScroll);
//   }, [photos.length, scrollSyncEnabled, setNavigationSelected]);

//   return (
//     <div className="carouselContainerPrincipal" aria-label="Gallery">
//       <div className="CarouselListPhoto" ref={containerRef}>
//         {photos.length > 0 && !isLoading ? (
//           photos.map((photo, index) => (
//             <div
//               key={photo || index /* idéalement: une clé stable unique (URL) */}
//               className="CarouselPhotoItem"
//             >
//               <div className="SkeletonOverlay"></div>
//               <img
//                 src={photo}
//                 alt={`CarrouselPhoto n°${index}`}
//                 onLoad={(e) => {
//                   e.currentTarget.classList.add("loaded");
//                   const skeleton = e.currentTarget.previousSibling;
//                   if (skeleton) skeleton.classList.add("hide");
//                   e.currentTarget.parentElement.classList.add("loaded");
//                 }}
//               />
//             </div>
//           ))
//         ) : (
//           <div className="LoadingItem"></div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default Carrousel;




// Carrousel.jsx
import "./Carrousel.css";
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const Carrousel = forwardRef(function Carrousel(
  { isLoading, setNavigationSelected, photos = [], scrollSyncEnabled },
  ref
) {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToIndex(i) {
      const el = containerRef.current?.children?.[i];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }));

  useEffect(() => {
    const carrousel = containerRef.current;
    if (!carrousel || photos.length === 0) return;

    const onScroll = () => {
      if (!scrollSyncEnabled) return;
      const { scrollLeft, offsetWidth, children } = carrousel;
      let closestIndex = 0, min = Infinity, center = scrollLeft + offsetWidth / 2;
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        const d = Math.abs(center - (c.offsetLeft + c.offsetWidth / 2));
        if (d < min) { min = d; closestIndex = i; }
      }
      setNavigationSelected(closestIndex);
    };

    carrousel.addEventListener("scroll", onScroll, { passive: true });
    return () => carrousel.removeEventListener("scroll", onScroll);
  }, [photos.length, scrollSyncEnabled, setNavigationSelected]);

  return (
    <div className="carouselContainerPrincipal" aria-label="Gallery">
      <div className="CarouselListPhoto" ref={containerRef}>
        {(!isLoading && photos.length > 0)
          ? photos.map((url, i) => (
              <div key={`${i}-${url}`} className="CarouselPhotoItem">
                <div className="SkeletonOverlay"></div>
                <img
                  src={url}
                  alt={`CarrouselPhoto n°${i}`}
                  onLoad={(e) => {
                    e.currentTarget.classList.add("loaded");
                    e.currentTarget.previousSibling?.classList.add("hide");
                    e.currentTarget.parentElement.classList.add("loaded");
                  }}
                />
              </div>
            ))
          : <div className="LoadingItem" />}
      </div>
    </div>
  );
});

export default Carrousel;
