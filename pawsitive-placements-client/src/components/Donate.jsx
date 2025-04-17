import React from 'react';
import SectionTitle from './SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


const Donate = () => {

    return (
        <div>
            <div className="max-w-7xl h-16 mx-auto bg-black"> </div>
            <SectionTitle title ="Donation" description="Donate for animals "></SectionTitle>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>


        </div>
    );
};

export default Donate;