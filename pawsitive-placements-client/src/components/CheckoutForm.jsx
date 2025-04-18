import React, { useContext, useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [transactionId, setTransactionId]= useState('');


  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (amount > 0) {
      setLoading(true);
      axiosPublic.post("/create-payment-intent", {price: amount})
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret); // Fixed: was incorrectly using setClientSecret
          setLoading(false);
        })
        .catch(err => {
          console.error("Payment intent error:", err);
          setError("Failed to connect to payment server. Please ensure the server is running.");
          setLoading(false);
        });
    }
  }, [axiosPublic, amount]);

  const handleSubmit = async(event) => { // Added missing event parameter
    event.preventDefault();

    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement);

    if(!card){
      return;
    }

    setLoading(true);
    setError("");

    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if(error){
        console.log("payment error", error);
        setError(error.message);
        setLoading(false);
        return;
      }
      else{
        console.log("payment method ", paymentMethod);
      }

      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });

      if(confirmError){
        console.log("confirm error", confirmError);
        setError(confirmError.message);
      }
      else{
        console.log("payment intent ", paymentIntent);
        if(paymentIntent.status === 'succeeded') {
          setError("");
          setTransactionId(paymentIntent.id);

          console.log(transactionId);

          const payment ={
            email : user.email,
            price : amount,
            date : new Date(),
            transactionId : paymentIntent.id,
          }

          axiosSecure.post('/payments', payment)
          .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
              alert("Payment successful!");
            }
          })

          // You can add additional logic for successful payment here
        }
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setError("An error occurred while processing your payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2 max-w-xs">
          <label 
            htmlFor="amount-input" 
            className="block text-sm font-medium text-[#0B2E33]"
          >
            Amount:
          </label>
          <input
            id="amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-[#93B1B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F7C82] focus:border-[#4F7C82] text-[#0B2E33]"
          />
          <p className="text-sm text-[#4F7C82]">
            Current amount: <span className="font-medium">{amount}</span>
          </p>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button 
          className='btn btn-sm btn-primary mt-4' 
          type="submit" 
          disabled={!stripe || !clientSecret || loading || amount <= 0}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>

        {error && <p className='text-red-500 mt-2'>{error}</p>}

        {
          transactionId && (
            <p className='text-green-500 mt-2'>Payment successful. Transaction ID: {transactionId}</p>
          )
        }
      </form>
    </div>
  );
};

export default CheckOutForm;