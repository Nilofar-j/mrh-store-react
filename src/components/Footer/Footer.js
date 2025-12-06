import './Footer.css';
import { ImWhatsapp } from "react-icons/im";
import { PiTelegramLogoBold } from "react-icons/pi";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className="footer py-5">
            <div className="main-footer w-[90%] mx-auto pb-8">
                <h1 className='px-5 py-2 text-[#31eee8] flex items-center text-2xl'>
                    <svg className='text-2xl mt-2 me-2' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                    <span>خریداکشن فیگور</span>
                </h1>
                <div className='grid grid-cols-4 gap-8 mt-8'>
                    <div className='w-[85%] mx-auto'>
                        <div className="distance">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div class="icon-title text-[#31eee8]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                </div>
                                <h3 class="footer-title text-[#31eee8]">لینک های سریع</h3>
                            </div>
                            <div className="flex justify-center flex-col pages-link">
                                <a className="page-details text-center" href="#">صفحه اصلی</a>
                                <a className="page-details text-center" href="#">اکشن فیگور</a>
                                <a className="page-details text-center" href="#">فیگور های انیمه</a>
                                <a className="page-details text-center" href="#">فیگور های غیر انیمه</a>
                                <a className="page-details text-center" href="#">اکسسوری های کلکسیونی</a>
                                <a className="page-details text-center" href="#">مقالات</a>
                                <a className="page-details text-center" href="#">تماس با ما</a>
                                <a className="page-details text-center" href="#">قوانین و مقررات</a>
                            </div>
                        </div>
                    </div>
                    <div className='w-[85%] mx-auto'>
                        <div className="distance flex flex-col">
                            <div className="flex justify-center items-center gap-4 mb-4">
                                <div className="icon-title text-[#31eee8]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <h3 className="footer-title text-[#31eee8]">ارتباط با ما</h3>
                            </div>
                            <div className="phones">
                                <div className="item">
                                    <div className="flex justify-between">
                                        <svg className="mr-1 MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"></path></svg>
                                        <a rel="noopener noreferrer" href="tel:+989010313531"> 09010313531 </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="flex justify-between">
                                        <svg className="mr-1 MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"></path></svg>
                                        <a rel="noopener noreferrer" href="tel:+982634981068"> 02634981068 </a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex footer-address">
                                <p className="item">استان البرز ، کرج-عظیمیه-میدان مهران-برج ماندگار-طبقه منفی 3 واحد 13</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[85%] mx-auto'>
                        <div className="distance">
                            <div className="flex justify-center items-center gap-4 mb-5">
                                <div className="icon-title text-[#31eee8]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                </div>
                                <h3 className="footer-title text-[#31eee8]">شبکه های اجتماعی</h3>
                            </div>
                            <div className="flex justify-center items-center flex-col gap-5">
                                <div className="flex justify-center">
                                    <div>
                                        <a className='text-3xl' rel="noopener noreferrer" href="https://api.whatsapp.com/send/?phone=989010313531&amp;text&amp;app_absent=0" target="_blank" title="?phone=989010313531&amp;text&amp;app_absent=0"><ImWhatsapp /></a>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div>
                                        <a className='text-3xl' rel="noopener noreferrer" href="https://t.me/mrhstoretelegram" target="_blank" title="mrhstoretelegram"><PiTelegramLogoBold /></a>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className='mb-12'>
                                        <a className='text-3xl' rel="noopener noreferrer" href="https://www.instagram.com/mr.h_store" target="_blank" title="mr.h_store"><GrInstagram /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[80%] mx-auto'>
                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="w-full m-auto text-center">
                                <img src="https://mrh-store.com/static/media/logo.8ea9ff34.png" width="250" alt="لوگو" className='footer-logo' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="e-nemad zarinpal">
                                    <a rel="noopener noreferrer" href="https://www.zarinpal.com" title="دروازه پرداخت معتبر"><img src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" alt="دروازه پرداخت معتبر" /></a>
                                </div>
                                <div className="zarinpal e-nemad">
                                    <a rel="noopener noreferrer" href="https://www.zarinpal.com" title="دروازه پرداخت معتبر"><img src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" alt="دروازه پرداخت معتبر" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright">
                <div>کلیه حق و حقوق وبسایت برای MR.H محفوظ است</div>
                <hr />© 2025 - این وبسایت توسط <span>
                    <a className='text-[#31eee8]' rel="noopener noreferrer" href="https://barantm.com">شرکت توسعه برنامه نویسی باران </a></span>طراحی و تولید شده است.
            </div>
        </footer>
    );
};
export default Footer;
