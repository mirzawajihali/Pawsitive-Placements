import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PetCover from '../components/PetCover';


import ShowCategory from '../components/ShowCategory';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FaSearch, FaFilter } from 'react-icons/fa';


const Pets = () => {

    const [pets, setPets] = useState([]);
    const [searchBreed, setSearchBreed] = useState('');
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    
    // Advanced search filters
    const [filters, setFilters] = useState({
        age: '',
        gender: '',
        size: '',
        vaccinated: '',
        spayedNeutered: '',
        location: ''
    });

    useEffect(() => {
        const buildQueryString = () => {
            const params = new URLSearchParams();
            
            if (searchBreed) params.append('searchBreed', searchBreed);
            if (filters.age) params.append('age', filters.age);
            if (filters.gender) params.append('gender', filters.gender);
            if (filters.size) params.append('size', filters.size);
            if (filters.vaccinated) params.append('vaccinated', filters.vaccinated);
            if (filters.spayedNeutered) params.append('spayedNeutered', filters.spayedNeutered);
            if (filters.location) params.append('location', filters.location);
            
            return params.toString();
        };

        const fetchPets = () => {
            setLoading(true);
            const queryString = buildQueryString();
            const url = `https://pawsitive-placements-server.vercel.app/pets${queryString ? `?${queryString}` : ''}`;
            
            fetch(url)
            .then(res => res.json())
            .then(data => {
                setPets(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching pets:", error);
                setLoading(false);
            });
        };

        fetchPets();
    }, [searchBreed, filters]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchBreed('');
        setFilters({
            age: '',
            gender: '',
            size: '',
            vaccinated: '',
            spayedNeutered: '',
            location: ''
        });
    };

    const dogs = pets.filter(pet => pet.category === 'Dog');
    const cats = pets.filter(pet => pet.category === 'Cat');
  

    
    
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

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto mb-6 bg-white rounded-full">
          <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[#8d8d8d]" />
          <input
            onChange={(e) => setSearchBreed(e.target.value)}
            type="text"
            placeholder="Search by Breed"
            value={searchBreed}
            className="rounded-full w-full h-16 bg-transparent py-2 pl-14 pr-32 outline-none border-2 border-[#d8d7d7] shadow-md hover:outline-none focus:ring-[#8d8d8d] focus:border-[#626262]"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-[#2A6FA8] text-white rounded-lg hover:bg-[#1e5a8a] transition-colors"
          >
            <FaFilter />
            {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Age Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={filters.age}
                  onChange={(e) => handleFilterChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                />
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                >
                  <option value="">All Sizes</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                />
              </div>

              {/* Vaccinated Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vaccinated</label>
                <select
                  value={filters.vaccinated}
                  onChange={(e) => handleFilterChange('vaccinated', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Spayed/Neutered Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spayed/Neutered</label>
                <select
                  value={filters.spayedNeutered}
                  onChange={(e) => handleFilterChange('spayedNeutered', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A6FA8]"
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      { loading ? <div className='flex justify-center items-center h-screen'><span className="loading loading-bars loading-xl"></span></div>  :
      <div>
        <TabPanel>
    <ShowCategory pets={dogs} animal="Dogs"/>
    </TabPanel>
    <TabPanel>
    <ShowCategory pets={cats} animal="Cats"/>
    </TabPanel>
      </div>
      }
   

    
  </Tabs>
            
           

        </div>
    );
};

export default Pets;