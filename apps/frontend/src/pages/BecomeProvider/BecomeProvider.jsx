// Profile.jsx
/*
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BecomeProvider.css";
import { AuthContext } from "../../components/Auth/authContext/authContext"
import Spinner from "../../components/Spinner/Spinner";

import companyIcon from  "../../assets/images/companyIcon.png"
import userIconBlackline from  "../../assets/images/userIconBlackline.png"

export default function BecomeProvider1() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  const [etapeNum, setEtapeNum] = useState("1/3");

 
    
  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth

  

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <div className="BecomePartnerContainer">
        <div className="PartnerEtape"><p className="t6">{etapeNum}</p></div>
        <p className="t32">Rejoignez-nous en tant que prestataire</p>
        <p className="t5">Comment gérez-vous votre activité ?</p>

        <div className="ListPartnerOption">
          <div className="PartnerOption" onClick={() => navigate("/provider-add-info", {
            state: {
              struct_type: "company"
            }
          })}>
            <div className="RowOption">
              <img src={companyIcon} alt="company icon"/>
              <p className="t5">En tant qu’entreprise immatriculée.</p>
            </div>
            <p className="t6">Entité enregistrée avec une immatriculation commerciale officielle.</p>
          </div>
          <div className="PartnerOption" onClick={() => navigate("/provider-add-info", {
            state: {
              struct_type: "independant"
            }
          })}>
            <div className="RowOption">
              <img src={userIconBlackline} alt="company icon"/>
              <p className="t5">En tant qu’indépendant enregistré</p>
            </div>
            <p className="t6">Auto-entrepreneur ou indépendant exerçant en son nom propre.</p>
          </div>
        </div>
      </div>
      }
  </>
  );
}


*/













import "./BecomeProvider.css"

import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"


import companyIcon from  "../../assets/images/companyIcon.png"
import userIconBlackline from  "../../assets/images/userIconBlackline.png"

import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext"

import { useRef, useState } from "react"
import Spinner from "../../components/Spinner/Spinner"

