import { Link } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="header_menu bg-[#100e16]">
            <ul className="flex items-center justify-center gap-4 p-0 m-0">
                <li className="menu_item">
                    <Link to="/" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <svg className="w-[35px] h-[35px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">صفحه اصلی</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">HOME</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link to="/store" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <img src="https://api.mrh-store.com/files/assets/images/store.webp" />
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">فروشگاه</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">STORE</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item menu-item-has-childran">
                    <Link to="/" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/products.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-[#31eee8] text-[14px]">محصولات</span>
                                <span className="sub-menu-button text-[#31eee8]">
                                    <FaChevronLeft />
                                </span>
                            </div>
                            <span className="en-name text-[10px] text-[#cbcacb]">PRODUCTS</span>
                        </div>
                    </Link>
                    <div class="sub_menu">
                        <div class="box-item">
                            <Link to="Category/فیگور-های-انیمه" class="menu-item has-normal-hover">
                                <div class="flex justify-start">
                                    <div>فیگور های انیمه</div>
                                </div>
                            </Link>
                        </div>
                        <div class="box-item">
                            <Link to="Category/فیگور-های-غیر-انیمه" class="menu-item has-normal-hover">
                                <div class="flex justify-start">
                                    <div>فیگور های غیر انیمه</div>
                                </div>
                            </Link>
                        </div>
                        <div class="box-item">
                            <a class="menu-item has-normal-hover">
                                <div class="flex justify-start">
                                    <div className="text-nowrap">اکسسوری های کلکسیونی</div>
                                </div>
                            </a>
                        </div>
                        <div class="box-item">
                            <a class="menu-item has-normal-hover">
                                <div class="flex justify-start">
                                    <div>فیگور ساخت ما</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="menu_item">
                    <Link to="/gallery" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/gallery.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">گالری</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">GALLERY</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link to="/contactUs" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/contact.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">تماس باما</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">CONTACT US</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link to="/aboutUs" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/about.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">درباره ما</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">ABOUT US</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link to="/" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/articles.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">مقالات</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">ARTICLES</span>
                        </div>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link to="/" className="flex flex-row items-center justify-start gap-2 link">
                        <div className="icon_menu">
                            <span className="text-[15px]">
                                <img src="https://api.mrh-store.com/files/assets/images/terms.webp" />
                            </span>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span className="text-[#31eee8] text-[14px]">قوانین و مقررات</span>
                            <span className="en-name text-[10px] text-[#cbcacb]">TERMS AND CONDITIONS</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navigation;
