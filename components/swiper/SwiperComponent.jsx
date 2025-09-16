// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverFlow, Pagination, Navigation } from 'swiper'
const SwiperComponent = () => {
    return (
        <div style={{
            width: "80vw",
            height: '100vh',
        }}
        >

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={
                    {
                        rotate: 0,
                        stretch: 0,
                        modifier: 2.5,
                        depth: 100,
                    }
                }
                className='swiper-container'
            >
  <SwiperSlide style={{ width: "300px" }}>Slide 1</SwiperSlide>
  <SwiperSlide style={{ width: "300px" }}>Slide 2</SwiperSlide>
  <SwiperSlide style={{ width: "300px" }}>Slide 3</SwiperSlide>
  <SwiperSlide style={{ width: "300px" }}>Slide 4</SwiperSlide>
                ...
            </Swiper>
        </div>
    );
};
export default SwiperComponent;