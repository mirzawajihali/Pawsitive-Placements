import React, { useContext, useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CheckOutForm = () => {
  // State variables
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false); // Add separate processing state
  const {user} = useContext(AuthContext);
  const [transactionId, setTransactionId]= useState('');

  // Hooks
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Reset states when amount changes
  useEffect(() => {
    setError("");
    setTransactionId('');
  }, [amount]);

  // Get client secret when amount changes
  useEffect(() => {
    if (amount > 0) {
      setLoading(true);
      axiosPublic.post("/create-payment-intent", {amount: amount})
        .then(res => {
          console.log("Client secret received:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error("Payment intent error:", err);
          setError("Failed to connect to payment server. Please ensure the server is running.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [axiosPublic, amount]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement);

    if(!card){
      return;
    }

    setProcessing(true); // Use processing state instead of loading
    setError("");

    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if(error){
        console.log("Payment method error:", error);
        setError(error.message);
        setProcessing(false);
        return;
      }
      
      console.log("Payment method created:", paymentMethod);

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
        console.log("Payment confirmation error:", confirmError);
        setError(confirmError.message);
        setProcessing(false);
        return;
      }
      
      console.log("Payment intent confirmed:", paymentIntent);
      if(paymentIntent.status === 'succeeded') {
        // Set transaction ID first to update UI immediately
        const paymentId = paymentIntent.id;
        setTransactionId(paymentId);
        
        const payment = {
          email: user.email,
          price: amount,
          date: new Date(),
          transactionId: paymentId,
        };

        try {
          const res = await axiosSecure.post('/payments', payment);
          console.log("Payment saved to database:", res.data);
          if(res.data.insertedId){
            alert("Payment successful!");
          }
        } catch (serverError) {
          console.error("Database error:", serverError);
          // Don't show this error to user as payment was successful
        }
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setError("An error occurred while processing your payment");
    } finally {
      setProcessing(false);
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
            disabled={processing}
          />
          <p className="text-sm text-[#4F7C82]">
            Current amount: <span className="font-medium">{amount}</span>
          </p>
        </div>
        
        <div className={processing ? 'opacity-50' : ''}>
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
              disabled: processing,
            }}
          />
        </div>
        
        <button 
          className='btn btn-sm btn-primary mt-4' 
          type="submit" 
          disabled={!stripe || !clientSecret || loading || processing || amount <= 0}
        >
          {processing ? 'Processing...' : loading ? 'Loading...' : 'Pay'}
        </button>

        {error && <p className='text-red-500 mt-2'>{error}</p>}

        {transactionId && (
          <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
            <p className='text-green-600'>Payment successful!</p>
            <p className='text-sm text-green-500'>
              Transaction ID: <span className='font-mono'>{transactionId}</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;