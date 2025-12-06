import React, { useState, useEffect } from "react";
import useFetchData from "../../FetchData/useFetchData.js";
import { useAuth } from "../../UserAccount/UserAccountProvider.js";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Autoplay } from "swiper/modules";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../specialIntroduction.css";
import axios from "axios";

const DailyProducts = () => {
    const { data } = useFetchData("https://api.mrh-store.com/api/ui");
    const { isAuthen } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favouriteStatus, setFavouriteStatus] = useState(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || {};
        return storedFavourites;
    });

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || {};
        setFavouriteStatus(storedFavourites);
    }, []);

    const resData = data?.data?.daily_products ? Object.values(data.data.daily_products) : [];

    const favouriteHandler = async (productId) => {
        if (!isAuthen) {
            navigate("/login");
            return;
        }

        if (loading) return; 

        setLoading(true);
        try {
            const response = await axios.post(
                "https://api.mrh-store.com/api/customer/products/favorites",
                { product_id: productId },
                {
                    headers: {
                        "content-type": "application/json",
                        authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                const updatedFavourites = {
                    ...favouriteStatus,
                    [productId]: !favouriteStatus[productId], // تغییر وضعیت
                };

                setFavouriteStatus(updatedFavourites);
                localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
            }
        } catch (error) {
            console.log("خطا در تغییر علاقه‌مندی:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="special-section w-full py-5">
            <div className="flex justify-end pt-2 pr-1">
                <a className="visit-all-btn rounded-md relative bg-transparent flex" href="#">
                    <button className="custom-btn flex items-center justify-between cursor-pointer text-[#31eee8] border-0 bg-transparent overflow-hidden relative outline-none">
                        مشاهده بیشتر
                        <div className="icon-visit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </div>
                    </button>
                </a>
            </div>
            <div className='container px-4 flex flex-col md:flex-row justify-center'>
                <div className="flex justify-center flex-col items-center flex-initial md:w-[25%]">
                    <img src="https://mrh-store.com/static/media/Offers.eca81a97.webp" alt="تخفیفات ویژه مستر اچ" className="w-full max-w-[325px] self-center section-img" />
                </div>
                <div className='sm:w-full md:w-[75%]'>
                    <div className='products'>
                        <Swiper
                            navigation={{
                                clickable: true,
                            }}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            speed={500}
                            mousewheel={true}
                            modules={[Navigation, Mousewheel, Autoplay]}
                            slidesPerView={3}
                            spaceBetween={10}
                            className="discount_swiper"
                        >
                            {resData.map((discountItem, index) => (
                                <SwiperSlide key={discountItem.product_id}>
                                    <div className="product-card card bg-[#201c2a] pb-4">
                                        <div className="image-wrapper flex items-center justify-center">
                                            {discountItem.images.filter((image) => image.product_id === discountItem.product_id)
                                                .filter((image) => image.is_main === "1")
                                                .map((image) => (
                                                    <img key={image.image_id} src={image.image_link} className='max-h-[260px] object-contain' />
                                                ))
                                            }
                                        </div>
                                        <div className="card-body flex flex-col items-center justify-around h-[145px] text-center px-3">
                                            <h3 className="card-title text-center">{discountItem.name}</h3>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="btns-card flex items-center justify-center my-1">
                                                    <button className="add-card flex items-center justify-center ms-4 ps-1" title="اضافه کردن به سبد خرید" aria-label="اضافه کردن به سبد خرید" id="AddToCard2d8afbd02fc40e3a15287154c776aae1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                    </button>
                                                    <button className="quick-view-btn flex items-center justify-center" title="مشاهده" aria-label="مشاهده" id="QuickSee2d8afbd02fc40e3a15287154c776aae1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons-card"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                    </button>
                                                    <button className="favourite text-3xl"
                                                        onClick={() => favouriteHandler(discountItem.product_id)}
                                                        disabled={loading}
                                                    >
                                                        <span className="text-[#ea5455]">
                                                            {favouriteStatus[discountItem.product_id] ? <FaHeart /> : <FaRegHeart />}
                                                        </span>
                                                    </button>
                                                </div>
                                                {discountItem.features.filter(fitureProduct => fitureProduct.product_id === discountItem.product_id)
                                                    .map(fitureProduct => (
                                                        <div key={fitureProduct.id} className="price flex flex-col flex-wrap items-end w-fit">
                                                            < p className="text-toman offer text-smaller flex justify-center card-text" >
                                                                <span>{Number(fitureProduct.price).toLocaleString('fa-IR')} </span>تومان
                                                            </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div >
            </div >
        </section >
    );
};

export default DailyProducts;
