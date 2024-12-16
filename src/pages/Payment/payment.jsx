import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const total = 100.23;
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="min-h-screen">
      {/* Removed sunHeading and heading props from div */}
      <div className="text-white">
        <h1>Payment</h1> {/* You can use heading here */}
        <p>Please provide the necessary information.</p>{" "}
        {/* You can use sunHeading here */}
      </div>
      <Elements stripe={stripePromise}>
        <CheckOutForm
          price={price}
          userName="Sabbir Ahmed"
          userEmail="sabbir386@gmail.com"
        />
      </Elements>
    </div>
  );
};

export default Payment;
