import "../MyEarnings.css"
import "./AllHistoryTransaction.css"
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Auth/authContext/authContext";

import ArrowDownRetired from "../../../assets/images/ArrowDownRetired.png";
import ArrowUpRetired from "../../../assets/images/ArrowUpRetired.png";
import { useNavigate } from "react-router-dom";
import GoBack from "../../../components/GoBack/GoBack";
import WhiteButton from "../../../components/Buttons/WhiteButton/WhiteButton";
import { useTranslation } from "react-i18next";

export default function AllHistoryTransaction(){
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const {t, i18n} = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

  const [ transactions, setTransactions ] = useState([]);
  const [ loading, setLoading ] = useState(true);


  const getTransactionHistory = async () => {
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

  function groupTransactionsByMonth(transactions) {
    const groups = {};

    transactions.forEach((t) => {
      const date = new Date(t.created_at);
      const monthYear = date.toLocaleString("fr-FR", { month: "long", year: "numeric" });

      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(t);
    });

    return groups;
  }

  useEffect(() => {
    if (authState.user?.provider_id) {
      getTransactionHistory().then(data => {
        if (data.success) {
          const history = data.history || [];
          setTransactions(history);

        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 1500)
    }
  }, [authState]);


    return (
        <div className="MyEarnings allhistory">
            <GoBack nagigation={"/my-earnings"} scrollTo={"Transactions"} text={"revenir"} />
            <p className="t32">{t("History")}</p>
            <div className="Transactions column">
                {
                !loading ?
                transactions.length > 0 ?
                Object.entries(groupTransactionsByMonth(transactions)).map(([month, items]) => (
                    <div className="MonthSeparation column" key={month} style={{ marginTop: "5px", marginBottom: "8px" }}>
                    <p className="t5" style={{ marginBottom: "6px" }}>{month.charAt(0).toUpperCase() + month.slice(1)}</p>

                    {items.map((transaction, index) => {
                        const date = new Date(transaction.created_at);
                        const formattedDate = date.toLocaleString("fr-FR", {
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
                            navigate(`/transaction-info/${transaction.type}/${transaction.id}`, {
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
                        <p className="t5 bold">{t("Currently_no_transactions")}</p>
                        <p className="t6">
                          {t("Your_transaction_history_will_be_visible")}
                        </p>
                        <WhiteButton text={t("View_my_listings")} onClick={() => {
                          navigate("/annonces")
                        }}/>
                    </div>
                : 
                Array.from({ length: 5 }).map((_, i) => (
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
            </div>
        </div>
    )
}