import React from 'react';
import SectionTitle from './SectionTitle';
import PetCard from './PetCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './showCategory.css';



// import required modules
import { Pagination } from 'swiper/modules';



// Function to chunk array into groups
const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };
const ShowCategory = ({pets, animal}) => {

    const petChunks = chunkArray(pets, 6);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };

    
    return (
        <div>
            <SectionTitle title={`${animal} Section`} description={`Explore a wide range of ${animal} available for adoption.`} />

            <Swiper
      modules={[Pagination]}
      pagination={pagination}
      spaceBetween={20}
      slidesPerView={1}
         
        className="mySwiper"
    >
      {petChunks.map((chunk, index) => (
        <SwiperSlide key={index}>
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {chunk.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

         

        </div>
    );
};

export default ShowCategory;