import React from 'react';
import { Helmet } from 'react-helmet';
import PetCover from '../components/PetCover';
import usePets from '../hooks/usePets';

const Pets = () => {
    const [pets, loading] = usePets();
    const dogs = pets.filter(pet => pet.category === 'dog');
    const cats = pets.filter(pet => pet.category === 'cat');

    if(loading){
        return <div className='flex justify-center items-center h-screen'><span className="loading loading-bars loading-xl"></span></div>
    }
    return (
        <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Pets</title>
                
            </Helmet>
            <PetCover/>
        </div>
    );
};

export default Pets;