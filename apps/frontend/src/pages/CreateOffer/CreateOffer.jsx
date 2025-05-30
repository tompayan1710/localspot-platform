import "./CreateOffer.css"

import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
import jetskyIcon from "../../assets/images/jetskyIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import { useNavigate } from "react-router-dom"

import { useRef, useState } from "react"
export default function CreateOffer(){
    const navigate = useNavigate();
    const refNavigateButton = useRef(null);

    const refCreateOfferPage1 = useRef(null);
    const refActivityType = useRef(null);
    const refFoodType = useRef(null);
    const refTitleType= useRef(null);
    const refListCategorie= useRef(null);
    const RefErrorContainer= useRef(null);

    const [typeSelected, setTypeSelected] = useState("");
    const [errorSelected, setErrorSelected] = useState("");


    const show = (e, type) => {
        // const containerTop = e.currentTarget.getBoundingClientRect().top;
        // let offset = containerTop; // distance entre le haut du container et le haut de l'écran
        setTypeSelected(type);

        setTimeout(() => {
            
            let offset = 0;
            if (type === "Activite") {
                refFoodType.current.style.opacity = "0"; // on cache l'autre
                refFoodType.current.style.pointerEvents = "none"; // on cache l'autre
                // refFoodType.current.style.desea = "none"; // on cache l'autre
                refListCategorie.current.style.transform = `translateY(-${13}vh)`;
                refListCategorie.current.style.marginTop = `400px`;
                RefErrorContainer.current.style.transform = `translateY(-${13}vh)`;
                setListCategorie(["JetSki", "Parachute", "Plongée", "Kayak", "Surf", "Paddle", "Bouée", "Ski nautique", "KiteSurf"]);
            } else {
                offset=15;
                refActivityType.current.style.opacity = "0"; // on cache l'autre
                refActivityType.current.style.pointerEvents = "none"; // on cache l'autre
                setListCategorie([
                    "Fastfood", "Nourriture asiatique","Spécialité local", "Nourriture local", "Vegan", "Healthy", "Glaces / Desserts"]);  
          }

            refTitleType.current.style.opacity = "0"; // on cache l'autre

            
            refCreateOfferPage1.current.style.transform = `translateY(-${20 + offset}vh)`;

            setTimeout(() => {
                    refListCategorie.current.style.opacity="1";            
                refListCategorie.current.querySelectorAll("li").forEach((li) => {
                    li.classList.add("startAnimation");
                })
            }, 500)

            setTimeout(() => {
                refNavigateButton.current.classList.remove("hide");     // on lance la sortie
                refNavigateButton.current.classList.add("show");
            }, 1000)

        },200)
    


    }



    const goBack = (type) => {
        setTypeSelected("");
        setErrorSelected("")

        
        if (type === "Activite") {
            setTimeout(() => {
                refFoodType.current.style.opacity = "1";
                refFoodType.current.style.pointerEvents = "auto";
                RefErrorContainer.current.style.transform = `translateY(${13}vh)`;
            }, 400)
        } else {
            setTimeout(() => {
                refActivityType.current.style.opacity = "1";
                refActivityType.current.style.pointerEvents = "auto";
            }, 400)
        }

        refTitleType.current.style.opacity = "1";


        refCreateOfferPage1.current.style.transform = `translateY(0vh)`;
        refListCategorie.current.style.transform = `translateY(0vh)`;
        refListCategorie.current.style.marginTop = `480px`;

        setTimeout(() => {
            refListCategorie.current.style.opacity="0";            
        }, 200);

        setTimeout(() => {
            refListCategorie.current.querySelectorAll("li").forEach((li) => {
                li.classList.remove("startAnimation");
            });
            
            // setListCategorie([""]);
        }, 1000);
        
        //refNavigateButton.current.style.opacity="0";

        setTimeout(() => {
            refNavigateButton.current.classList.remove("show"); // on enlève l'animation d'entrée
            refNavigateButton.current.classList.add("hide");     // on lance la sortie
        }, 600);
    };



    
      const [selectedCategorie, setCategorie] = useState([]);//Levier Choice
      let [categories, setListCategorie]= useState([""]);
      const toggleCategorie = (choice) => {
        setCategorie((prev) => 
          prev.includes(choice)
          ? prev.filter((item) => item !== choice)
          : [...prev, choice]
        ) 
      } 





    
    return (
        <div className="CreateOfferContainerAll">
            <button className="CloseButton" onClick={() => navigate("/profile", {
                state: {
                    type: typeSelected,
                    categories: selectedCategorie
                }
            })}><img src={crossiconBlack}/></button>
            <button className="GoBackButton" onClick={() => {goBack(typeSelected)}}><img src={arrowLeft}/><p className="t6">précédent</p></button>
            <button className="NavigateButton" ref={refNavigateButton} 
                onClick={() => {
                    if(selectedCategorie.length==0){
                    setErrorSelected("Vous devez choisir au moins une catégorie !")
                    }else{
                        navigate("/create-offer-address", {state: {
                            type: typeSelected,
                            categories: selectedCategorie,
                        }})
                    }
                }}>
                Créer mon offre</button>
            <div className="TopDivOpacity"></div>
            {/* <button onClick={show} style={{padding: "40px"}}>Mon button</button> */}
            <div className="CreateOfferPage1" ref={refCreateOfferPage1}>
                <p ref={refTitleType} className="t32">Quelle type d'offre proposez-vous&nbsp;?</p>
                <div ref={refActivityType} className="OfferTypeContainer" onClick={(e) => show(e, "Activite")}>
                    <img src={jetskyIcon}/>
                    <p>Activité / Service</p>
                </div>
                <div ref={refFoodType} className="OfferTypeContainer" onClick={(e) => show(e, "Food")}>
                    <img src={foodIcon}/>
                    <p>Fast Food / Restauration</p>
                </div>
                <ul className="ListCategorieType" ref={refListCategorie}>
                    {
                            categories.map((categorie, index) => (
                            <li key={index}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`CategorieItemButton ${selectedCategorie.includes(categorie) ? "selectedCategorie" : ""}`}
                                onClick={() => toggleCategorie(categorie)}>
                                    <p className="t6">{categorie}</p>
                                </div>
                            </li>

                            ))
                          }
                </ul>
                <div ref={RefErrorContainer} className="CreatOfferErrorContainer"><p className="t6">{errorSelected}</p></div>

            </div>
        </div>
    )
}