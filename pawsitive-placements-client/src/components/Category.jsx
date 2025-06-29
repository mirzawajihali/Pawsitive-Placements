import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import SectionTitle from './SectionTitle';

const Category = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <SectionTitle title="Our Categories" description="Explore a wide range of options tailored just for you." />
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="!pb-[50px]"
            >
                <SwiperSlide className="!w-[300px] !h-[300px]">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Dog" 
                        />
                        <h1 className="absolute bottom-4 left-4 text-white text-2xl  font-bold">Dogs</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[300px] !h-[300px]">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://images.unsplash.com/photo-1626448083198-215a269afd33?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Birds" 
                        />
                        <h1 className="absolute bottom-4 left-4 text-white text-2xl  font-bold">Birds</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[300px] !h-[300px]">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://images.unsplash.com/photo-1536590158209-e9d615d525e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="cat" 
                        />
                        <h1 className="absolute bottom-4 left-4 text-white text-2xl font-bold">Cats</h1>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;