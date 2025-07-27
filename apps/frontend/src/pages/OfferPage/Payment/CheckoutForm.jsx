import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement  } from "@stripe/react-stripe-js";

export default function CheckoutForm({ onReady, isStripeReady, price, saveCreneau, sendEmail }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe || !elements){
        return;
    }



    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/confirm-payment`
        },
        // redirect: "if_required"
    });

    if (error) {
      setMessage({error: error.message});
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage({message: "Payment status: " + paymentIntent.status + " 🎉"});

      const reservation_individual = await saveCreneau();
      if (reservation_individual) {
        await sendEmail(reservation_individual);
      }
      
    } else {
      setMessage({error: "Unexpected state"});
    }


    setIsProcessing(false)

  };

  return (
    <form className="stripe-form-container" onSubmit={handleSubmit}>
      <PaymentElement onReady={onReady}/>

      <div className="PayButtonContainer">
        <div className="column">
          <p className="t5">Total</p>
          <p className="t3 bold">{price}€</p>
        </div>
        <button disabled={isProcessing} id="submit" className={`${isStripeReady ? "loaded" : ""} stripe-pay-button`}>
          <p className="t32">{isProcessing ? "Processing ..." : "Payer"}</p>
        </button>
      </div>

      {/* Show any error or success messages */}
      
      {message && (
        message.message ? 
        <p id="payment-message" className="t6 greenColor">{message.message}</p> 
        :
        <p id="payment-message" className="t6 redColor">{message.error}</p>
      )}
    </form>
  );
}
