import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PetCover from '../components/PetCover';


import ShowCategory from '../components/ShowCategory';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FaSearch } from 'react-icons/fa';


const Pets = () => {

    const [pets, setPets] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('https://pawsitive-placements-server.vercel.app/pets')
    //         .then(res => res.json())
    //         .then(data => {
               

    //             setPets(data);
    //             setLoading(false);
    //         })
    // }, []);

  
   
  
    const [searchBreed, setSearchBreed]= useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true);
        fetch(`https://pawsitive-placements-server.vercel.app/pets?searchBreed=${searchBreed}`)
        .then(res => res.json())
        .then(data => {
            setPets(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching pets:", error);
            setLoading(false);
        });
    },[searchBreed]);




    const dogs = pets.filter(pet => pet.category === 'Dog');
    const cats = pets.filter(pet => pet.category === 'Cat');
  

    // if(loading){
    //     return <div className='flex justify-center items-center h-screen'><span className="loading loading-bars loading-xl"></span></div>
    // }
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
    <div className="relative w-full mt-6 max-w-xl flex justify-self-center mx-5 bg-white rounded-full">
    <FaSearch className="absolute  left-8 top-1/2 transform -translate-y-1/2 text-[#8d8d8d]" />
                    <input
                    onKeyUp={(e) => setSearchBreed(e.target.value)}
                    type="text"
                    placeholder="Search by Breed"
                    className="rounded-full w-full  h-16 bg-transparent py-2 pl-14 pr-32 outline-none border-2 border-[#d8d7d7] shadow-md hover:outline-none focus:ring-[#8d8d8d] focus:border-[#626262]"
                    />
                   
                </div>
    <ShowCategory pets={dogs} animal="Dogs"/>
    
    </TabPanel>
    <TabPanel>
    <div className="relative w-full max-w-xl mt-6 flex justify-self-center mx-5 bg-white rounded-full">
    <FaSearch className="absolute  left-8 top-1/2 transform -translate-y-1/2 text-[#8d8d8d]" />
                    <input
                    onKeyUp={(e) => setSearchBreed(e.target.value)}
                    type="text"
                    placeholder="Search by Breed"
                    className="rounded-full w-full  h-16 bg-transparent py-2 pl-14 pr-32 outline-none border-2 border-[#d8d7d7] shadow-md hover:outline-none focus:ring-[#8d8d8d] focus:border-[#626262]"
                    />
                   
                </div>
    <ShowCategory pets={cats} animal="Cats"/>
    </TabPanel>
  </Tabs>
            
           

        </div>
    );
};

export default Pets;