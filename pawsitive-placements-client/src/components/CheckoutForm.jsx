import React, { useContext, useEffect, useState } from 'react';


import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';

import useAxiosSecure from '../hooks/useAxiosSecure'
import { AuthContext } from '../Provider/AuthProvider';


const CheckOutForm = () => {

  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const {user} = useContext(AuthContext)


    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();


    useEffect(()=> {

      axiosSecure.post("/create-payment-intent", {price : amount})
     .then(res =>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.setClientSecret)
     })

    }, [axiosSecure, amount])

    const handleSubmit = async() =>{
        event.preventDefault();

        if(!stripe || !elements){
        return;

        }


        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type : 'card',
          card,
        })

        if(error){
          console.log("payment error",error);
          setError(error.message)

        }
        else{
          console.log("payment method ",paymentMethod)
          setError("")
        }


        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
          payment_method :{
            card : card,
            billing_details :{
              email : user?.email || 'anonymous',
              name : user?.displayName || 'anonymous'
            }
          }
        })

        if(confirmError){
          console.log("confirm error")
        }

        else{
          console.log("payment intent ", paymentIntent)
        }
    }
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
      <button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret }>
        Pay
      </button>

      <p className='text-red-500'>{error}</p>
    </form>
            
        </div>
    );
};

export default CheckOutForm;