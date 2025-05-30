import "./styles.css"
import Nice from "../../assets/images/Nice.avif"
import gouter from "../../assets/images/gouter.avif"; // Replace with your mp4 video path
import Spinner from "../Spinner/Spinner";


export default function CarrouselPhoto({photos}) {
  if(!Array.isArray(photos)) return <Spinner />
  return (
    
<section className="carousel" aria-label="Gallery">
  <ol className="carousel__viewport">

    {
      photos.map((photo, index) => {
        return (
          <li key={index} id={`carousel__slide${index+1}`} tabIndex="0" className="carousel__slide">
            <img src={photo} className="carousel__snapper" alt="Offer curent photo"/>

        </li>
        )
      })
    }
    
  </ol>
  {/* <aside class="carousel__navigation">
    <ol class="carousel__navigation-list">
      <li class="carousel__navigation-item">
        <a href="#carousel__slide1"
           class="carousel__navigation-button">Go to slide iuu</a>
      </li>
      <li class="carousel__navigation-item">
        <a href="#carousel__slide2"
           class="carousel__navigation-button">Go to slide 2</a>
      </li>
      <li class="carousel__navigation-item">
        <a href="#carousel__slide3"
           class="carousel__navigation-button">Go to slide 3</a>
      </li>
      <li class="carousel__navigation-item">
        <a href="#carousel__slide4"
           class="carousel__navigation-button">Go to slide 4</a>
      </li>
    </ol>
  </aside> */}
</section>
  );
}











// <li id="carousel__slide1"
//         tabIndex="0"
//         className="carousel__slide">
//             <img src={gouter} className="carousel__snapper" />

//     </li>
//     <li id="carousel__slide2"
//         tabIndex="0"
//         className="carousel__slide">
          
//       <img src={Nice} className="carousel__snapper" />
//       {/* <a href="#carousel__slide1"
//          class="carousel__prev">Go to previous slide</a>
//       <a href="#carousel__slide3"
//          class="carousel__next">Go to next slide</a> */}
//     </li>
//     <li id="carousel__slide3"
//         tabIndex="0"
//         className="carousel__slide">
//       <div className="carousel__snapper"></div>
//       {/* <a href="#carousel__slide2"
//          class="carousel__prev">Go to previous slide</a>
//       <a href="#carousel__slide4"
//          class="carousel__next">Go to next slide</a> */}
//     </li>
//     <li id="carousel__slide4"
//         tabIndex="0"
//         className="carousel__slide">
//       <div className="carousel__snapper"></div>
//       {/* <a href="#carousel__slide3"
//          class="carousel__prev">Go to previous slide</a>
//       <a href="#carousel__slide1"
//          class="carousel__next">Go to first slide</a> */}
//     </li>