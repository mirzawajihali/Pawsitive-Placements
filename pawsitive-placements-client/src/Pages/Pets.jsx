import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PetCover from '../components/PetCover';

import ShowCategory from '../components/ShowCategory';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const Pets = () => {

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/pets')
            .then(res => res.json())
            .then(data => {
               

                setPets(data);
                setLoading(false);
            })
    }, []);

    const dogs = pets.filter(pet => pet.category === 'Dog');
    const cats = pets.filter(pet => pet.category === 'Cat');
  

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

            <Tabs>
            <TabList className="flex justify-center items-center gap-8 pb-2 border-b border-gray-200">
        <Tab
          className="px-6 py-3  font-bold text-xl text-gray-800 relative transition-all duration-300 hover:text-[#2A6FA8]"
          selectedClassName="border-b-4 text-[#2A6FA8] rounded-lg border-[#B9D9EB]"
        >
          Dog
        </Tab>
        <Tab
          className="px-6 py-3  text-xl font-bold text-gray-800 relative transition-all duration-300 hover:text-[#2A6FA8]"
          selectedClassName="border-b-4 text-[#2A6FA8] rounded-lg border-[#B9D9EB]"
        >
         Cat
        </Tab>
      </TabList>


    <TabPanel>
    <ShowCategory pets={dogs} animal="Dogs"/>
    </TabPanel>
    <TabPanel>
    <ShowCategory pets={cats} animal="Cats"/>
    </TabPanel>
  </Tabs>
            
           

        </div>
    );
};

export default Pets;