import "./Carrousel.css"
// import Spinner from "../Spinner/Spinner";


export default function Carrousel({photos}) {
  if(!Array.isArray(photos)) return <div>PAS PHOTO</div>
  return (
    
<div className="carouselContainerPrincipal" aria-label="Gallery">
  <div className="CarouselListPhoto">
    {
      photos.map((photo, index) => {
        return (
          <div key={index} className="CarouselPhotoItem">
            <img src={photo} alt={`CarrouselPhoto n°${index}`}/>
          </div>
        )
      })
    }  
  </div>
</div> 
  );
}

