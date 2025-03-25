import React from 'react';
import SectionTitle from './SectionTitle';
import PetCard from './PetCard';

const ShowCategory = ({pets, animal}) => {

   console.log(pets);
    
    return (
        <div>
            <SectionTitle title={`${animal} Section`} description={`Explore a wide range of ${animal} available for adoption.`} />

           <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           {
               pets.map(pet => {
                return (
                 <PetCard  key={pet.id} pet={pet}/>
                )
            })
            }
           </div>

        </div>
    );
};

export default ShowCategory;