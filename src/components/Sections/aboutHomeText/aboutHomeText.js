import '../specialIntroduction.css';

const AboutHomeText = () => {
    return (
        <section className="about-home-section border-t border-b border-t-[#31eee8] border-b-[#31eee8]">
            <img src="https://mrh-store.com/static/media/logo.8ea9ff34.png" alt="اکشن فیگور" className="about-us-logo" />
            <div className="about-title-wrapper">
                <div className="relative title-home-page flex align-center justify-center pb-1">
                    <div className="title inline">
                        <h2 className='py-5 px-1'>اکشن فیگور<span className="title-shadow flex items-center justify-center">اکشن فیگور</span></h2>
                    </div>
                </div>
            </div>
            <div className="about-home container-costumer">
                <div className="about-home-box my-5">
                    <div className="flex">
                        <div className="flex justify-around flex-col w-full">
                            <p className="text-justify">
                                <a href="/category/فیگور-های-انیمه">
                                    <strong>اکشن فیگورهای انیمه ای</strong></a> و<a href="/category/فیگور-های-غیر-انیمه"><strong> غیرانیمه ای</strong></a> از جمله محبوب‌ترین و پرطرفدارترین مجموعه‌های محصولات جمع‌آوری‌پذیر برای علاقه‌مندان به عالم انیمه و فیلم‌های اکشن هستند. این شخصیت‌های کوچک و زیبا، با جزئیات دقیق و کیفیت ساخت بالا، قادر به تداوم و نمایش دستاوردهای داستانی و مبارزات خاص شخصیت‌های مورد علاقه ما می‌باشند. در این متن، به معرفی اکشن فیگور و اکشن فیگور انیمه، نحوه استفاده از آنها و برخی از محصولات معتبر و محبوب در این حوزه می‌پردازیم.<br />
                                <a href="/search"><strong>اکشن فیگورها</strong></a> ، مجسمه‌های کوچک و قابل جمع‌آوری هستند که براساس شخصیت‌های مختلف از انیمه‌ها، مانگاها، فیلم‌های اکشن و سریال‌های تلویزیونی ساخته می‌شوند. این فیگورها به دلیل جزئیات دقیق، کیفیت ساخت بالا و توانایی حرکتی محدود، توانسته‌اند جایگاه ویژه‌ای در میان علاقه‌مندان به این صنعت پیدا کنند.</p>
                            <div class="flex justify-center pt-6">
                                <a className="visit-all-btn rounded-md relative bg-transparent flex" href="#">
                                    <button className="custom-btn flex items-center justify-between cursor-pointer text-[#31eee8] border-0 bg-transparent overflow-hidden relative outline-none">مشاهده بیشتر
                                        <div className="icon-visit pt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline>
                                            </svg>
                                        </div>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHomeText;
