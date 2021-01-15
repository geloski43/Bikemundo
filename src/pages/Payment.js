import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";


const promise = loadStripe(pk_test_51HyAp3K6MqK32Znwu7CUHo3MM1fCmSwTOUS7O7uDaResbcFEyavg18RRmvWf14j82ZFsM1eyEev8BMOziu8rZqrC00JkdLRr0W);

const Payment = () => {
  return (
    <div className="forms container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
