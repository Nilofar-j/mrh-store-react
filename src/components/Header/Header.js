import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation.js";
import { useCart } from "../ShoppingCart/Shoppingcart.js";
import { useAuth } from "../UserAccount/UserAccountProvider.js";
import './Header.css';
import { useState } from "react";
import axios from "axios";

const Header = () => {
    const { cart, calculateTotal } = useCart();
    const { isAuthen, handleLogout, user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query.trim() === "") {
            setProducts([]);
            return;
        };

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.mrh-store.com/api/search?s=${query}`, {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200 && response.data.ok) {
                    setProducts(Object.values(response.data)[1].products);
                } else {
                    setError("Error fetching data");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    const searchProductsHandler = (e) => {
        setQuery(e.target.value);
    };

    if (isAuthen === null) {
        return null;
    };

    return (
        <header className="bg-[#171420] fixed top-0 w-full z-10 h-[180px]">
            <div className="header_main flex items-center justify-between py-3 ps-16 pe-12 w-full">
                <div className="box-right flex items-center text-base gap-10">
                    <div className="user-account text-[#31eee8]">
                        {isAuthen ? (
                            <div className="relative">
                                <div className="user-nav flex items-center gap-2 relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                    <span>{user.firstName} {user.lastName}</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </span>
                                </div>
                                <div className={`dropdown-menu absolute top-0 z-10 ${showDropdown ? 'show' : ""}`}>
                                    <Link to="/customer/dashboard" className="dropdown-item flex items-center gap-4 px-3 pt-2 pb-1">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </span>
                                        <span className="align-middle">پنل</span>
                                    </Link>
                                    <div tabindex="-1" class="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item flex items-center gap-3 px-3 pt-1 pb-3">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                                        </span>
                                        <span className="align-middle" onClick={handleLogout}>خروج</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <Link to='login'>
                                <div className="flex flex-row flex-nowrap items-center gap-2">
                                    <span className="text-[#31eee8]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </span>
                                    <span className="text-[#31eee8]">حساب کاربری</span>
                                </div>
                            </Link>
                        )}
                    </div>
                    <div className="text-base">
                        <Link to='Shoppingcart/سبدخرید' className="flex flex-row items-center gap-2">
                            <span className="text-[#31eee8] relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cart-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                {cart.length === 0 ? (
                                    <span className={"invisible"}></span>
                                ) : (
                                    <span className="absolute total-product flex items-center justify-center p-1 pb-2 top-0 right-0">
                                        {cart.length}
                                    </span>
                                )}

                            </span>
                            <div className="flex flex-col items-start text-[#31eee8]">
                                <span>
                                    سبدخرید
                                </span>
                                {calculateTotal() === 0 ? (
                                    <span className="invisible"></span>
                                ) : (
                                    <span className="text-wrapper d-inline">
                                        {Number(calculateTotal()).toLocaleString('fa-IR')}
                                    </span>
                                )}

                            </div>
                        </Link>
                    </div>
                </div>
                <div className="box-center">
                    <a href="#">
                        <img src="https://mrh-store.com/static/media/logo.8ea9ff34.png" className="logo" alt="logo" width="125px" />
                    </a>
                </div>
                <div className="box-left ml-4">
                    <form onSubmit={(e) => e.preventDefault()} className="flex items-center justify-between border border-[#ed1ce7] rounded-2xl p-2 pl-4 w-[280px] h-[40px] relative">
                        <input type="text" placeholder="جستجوی نام محصول..."
                            value={query}
                            onChange={searchProductsHandler}
                            className="form_control outline-none border-0 bg-transparent text-[#31eee8] text-sm placeholder:text-[#31eee8] placeholder:text-sm" />
                        <button className="text-[#31eee8]">
                            <Link to="/search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </Link>
                        </button>

                        {products.length > 0 && query.trim() !== "" && (
                            <div className="search-results list-group absolute top-[110%] right-0 z-10 w-[300px] bg-[#201c2a] border-[#414561] overflow-hidden rounded-[20px]">
                                {products.length === 1 ? (
                                    <div key={products[0].id} className="w-full list-group-item border border-[#414561] py-2 px-3 rounded-[20px 20px 0px 0px] overflow-hidden">
                                        <a href="#" className="block w-full">
                                            <div className="flex flex-row items-center">
                                                <div className="image-wrapper w-[70px] h-[70px] flex items-center justify-center me-3">
                                                    {products[0].images
                                                        .filter((productImage) => productImage.is_main === "1")
                                                        .map((image) => (
                                                            <img key={image.image_id} src={image.image_link} className="w-[60px] h-[60px] max-w-none object-cover" />
                                                        ))}
                                                </div>
                                                <h6 className="text-[#31eee8] text-[.9rem]">{products[0].name}</h6>
                                            </div>
                                        </a>
                                    </div>
                                ) : (
                                    products.map((product) => (
                                        <div key={product.id} className="w-full list-group-item border border-[#414561] py-2 px-3 rounded-[20px 20px 0px 0px] overflow-hidden">
                                            <a href="#" className="block w-full">
                                                <div className="flex flex-row items-center">
                                                    <div className="image-wrapper w-[70px] h-[70px] flex items-center justify-center me-3">
                                                        {product.images
                                                            .filter((productImage) => productImage.is_main === "1")
                                                            .map((image) => (
                                                                <img key={image.image_id} src={image.image_link} className="w-[60px] h-[60px] max-w-none object-cover" />
                                                            ))}
                                                    </div>
                                                    <h6 className="text-[#31eee8] text-[.9rem]">{product.name}</h6>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Navigation />
        </header>
    );
};

export default Header;


// const Header = () => {
//     const { cart, calculateTotal } = useCart();
//     const { isAuthen, handleLogout, user } = useAuth();
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [query, setQuery] = useState("");
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);

//     if (isAuthen === null) {
//         return null;
//     };

//     const searchProductsHandler = async (e) => {
//         e.preventDefault();
//         setQuery(e.target.value);
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://api.mrh-store.com/api/search?s=${query}`, {
//                 headers: {
//                     "content-type": "application/json",
//                     Authorization: `${localStorage.getItem("token")}`,
//                 }
//             });
//             console.log(response);
//             setProducts(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <header className="bg-[#171420] fixed top-0 w-full z-10 h-[180px]">
//             <div className="header_main flex items-center justify-between py-3 ps-16 pe-12 w-full">
//                 <div className="box-left ml-4">
//                     <form className="flex items-center justify-between border border-[#ed1ce7] rounded-2xl p-2 pl-4 w-[280px]">
//                         <input
//                             type="text"
//                             placeholder="جستجوی نام محصول..."
//                             value={query}
//                             onChange={searchProductsHandler}
//                             className="form_control outline-none border-0 bg-transparent text-[#31eee8] text-sm placeholder:text-[#31eee8] placeholder:text-sm"
//                         />
//                         <button type="submit" className="text-[#31eee8]">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                 <circle cx="11" cy="11" r="8"></circle>
//                                 <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                             </svg>
//                         </button>
//                     </form>

//                     {loading ? (
//                         <p>در حال بارگذاری...</p>
//                     ) : (
//                         <div className="search-results mt-4">
//                             {products.length > 0 ? (
//                                 products.map((product) => (
//                                     <div key={product.id} className="product-item flex items-center gap-4 mb-4">
//                                         <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
//                                         <div>
//                                             <span className="block text-lg font-semibold">{product.name}</span>
//                                             <span className="text-sm text-gray-500">{product.price} تومان</span>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>هیچ محصولی یافت نشد</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <Navigation />
//         </header>
//     );
// };

// export default Header;
