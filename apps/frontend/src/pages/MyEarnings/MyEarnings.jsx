import "./MyEarnings.css"
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";

import bankicon from "../../assets/images/bankicon.png";
import editPenIcon from "../../assets/images/editPenIcon.png";
import ValidateProgress from "../../assets/images/ValidateProgress.png";
import plus from "../../assets/images/plus.png";
import ArrowDownRetired from "../../assets/images/ArrowDownRetired.png";
import ArrowUpRetired from "../../assets/images/ArrowUpRetired.png";
import MonthlyRevenueChart from "./MonthlyRevenueChart/MonthlyRevenueChart";
import { useLocation, useNavigate } from "react-router-dom";
import WhiteButton from "../../components/Buttons/WhiteButton/WhiteButton";
import warningRed from "../../assets/images/warningRed.png"
import NoTransactions from "../../assets/images/NoTransactions.png"

import FadeInImage from "../../components/Utils/FadeInImage";
import EditVersement from "../../components/PopUpBottom/EditVersement/EditVersement";
import { useTranslation } from "react-i18next";

export default function MyEarnings() {
  const {t, i18n} = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [ transactions, setTransactions ] = useState([]);
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [total_revenue, setTotalRevenue] = useState(0);
  const [solde, setSolde] = useState(0);
  const [alreadyPaid, setAlreadyPaid] = useState(0);
  const [waiting, setWaiting] = useState(0);
  const [selectedVersement, setselectedVersement] = useState(0);


  const [selectedModifie, setSelectedModifie] = useState(0);
  const [modifiename, setModifieName] = useState("");  
  const [modifielastname, setModifieLastName] = useState("");  
  const [modifieIban, setModifieIban] = useState("");  
  const [modifieSwift, setModifieSwift] = useState("");  
  const [loadingModifie, setLoadingModifie] = useState(false);  
  const [loadingRequest, setLoadingRequest] = useState(false);  
    
  const [isOccultView, setIsOccultView] = useState(false);
  const [isWithdrawalMethod, setIsWithdrawalMethod] = useState([]);

  const editPopUp = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // petit délai pour que le DOM soit prêt
      }
    }
  }, [location]);


    const getTransactionHistory = async () => {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
        
        console.log("Récupération de l'historique du provider : ", authState.user?.provider_id);

        try {
            // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/transactions/getall-by-provider?provider_id=${authState.user?.provider_id}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTransactions(data.history || []); // ✅ on met uniquement le tableau
                setTotalRevenue(data.total_revenue || 0);
                setSolde(data.solde || 0);
                setWaiting(data.waiting || 0)
                setAlreadyPaid(data.already_paid || 0)
                return data;
            } else {
                console.error("❌ Échec Récupération des earnings et des payouts du provider");
                return { success: false };

            }
        } catch (error) {
            console.error("❌ Erreur Récupération des earnings et des payouts du provider : ", error);
            return { success: false };
        }
    };
    

  function groupTransactionsByMonth(transactions, lang) {
    const groups = {};

    transactions.forEach((t) => {
      const date = new Date(t.created_at);
      const monthYear = date.toLocaleString(lang, { month: "long", year: "numeric" });

      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(t);
    });

    return groups;
  }


  function getMonthlyEarnings(transactions, monthsBack = 6) {
    const now = new Date();
    const monthlyData = [];

    const formatter = new Intl.DateTimeFormat(lang, {
      month: "short",
    });

    for (let i = monthsBack - 1; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = formatter.format(month); // exemple : "juil." pour juillet

      const total = transactions
        .filter(t => t.type === "earning")
        .filter(t => {
          const d = new Date(t.created_at);
          return (
            d.getFullYear() === month.getFullYear() &&
            d.getMonth() === month.getMonth()
          );
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      monthlyData.push({ month: key, total });
    }

    return monthlyData;
  }

  useEffect(() => {
    if (authState.user?.provider_id) {
      getTransactionHistory().then(data => {
        if (data.success) {
          const history = data.history || [];
          setTransactions(history);

          setSolde(data.solde);

          const monthly = getMonthlyEarnings(history);
          setMonthlyChartData(monthly);

        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 500)

      fetchIsWithdrawalMethod();
    }
  },[ authState, lang])

    const fetchIsWithdrawalMethod = async () => {
        try {
        const provider_id = authState.user?.provider_id;
         
        if(!provider_id){
            return
        }
         
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/payouts/is-withdrawal_method?provider_id=${provider_id}`, {
                method: "GET"
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();
        console.error(data);

        if (data.success) {
          setIsWithdrawalMethod(data.is_withdrawal_method);
        } else {
          alert("Erreur lors de la récupération des méthodes.");
        }
        } catch (err) {
        console.error("❌ Erreur fetchVersements:", err);
        } finally {
        setTimeout(() => {
            setLoading(false);
        }, 500)
        }
    };


  useEffect(() => {
    console.log(solde);
  }, [solde])


  return (
    <div className="MyEarnings">
      <p className="t32">{t("Payments")}</p>
      
      <MonthlyRevenueChart
        data={monthlyChartData.map(m => m.total)}
        labels={monthlyChartData.map(m => m.month)}
        currentRevenue={monthlyChartData[monthlyChartData.length - 1] || 0}
        solde={solde}
        loading={loading}
      />


      {
        isWithdrawalMethod ?
        <>
        <button className="RetiredGainButton" onClick={() => navigate("/payout-request")}>
          <img src={ArrowDownRetired} alt="Arrow down retired"/>
          <p className="t5">{t("Withdraw_my_earnings")}</p>
        </button>
        <p className="t6">{t("Withdrawal_notice")}</p>
        </>
        : 
        <div className="VersementContainer column">
          <p className="t4 bold">{t("Receive_my_payments")}</p>
          <p className="t6">{t("Provide_withdrawal_method")}</p>
          <button className="AddVersementButton" onClick={() => {
            navigate("/versement/new/titulaire", {
              state: {
                origin: "/my-earnings"
              }
            })
          }}>
            <p className="t6">{t("Configure_withdrawal_account")}</p>
          </button>
        </div>
      }
      <div className="hline15"></div>
      <div className="Transactions column" id={"Transactions"}>
        <div className="row">
          <p className="t4">{t("History")}</p>
          <button className="SeeMoreHistorique row" onClick={() => {navigate("/all-history-transactions")}}>
            <p className="t6">{t("See_more")}</p>
          </button>
        </div>
        {
          !loading ?
          transactions.length > 0 ?
          Object.entries(groupTransactionsByMonth(transactions.slice(0, 8), lang)).map(([month, items]) => (
            <div className="MonthSeparation column" key={month} style={{ marginTop: "5px", marginBottom: "8px" }}>
              <p className="t5" style={{ marginBottom: "6px" }}>{month.charAt(0).toUpperCase() + month.slice(1)}</p>

              {items.map((transaction, index) => {
                const date = new Date(transaction.created_at);
                const formattedDate = date.toLocaleString(lang, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div className="transactionItem row" 
                        key={transaction.created_at + index} 
                        onClick={() => {
                          navigate("/transaction-info", {
                            state: {
                              type: transaction.type,
                              id: transaction.id
                            }
                          });
                  }}>
                    <div className="row">
                      <div className="TypeArrow">
                        <img
                          src={transaction.type === "earning" ? ArrowUpRetired : ArrowDownRetired}
                          alt="Arrow type transaction"
                        />
                      </div>
                      <div className="column">
                        <p className="t5">{transaction.type === "earning" ? t("Places_sold", {total_reserved: transaction.total_reserved, start_hour: transaction.start_hour, end_hour: transaction.end_hour}) : t("Withdrawal_via", {method: transaction.method})}</p>
                        {/* CONCAT(total_reserved, ' places vendues - ', start_hour, ' à ', end_hour) as label, */}
                        <p className="t6">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="column">
                      <p className={`t5 ${transaction.type === "earning" ? "greenColor" : "orangeColor"}`}>
                        {transaction.type === "earning" ? "" : "-"}{transaction.amount}€
                      </p>
                      <p className="t6">{transaction.type === "earning" ? t("received") : t("withdrawal")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
         :
          <div className="no-transactions column">
            {/* <img src={NoTransactions} alt="no transactions"/> */}
            <p className="t5 bold">{t("No_transactions_yet")}</p>
            <p className="t6">
              {t("No_transactions_message")}
            </p>
            <WhiteButton text={"Voir mes annonces"} onClick={() => {
              navigate("/annonces")
            }}/>
          </div>
        : 
        Array.from({ length: 3 }).map((_, i) => (
          <React.Fragment key={i}>
            {i % 3 === 0 && (
              <div className={`MonthSeparationSquellette shimmer ${i>1 ? "elarging" : ""}`} ></div>
            )}

            <div className="squelletteTransactionItem row">
              <div className="row">
                <div className="roundSquellette shimmer"></div>
                <div className="column">
                  <div className="Title shimmer"></div>
                  <div className="Date shimmer"></div>
                </div>
              </div>
              <div className="column">
                <div className="Amount shimmer"></div>
                <div className="Type shimmer"></div>
              </div>
            </div>
          </React.Fragment>
        ))

      }

      {transactions.length > 8 && 
      <WhiteButton text="Voir plus" onClick={() => {navigate("/all-history-transactions")}} />
      }
      </div>


      
      <div className={`occultView ${isOccultView ? "open" : ""}`}  
        onClick={(e) => {
          editPopUp.current.classList.remove("open");
      }}></div>
    </div>
  );
}