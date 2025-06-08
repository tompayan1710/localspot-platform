import arrowLeft from "../../assets/images/arrowLeft.png"; // Replace with your mp4 video path
import arrowdownicon from "../../assets/images/arrowdownicon.png";

import "./SearchBar.css";
import { useState, forwardRef } from "react";
import DurationSlider from "../../pages/OfferPage/DurationSlider";
import DistanceSlider from "../../pages/OfferPage/DistanceSlider";
import ButtonLevier from "../../components/ButtonLevier/ButtonLevier";

const SearchBar = forwardRef((props, ref) => {
   const [searchOpen, setSearchOpen] = useState(false);


   const [addPersonOpen, setAddPersonOpen] = useState(false);


  const [selectedChoicesActivity, setChoicesActivity] = useState([]);//Levier Choice
  const choicesActivity = [
    "JetSki", "Parachute", "Plongée", "Kayak", "Surf", "Paddle", "Bouée", "Ski nautique", "KiteSurf"
  ];
  const toggleChoiceActivity = (choice) => {
    setChoicesActivity((prev) => 
      prev.includes(choice)
      ? prev.filter((item) => item !== choice)
      : [...prev, choice]
    ) 
  }
  const [isActivitySelected, setActivitySelected] = useState(true);
  const toogleInputActivity = () => {
    setActivitySelected((prev) => !prev)
  }


  const [selectedChoicesFood, setChoicesFood] = useState([]);//Levier Choice
  const choicesFood = ["Croissant", "Quiche", "Falafel", "Burrito", "Wok", "Kebab", "Risotto", "Dim Sum", "Poké Bowl"];
  const toggleChoiceFood = (choice) => {
    setChoicesFood((prev) => 
      prev.includes(choice)
      ? prev.filter((item) => item !== choice)
      : [...prev, choice]
    ) 
  }
  const [isFoodSelected, setFoodSelected] = useState(false);
  const toogleInputFood = () => {
    setFoodSelected((prev) => !prev)
  }


  return (
      <div ref={ref} className={`SearchContainer ${searchOpen ?  "searchOpen" : ""}`}>
        <form className="StartSearch"  
        // onSubmit={handleLogin}>
        >     

         {
                      searchOpen ?  
        <div className="continueResearchContainer" onClick={() => setSearchOpen(false)}>
          <img src={arrowLeft}/>
          <p className="t6">revenir</p>
        </div> : <></>
          }
                    <input 
                      type="email" 
                      placeholder="Commencer ma recherche" 
                      // value={email} 
                      // onChange={(e) => setEmail(e.target.value)} 
                      onFocus={() => setSearchOpen(true)} // Correction ici
                      // required 
                    />

                    {
                      searchOpen ?
                      <>
                      <span style={{height: "20px"}}></span>
                      <DistanceSlider />
                      <label className="t4">Durée</label>
                      <DurationSlider />
                      <div className="OptionSearch">
                        <div className="AddPersonne" onClick={() => setAddPersonOpen(prev => !prev)}>
                          <p className="t5">Ajouter des personnes</p>
                          <img src={arrowdownicon} />
                        </div>
                        { 
                          addPersonOpen ? 
                          <>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Adultes</p>
                                <p className="t6">18 et plus</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Enfants</p>
                                <p className="t6">De 4 à 18ans</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Bébés</p>
                                <p className="t6">De 0 à 4ans</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                          </>
                          : <></>
                        }
                      </div>
                        
                      <div className="ActivityChoice">
                        <div className="NameAndLevierContainer"><p>Activité</p><ButtonLevier toogleInput={toogleInputActivity} isSelected={isActivitySelected}/></div>
                        { 
                          isActivitySelected ? 
                          <div className="ListChoice">
                          {
                            choicesActivity.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesActivity.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceActivity(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>


                      <div className="ActivityChoice">
                        <div className="NameAndLevierContainer"><p>Food</p><ButtonLevier toogleInput={toogleInputFood} isSelected={isFoodSelected}/></div>
                        { 
                          isFoodSelected ? 
                          <div className="ListChoice">
                          {
                            choicesFood.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesFood.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceFood(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>
                      <div className="ActivityChoice">
                        <div className="NameAndLevierContainer"><p>Food</p><ButtonLevier toogleInput={toogleInputFood} isSelected={isFoodSelected}/></div>
                        { 
                          isFoodSelected ? 
                          <div className="ListChoice">
                          {
                            choicesFood.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesFood.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceFood(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>
                      <div className="ActivityChoice">
                        <div className="NameAndLevierContainer"><p>Food</p><ButtonLevier toogleInput={toogleInputFood} isSelected={isFoodSelected}/></div>
                        { 
                          isFoodSelected ? 
                          <div className="ListChoice">
                          {
                            choicesFood.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesFood.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceFood(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>
                      <div className="ActivityChoice">
                        <div className="NameAndLevierContainer"><p>Food</p><ButtonLevier toogleInput={toogleInputFood} isSelected={isFoodSelected}/></div>
                        { 
                          isFoodSelected ? 
                          <div className="ListChoice">
                          {
                            choicesFood.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesFood.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceFood(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>
                    </>
                    : <></>
                    }
                    
                    {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}
        
                    {/* <button type="submit">
                      "Se connecter"
                    </button> */}
                  </form>
      </div>
  );
}
)

export default SearchBar;
