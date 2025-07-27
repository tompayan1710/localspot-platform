import "./ProgressBar.css";
import ValidateProgress from "../../assets/images/ValidateProgress.png";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProgressBar({ num_etape, steps }) {
    const navigate = useNavigate();

    return (
        <div className="ProgressBarContainer">
            <div className="ProgressBar">
                {steps.map((step, index) => {
                    const etape = index + 1;
                    const statusClass =
                        num_etape > etape
                            ? "completed"
                            : num_etape === etape
                            ? "actual"
                            : "after";

                    const isClickable = etape <= num_etape; // on ne clique que sur les étapes passées/actuelle

                    const handleClick = () => {
                        if (!isClickable) return;
                        navigate(step.route, {
                            state: step.state ?? {},
                        });
                    };
                    
                    return (
                        <div className="StepContainer" key={index}>
                            {/* Lignes gauche et droite */}
                            {/* {index > 0 && <div className="line left"></div>} */}
                            <button className={`Round ${statusClass}`} 
                                onClick={handleClick}
                                disabled={!isClickable}
                            >
                                {num_etape > etape ? (
                                    <img src={ValidateProgress} alt="Validate icon" />
                                ) : (
                                    <span></span>
                                )}
                            </button>
                            {index < steps.length - 1 && <div className="line right"></div>}

                            {/* Texte */}
                            <p className="t6">{step.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