export default function BecomeProvider(){
    const { authState, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!authState.loading && !authState.isAuth) {
        console.log("🔄 Redirection car non authentifié");
        navigate("/login");
        }
    }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth

    
    const refNavigateButton = useRef(null);

    const refBecomeProviderPage1 = useRef(null);
    const refCompanyType = useRef(null);
    const refIndependantType = useRef(null);
    const refTitleType= useRef(null);
    const refListStrucQuestion= useRef(null);
    const RefErrorContainer= useRef(null);

    const refQuestionContainer= useRef(null);
    const refGoBackButton= useRef(null);


    const [typeSelected, setTypeSelected] = useState("");
    const [errorSelected, setErrorSelected] = useState("");


    const show = (e, type) => {
        // const containerTop = e.currentTarget.getBoundingClientRect().top;
        // let offset = containerTop; // distance entre le haut du container et le haut de l'écran
        setTypeSelected(type);

        setTimeout(() => {
            let offset = 0;
            if (type === "Company") {
                refIndependantType.current.style.opacity = "0"; // on cache l'autre
                refIndependantType.current.style.pointerEvents = "none"; // on cache l'autre
                // refIndependantType.current.style.desea = "none"; // on cache l'autre
                refListStrucQuestion.current.style.transform = `translateY(-${13}vh)`;
                refListStrucQuestion.current.style.marginTop = `400px`;
                RefErrorContainer.current.style.transform = `translateY(-${13}vh)`;
                
                setQuestionText("Quel est l’effectif actuel de votre entreprise");
                setListSize(["1 - 2","3 - 10", "11 - 20", "21 - 50", "+50"]);
            } else {
                offset=15;
                refCompanyType.current.style.opacity = "0"; // on cache l'autre
                refCompanyType.current.style.pointerEvents = "none"; // on cache l'autre
                
                setQuestionText("Exercez-vous seul ou en équipe");
                setListSize(["seul","en équipe"]);
            }

            refTitleType.current.style.opacity = "0"; // on cache l'autre
            refGoBackButton.current.style.opacity = "1";
            refBecomeProviderPage1.current.style.transform = `translateY(-${20 + offset}vh)`;

            setTimeout(() => {
                          refQuestionContainer.current.style.opacity = "1";

                    refListStrucQuestion.current.style.opacity="1";            
                refListStrucQuestion.current.querySelectorAll("li").forEach((li) => {
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

        
        if (type === "Company") {
            setTimeout(() => {
                refIndependantType.current.style.opacity = "1";
                refIndependantType.current.style.pointerEvents = "auto";
                RefErrorContainer.current.style.transform = `translateY(${13}vh)`;
            }, 400)
        } else {
            setTimeout(() => {
                refCompanyType.current.style.opacity = "1";
                refCompanyType.current.style.pointerEvents = "auto";
            }, 400)
        }

        refTitleType.current.style.opacity = "1";


        refBecomeProviderPage1.current.style.transform = `translateY(0vh)`;
        refListStrucQuestion.current.style.transform = `translateY(0vh)`;
        refListStrucQuestion.current.style.marginTop = `480px`;
        refGoBackButton.current.style.opacity = "0";


        setTimeout(() => {
            refListStrucQuestion.current.style.opacity="0";            
        }, 0);



        /*setTimeout(() => {
            refQuestionContainer.current.style.opacity = "0";
        }, 100);*/

        setTimeout(() => {
            refListStrucQuestion.current.querySelectorAll("li").forEach((li) => {
                li.classList.remove("startAnimation");
            });
        }, 1000);
        
        //refNavigateButton.current.style.opacity="0";

        setTimeout(() => {
            refNavigateButton.current.classList.remove("show"); // on enlève l'animation d'entrée
            refNavigateButton.current.classList.add("hide");     // on lance la sortie
        }, 600);
    };



    

      const [selectedSize, setSize] = useState();//Levier Choice
      let [sizes, setListSize]= useState(["1 - 2","3 - 10", "11 - 20", "21 - 50", "+50"]);

      let [questionText, setQuestionText] = useState("Quel est l’effectif actuel de votre entreprise");

      const toggleSize = (choice) => {
        setSize(choice) 
      } 




    if (authState.loading) {
        return <Spinner centerPage={true} />;
    }

    
    return (
        <div className="BecomeProviderAll">
            <button className="CloseButton" onClick={() => navigate("/profile")}><img src={crossiconBlack}/></button>
            <button className="GoBackButton" onClick={() => {goBack(typeSelected)}} ref={refGoBackButton}><img src={arrowLeft}/><p className="t6">précédent</p></button>
            <button className="NavigateButton" ref={refNavigateButton} 
                onClick={() => {
                    if(selectedSize.length==0){
                    setErrorSelected("Vous devez choisir au moins une catégorie !")
                    }else{
                        navigate("/become-provider/add-info", {state: {
                            type: typeSelected,
                            sizes: selectedSize,
                        }})
                    }
                }}>
                Devenir prestataire</button>
            <div className="TopDivOpacity"></div>
            {/* <button onClick={show} style={{padding: "40px"}}>Mon button</button> */}
            <div className="BecomeProviderPage1" ref={refBecomeProviderPage1}>
                <p ref={refTitleType} className="t32">Sous quel statut exercez-vous&nbsp;?</p>

                <div ref={refCompanyType} className="ProviderTypeContainer" onClick={(e) => show(e, "Company")}>
                    <img src={companyIcon}/>
                    <p>Entreprise immatriculée</p>
                </div>
                <div ref={refIndependantType} className="ProviderTypeContainer" onClick={(e) => show(e, "Independent")}>
                    <img src={userIconBlackline}/>
                    <p>Travailleur indépendant ou auto-entrepreneur</p>
                </div>
                <ul className="ListStrucQuestion" ref={refListStrucQuestion}>
                  <div className="StrucQuestionContainer" ref={refQuestionContainer}>{questionText}&nbsp;?</div>
                    {
                            sizes.map((size, index) => (
                            <li key={index}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`SizeItemButton ${selectedSize == size ? "selectedSize" : ""}`}
                                onClick={() => toggleSize(size)}>
                                    <p className="t6">{size}</p>
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