import "./MyEarnings.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";

import ArrowDownRetired from "../../assets/images/ArrowDownRetired.png";
import ArrowUpRetired from "../../assets/images/ArrowUpRetired.png";
import MonthlyRevenueChart from "./MonthlyRevenueChart/MonthlyRevenueChart";
import { useNavigate } from "react-router-dom";

export default function MyEarnings() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [ transactions, setTransactions ] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [monthlyChartData, setMonthlyChartData] = useState([]);


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


  function getMonthlyEarnings(transactions, monthsBack = 6) {
    const now = new Date();
    const monthlyData = [];

    const formatter = new Intl.DateTimeFormat("fr-FR", {
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

          const balance = history.reduce((total, t) => total + parseFloat(t.amount), 0);
          setCurrentBalance(balance);

          const monthly = getMonthlyEarnings(history);
          setMonthlyChartData(monthly);

        }
      });
    }
  }, [authState]);


  return (
    <div className="MyEarnings">
      <p className="t32">Paiements</p>
      <button className="RetiredGainButton" onClick={() => {console.log("Je clique")}}>
        <img src={ArrowDownRetired} alt="Arrow down retired"/>
        <p className="t5">Retirer mes gains</p>
      </button>

      <MonthlyRevenueChart
        data={monthlyChartData.map(m => m.total)}
        labels={monthlyChartData.map(m => m.month)}
        currentRevenue={monthlyChartData[monthlyChartData.length - 1] || 0}
        currentBalance={currentBalance}
      />
{/* const limitedHistory = fullHistory.slice(0, 9); */}
      <div className="VersementContainer">
        <p className="t4 bold">Mode de versement</p>
        <p className="t6">Ajoutez au moins un mode de versement pour nous indiquer où envoyer votre argent.</p>
        <button className="AddVersementButton">
          <p className="t6">Configurer les versements</p>
        </button>
      </div>
      <div className="hline15"></div>
      <div className="Transactions column">
        <div className="row">
          <p className="t4">Historique</p>
          <button className="SeeMoreHistorique row" onClick={() => {navigate("/history-transactions")}}>
            <p className="t6">voir plus</p>
          </button>
        </div>
        {
          Object.entries(groupTransactionsByMonth(transactions.slice(0, 8))).map(([month, items]) => (
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
                  <div className="transactionItem row" key={transaction.created_at + index}>
                    <div className="row">
                      <div className="TypeArrow">
                        <img
                          src={transaction.type === "earning" ? ArrowUpRetired : ArrowDownRetired}
                          alt="Arrow type transaction"
                        />
                      </div>
                      <div className="column">
                        <p className="t5">{transaction.label}</p>
                        <p className="t6">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="column">
                      <p className={`t5 ${transaction.type === "earning" ? "greenColor" : "orangeColor"}`}>
                        {transaction.amount}€
                      </p>
                      <p className="t6">{transaction.type === "earning" ? "reçu" : "retrait"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        }

      </div>
    </div>
  );
}