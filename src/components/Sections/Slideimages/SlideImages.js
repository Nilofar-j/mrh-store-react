import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./SectionIntroduction.css";

import useFetchData from '../../FetchData/useFetchData';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const SectionIntroduction = () => {
     const { data, loading, error } = useFetchData('https://api.mrh-store.com/api/ui');

    return (
        <section className='section-introduction mt-[170px]'>
            <Swiper
                cssMode={true}
                loop={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                className="slider"
            >
                <SwiperSlide>
                    <img src="https://api.mrh-store.com/files/uploads/images/sliders/07923d96525d87e6d875f1f3dc042f4f.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://api.mrh-store.com/files/uploads/images/sliders/a34b822176323db192c7a7614dc9ff26.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://api.mrh-store.com/files/uploads/images/sliders/3a124701ed00022d4346a18de0a4123f.webp" />
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default SectionIntroduction;
