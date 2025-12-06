import React, { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { useCart } from '../ShoppingCart/Shoppingcart.js';
import './animeFigures.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

const AnimeFigures = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [paginationLink, setPaginationLink] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(() => {
        const storedPage = localStorage.getItem("currentPage");
        return storedPage ? Number(storedPage) : 1;
    });
    const [totalPages, setTotalPages] = useState(null);
    const [title, setTitle] = useState(null);
    const [lastPage, setLastPage] = useState(null);

    const [priceRange, setPriceRange] = useState([0, 0]);
    const [minPriceRange, setMinPriceRange] = useState();
    const [maxPriceRange, setMaxPriceRange] = useState();

    const [switchProductsBtn, setSwitchProductsBtn] = useState(false);

    const url = `https://api.mrh-store.com/api/filter/%D9%81%DB%8C%DA%AF%D9%88%D8%B1-%D9%87%D8%A7%DB%8C-%D8%A7%D9%86%DB%8C%D9%85%D9%87`;

    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage && !isNaN(storedPage)) {
            setCurrentPage(Number(storedPage));
        };
    }, []);


    const fetchAnimeFiguresData = async (page) => {
        setLoading(true);
        try {
            const existFilter = switchProductsBtn ? "&exist=1" : "";
            const response = await axios.get(`${url}?page=${page}&sort=new${existFilter}`, {
                page: page,
                sort: "new",
                exist: existFilter,
            }, {
                headers: {
                    "content-type": "application/json",
                    authorization: `${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data);
            if (response.status === 200 && response.data.ok) {
                setProducts(response.data.data.products.data);
                setTitle(response.data.data.category.title);
                setTotalPages(response.data.data.products.total);
                setPaginationLink(response.data.data.products.links);
                setLastPage(response.data.data.products.last_page);

                setMinPriceRange(Number(response.data.data.min_price));
                setMaxPriceRange(Number(response.data.data.max_price));
                const minPrice = response.data.data.min_price;
                const maxPrice = response.data.data.max_price;
                if (minPrice && maxPrice) {
                    setPriceRange([minPrice, maxPrice]);
                } else {
                    console.error("Invalid min_price or max_price values.");
                };
            };
        } catch (error) {
            setError(error.message, "خطادردریافت داده ها");
            console.log(error.message, "خطادردریافت داده ها");
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchAnimeFiguresData(currentPage);
        localStorage.setItem("currentPage", currentPage);
        window.history.pushState(null, '', `?page=${Number(currentPage)}`);
    }, [currentPage]);

    const priceRangeHandler = (priceRangeValue) => {
        setPriceRange(priceRangeValue);
    };

    const filterPriceRangeProducts = async () => {
        try {
            const existFilter = switchProductsBtn ? "&exist=1" : "";
            const response = await axios.get(`https://api.mrh-store.com/api/filter/%D9%81%DB%8C%DA%AF%D9%88%D8%B1-%D9%87%D8%A7%DB%8C-%D8%A7%D9%86%DB%8C%D9%85%D9%87?page=${currentPage}&sort=new&min_price=${priceRange[0]}&max_price=${priceRange[1]}${existFilter}`, {
                page: currentPage,
                sort: "new",
                min_price: priceRange[0],
                max_price: priceRange[1],
                exist: existFilter
            });

            console.log(response.data);
            if (response.status === 200 && response.data.ok) {
                setProducts(response.data.data.products.data);
                setTotalPages(response.data.data.products.total);
                setPaginationLink(response.data.data.products.links);
                setLastPage(response.data.data.products.last_page);
            };

        } catch (error) {
            console.log(error.message);
        };
    };
    
    const handlePageChange = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const pageNumber = Number(urlParams.get("page"));

        if (!isNaN(pageNumber) && pageNumber > 0) {
            setCurrentPage(pageNumber);
        }
    };

    const handleAddToCart = (product) => {
        const hasPriceFeature = product.features.some(feature => feature.price);
        hasPriceFeature ? addToCart(product) : alert('این محصول موجودنمی باشد.');
    };

    return (
        <div className="ecommerce-application h-full mt-[240px] flex gap-10 px-2">
            <div className="sidebar-shop mt-8">
                <div className="sidebar-card bg-[#201c2a]">
                    <div className="sidebar-cardBody p-4">
                        <div className="price-slider">
                            <div className="price-slider-title">
                                <h6 class="filter-title mb-0 text-[#ebeefd] text-[1rem]">محدوده قیمت</h6>
                            </div>
                            <div className="price-slider my-4">
                                <Slider
                                    className="rc-slider"
                                    range
                                    value={priceRange}
                                    onChange={priceRangeHandler}
                                    min={1100000}
                                    max={23400000}
                                    tipFormatter={(value) => `تومان ${value.toLocaleString('fa-IR')}`}
                                />
                            </div>
                            <p className="text-[#31eee8] text-base mb-4">
                                از <span>{priceRange[0].toLocaleString('fa-IR')}</span> تومان
                            </p>
                            <p className="text-[#31eee8] text-base mb-4">
                                تا <span>{priceRange[1].toLocaleString('fa-IR')}</span> تومان
                            </p>
                            <div className="price-slider-title flex flex-col">
                                <h6 class="filter-title mb-0 text-[#ebeefd] text-[1rem]">موجود</h6>
                                <div className="switch-prosucts-btn self-end" style={{ backgroundColor: switchProductsBtn ? "rgb(0, 136, 0)" : "" }} onClick={() => setSwitchProductsBtn(!switchProductsBtn)}>
                                    <span className="switch-bundle-circle" style={{ transform: switchProductsBtn ? "translateX(0px)" : "" }}></span>
                                </div>
                            </div>
                            <button className="bg-[#31eee8] rounded-md pt-2 pb-3 text-center w-full mt-4 text-base" onClick={filterPriceRangeProducts}>
                                اعمال فیلتر
                            </button>
                        </div>
                    </div>
                </div>

            </div>


            <div className='shop-content flex-auto'>
                <div className="title-wrapper mb-2 flex justify-between mt-5 w-full">
                    <h6 className="title"><span>{title}</span></h6>
                    <h6 className="total-Products"><span className="mr-1 ml-4">{totalPages} کالا</span></h6>
                </div>
                <div className="w-full mt-5 mb-8">
                    <div className="view-order-options mb-2">
                        <svg className="MuiSvgIcon-root ml-1" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                        <span>مرتب سازی براساس</span>
                        <button type="button" className="p-0 mx-5 sort selected">جدیدترین</button>
                        <button type="button" className="p-0 mx-5 sort">پر فروش ترین</button>
                        <button type="button" className="p-0 mx-5 sort">گران ترین</button>
                        <button type="button" className="p-0 mx-5 sort">ارزان ترین</button>
                        <button type="button" className="p-0 mx-5 sort">تخفیف ویژه</button>
                        <button type="button" className="p-0 mx-5 sort">پیشنهادات روزانه</button>
                    </div>
                </div>
                <div className='products'>
                    <div className='flex items-center gap-5 flex-wrap w-full'>
                        {products.map((productItem) => {
                            return (
                                <div key={productItem.product_id} className='w-[22%]'>
                                    <div className='product-card card pb-4 cursor-pointer'>
                                        <div className='image-wrapper flex justify-center w-[98%] h-[260px] overflow-hidden p-1'>
                                            {productItem.images.filter((image) => image.product_id === productItem.product_id)
                                                .filter((image) => image.is_main === "1")
                                                .map((image) => (
                                                    <img key={image.image_id} src={image.image_link} className='h-full w-full object-cover' />
                                                ))
                                            }
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title text-center ps-3 h-[53px]">{productItem.name}</h3>
                                            <div>
                                                <div className="btns-card flex items-center justify-center w-full ms-2">
                                                    <button className="add-card flex items-center justify-center" title="اضافه کردن به سبد خرید" aria-label="اضافه کردن به سبد خرید" onClick={() => handleAddToCart(productItem)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons-card"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></button>
                                                    <button className="quick-view-btn flex items-center justify-center" title="مشاهده" aria-label="مشاهده" id="QuickSeea3a072b46dfc26a3c1c0492168ba4c68"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons-card"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center flex-wrap justify-center gap-3">
                                                <div className="price">
                                                    <div className="text-toman text-bold text-[#31eee8] text-base">
                                                        {productItem.features && productItem.features.length > 0 ? (
                                                            productItem.features
                                                                .filter((featureProduct) => featureProduct.product_id === productItem.product_id)
                                                                .map((featureProduct) => (
                                                                    <span key={featureProduct.product_id}>
                                                                        {Number(featureProduct.price).toLocaleString('fa-IR')} تومان
                                                                    </span>
                                                                ))
                                                        ) : (
                                                            <>
                                                                <span>ناموجود</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pagination-container">
                    <div className="pagination-controls">
                        {paginationLink.map((paginate, index) => {
                            const isPrevious = paginate.label.toLowerCase().includes("previous");
                            const isNext = paginate.label.toLowerCase().includes("next");
                            return (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(paginate.url)}
                                    className={currentPage === Number(paginate.label) ? "active" : ""}
                                    disabled={isPrevious ? currentPage === 1 : isNext ? currentPage === lastPage : false}
                                >
                                    {isPrevious ? <FaChevronRight /> : isNext ? <FaChevronLeft /> : paginate.label}
                                </button>

                            );
                        })}
                    </div>
                </div>





                {/* <div className="pagination-container">
                    {loading && <p>در حال بارگذاری...</p>}
                    {error && <p>{error}</p>}
                    <div className="pagination-controls">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaChevronRight />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                </div> */}
            </div>
        </div >
    );
};

export default AnimeFigures;






