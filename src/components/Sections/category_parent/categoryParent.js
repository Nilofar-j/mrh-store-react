import useFetchData from "../../FetchData/useFetchData.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './categoryParent.css';

const SectionCategories = () => {
    const { data, loading, error } = useFetchData('https://api.mrh-store.com/api/ui');
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const resData = Object.values(data.data.category_parent);
    
    return (
        <>
            <section className='category_parents my-2 w-[90%] mx-auto overflow-hidden'>
                <div className="relative title-category-page flex items-center pb-1 justify-center py-3 ">
                    <div className="title inline">
                        <h2 className="text-center">محصولات
                            <span class="title-shadow">محصولات</span>
                        </h2>
                    </div>
                </div>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={40}
                    navigation={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Navigation]}
                    className="swiper_categories"
                >
                    {resData.map((category) => {
                        return (
                            <SwiperSlide>
                                <div className="flex justify-center div-cat text-center">
                                    <img src={category.image_link} alt="اکسسوری های کلکسیونی" class="img-category rounded" />
                                </div>
                                <h2 className="category-title text-center">{category.title}</h2>
                                <div className="text-center">
                                    <a className="text-center text-[#31eee8] flex items-center justify-center" href="#">
                                        <span>مشاهده بیشتر</span>
                                        <svg className="pt-2 text-3xl" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                                    </a>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section >
        </>
    );
};

export default SectionCategories;
