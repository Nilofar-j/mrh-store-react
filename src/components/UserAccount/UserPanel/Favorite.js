import React, { useEffect, useState } from 'react';
import { useAuth } from '../UserAccountProvider.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./UserPanel.css";
import { BsTrash3 } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";


const Favorite = () => {
    const [activeItem, setActiveItem] = useState(0);
    const { isAuthen, handleLogout, user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);

    const [favorite, setFavorite] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFavorites = async (pageNumber) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.mrh-store.com/api/customer/products/favorites?page=${pageNumber}`,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 200 && response.data.ok) {
                setFavorite(response.data.data.data);
                setPerPage(response.data.data.per_page);
                setTotalPages(Math.ceil(response.data.data.total / response.data.data.per_page));
            }
        } catch (error) {
            setError("خطا در دریافت اطلاعات: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites(page);
    }, [page]);

    if (isAuthen === null) {
        return null;
    }

    const handleActiveItem = (index) => {
        setActiveItem(index);
    };

    const openDeleteModal = (favoriteId) => {
        setSelectedFavoriteId(favoriteId);
        setShowModal(true);
    };

    const deleteFavoriteHandler = async () => {
        if (!selectedFavoriteId) return;
        setLoading(true);
        try {
            const response = await axios.delete(`https://api.mrh-store.com/api/customer/products/favorites/${selectedFavoriteId}`, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                console.log("Item removed from favorites");
                const updatedFavorites = favorite.filter(item => item.favorite_id !== selectedFavoriteId);
                setFavorite(updatedFavorites);

                if (updatedFavorites.length === 0 && page > 1) {
                    setPage(page - 1);
                }
            }
        } catch (error) {
            setError("خطا در حذف اطلاعات: " + error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
            setSelectedFavoriteId(null);
        }
    };

    return (
        <div className="wrapper vertical-layout theme-primary navbar-floating">
            <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow theme-primary collapsed bg-[#201c2a] px-1">
                <div className="navbar-header px-3 pt-4">
                    <ul className="nav navbar-nav flex items-center">
                        <li className="nav-item ml-auto">
                            <a aria-current="page" className="navbar-brand active" href="/">
                                <h2 class="brand-text text-[1.57rem]">MR-H</h2>
                            </a>
                        </li>
                        <li className="nav-item nav-toggle cursor-pointer">
                            <div className="nav-link modern-nav-toggle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon icon-x d-none d-xl-block font-medium-4 text-primary" data-tour="toggle-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                            </div>
                        </li>
                    </ul>
                    <div className="shadow-bottom d-none"></div>
                </div>
                <div className="scrollbar-container main-menu-content overflow-hidden mt-4">
                    <ul className="navigation navigation-main p-0 m-0">
                        <li className={`nav-item ${activeItem === 0 ? "active" : ""}`} onClick={() => handleActiveItem(0)}>
                            <Link to="/customer/dashboard">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    <span className="menu-item menu-title">داشبورد</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`nav-item ${activeItem === 1 ? "active" : ""}`} onClick={() => handleActiveItem(1)}>
                            <Link to="/customer/favorite">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <span className="menu-item menu-title">علاقه مندی ها</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`nav-item ${activeItem === 2 ? "active" : ""}`} onClick={() => handleActiveItem(2)}>
                            <a href="#">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    <span className="menu-item menu-title">سفارشات</span>
                                </div>
                            </a>
                        </li>
                        <li className={`nav-item ${activeItem === 3 ? "active" : ""}`} onClick={() => handleActiveItem(3)}>
                            <a href="#">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    <span className="menu-item menu-title">نظرات</span>
                                </div>
                            </a>
                        </li>
                        <li className={`nav-item ${activeItem === 4 ? "active" : ""}`} onClick={() => handleActiveItem(4)}>
                            <a href="#">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                                    <span className="menu-item menu-title">آدرس</span>
                                </div>
                            </a>
                        </li>
                        <li className={`nav-item ${activeItem === 5 ? "active" : ""}`} onClick={() => handleActiveItem(5)}>
                            <a href="#">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                    <span className="menu-item menu-title">فاکتور ها</span>
                                </div>
                            </a>
                        </li>
                        <li className={`nav-item ${activeItem === 6 ? "active" : ""}`} onClick={() => handleActiveItem(6)}>
                            <Link to="/customer/profile">
                                <div className="menu-text flex items-center text-base">
                                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className="menu-item menu-title">پروفایل</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="header-navbar-shadow"></div>
                <nav class="header-navbar navbar navbar-shadow navbar-light floating-nav bg-[#201c2a]">
                    <div class="navbar-wrapper flex justify-end text-[#31eee8]">
                        <div className="relative">
                            <div className="user-nav flex items-center gap-2 relative cursor-pointer pt-4 pl-4" onClick={() => setShowDropdown(!showDropdown)}>
                                <a href='/' className='text-xl ml-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                </a>
                                <span className='text-base'>{user.firstName} {user.lastName}</span>
                            </div>
                            <div className={`dropdown-menu absolute z-10 ${showDropdown ? 'show' : ""}`}>
                                <Link to="/customer/profile" className="dropdown-item flex items-center gap-4 px-3 pt-2 pb-1">
                                    <span>
                                        <svg className='text-2xl' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </span>
                                    <span className="align-middle">پروفایل</span>
                                </Link>
                                <div tabindex="-1" class="dropdown-divider"></div>
                                <Link to="/" className="dropdown-item flex items-center gap-3 px-3 pt-1 pb-3">
                                    <span>
                                        <svg className='text-xl' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                                    </span>
                                    <span className="align-middle" onClick={handleLogout}>خروج</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="content-wrapper">
                    <div className="content-header flex items-center justify-start">
                        <h1 className="content-header-title text-white text-3xl font-sans py-2 pe-4">علاقه‌مندی</h1>
                        <span className="breadcrumb-item border-r border-r-[#d6dbe1] text-[#31eee8] self-end py-2 ps-4">
                            <Link to="/customer/dashboard">داشبورد</Link>
                        </span>
                    </div>

                    <div className="data-list list-view">
                        <div className="data-list-header flex items-center justify-between">
                            <div className="actions-right">
                                {/* <div className="pagination flex items-center gap-2 mt-4">
                                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                                        <FiChevronLeft />
                                    </button>
                                    <span>صفحه {page} از {totalPages}</span>
                                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                                        <FiChevronRight />
                                    </button>
                                </div> */}

                                {totalPages > 1 && (
                                    <div className="pagination flex items-center gap-2 mt-4">
                                        <button
                                            className="w-[40px] h-[40px] text-[#31eee8] px-3 py-1 disabled:text-[#b8b8b8]"
                                            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                                            disabled={page === 1}
                                        >
                                            <FiChevronRight />
                                        </button>

                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index}
                                                className={`px-3 py-1 rounded ${page === index + 1 ? "bg-[#31eee8] text-[#201c2a]" : "text-[#31eee8] bg-[#201c2a]"}`}
                                                onClick={() => setPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button
                                            className="w-[40px] h-[40px] text-[#31eee8] px-3 py-1 disabled:text-[#b8b8b8]"
                                            onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                                            disabled={page === totalPages}
                                        >
                                            <FiChevronLeft />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="actions-left"></div>
                        </div>

                        <div className="favorites-wrapper grid grid-cols-2 gap-8 mt-10">
                            {loading ? (
                                <p>در حال بارگذاری...</p>
                            ) : favorite.length > 0 ? (
                                favorite.map((favoriteItem) => (
                                    <>
                                        <div className="w-full">
                                            <div key={favoriteItem.product.product_id} className="favorite-card bg-[#201c2a] p-4 rounded-lg h-full relative">
                                                <div className="card-body flex">
                                                    <div className="item-img text-center">
                                                        {favoriteItem.product.images.filter(image => image.is_main === "1")
                                                            .map((image) => {
                                                                return <img key={image.image_id} src={image.image_link} alt="favorite" className="w-[130px] h-[100%]" />
                                                            })
                                                        }
                                                    </div>
                                                    <div class="my-auto mx-4 text-[#31eee8]">
                                                        {favoriteItem.product.name}
                                                    </div>
                                                </div>
                                                <button
                                                    className="absolute top-5 left-5 text-[#ea5455] text-base"
                                                    onClick={() => openDeleteModal(favoriteItem.favorite_id)}
                                                >
                                                    <BsTrash3 />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <p>موردی برای نمایش وجود ندارد.</p>
                            )}
                        </div>

                        {showModal && (
                            <div className={`modal-wrapper fixed top-0 right-0 w-full h-[105vh] z-20 flex items-center justify-center ${showModal ? "show" : ""}`}>
                                <div className="modal-dialog w-[500px] m-auto">
                                    <div className="modal-content bg-[#171420] rounded-md">
                                        <div className="modal-header bg-[#201c2a] text-white rounded-md p-3 relative">
                                            <h5>ثبت اطلاعات</h5>
                                            <button type="button" className="close text-2xl bg-[#171420] p-1 absolute top-[-10px] left-[-10px] w-[30px] h-[30px] flex items-center justify-center rounded-md" aria-label="Close" onClick={() => setShowModal(false)}>
                                                <span className="pb-1" aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body text-[#31eee8] text-right p-3">
                                            <p>آیا می خواهید گزینه مورد نظر حذف شود؟</p>
                                        </div>
                                        <div className="modal-footer flex items-center justify-end p-2">
                                            <button type="button" className="bg-Primary btn btn-Primary text-[#b8b8b8] me-5" onClick={() => setShowModal(false)}>بستن</button>
                                            <button type="button" className="bg-warning btn btn-warning bg-[#ea5455] px-7 py-2 text-center rounded-md text-white" disabled={loading} onClick={deleteFavoriteHandler}>
                                                {loading ? "درحال حذف" : "حذف"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
export default Favorite;

