import '../specialIntroduction.css';
const SectionBanners = () => {
    return (
        <section className="w-full container-costumer">
            <div className="banners flex gap-7">
                <div className="home-page-banner-wrapper sm:w-full md:w-[50%]">
                    <div className="banner-card-wrapper relative flex items-center justify-center flex-wrap">
                        <a href="#" rel="noopener noreferrer">
                            <div className="card-wrapper">
                                <div className="card w-full relative flex items-center justify-center overflow-hidden border-0">
                                    <div className="imgBx">
                                        <div>
                                            <img src="https://api.mrh-store.com/files/uploads/images/sections/e6dfcb8b1f7adbbbdd7328a25e48a99b.webp" alt="banner" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="home-page-banner-wrapper sm:w-full md:w-[50%]">
                    <div className="banner-card-wrapper relative flex items-center justify-center flex-wrap">
                        <a href="#" rel="noopener noreferrer">
                            <div className="card-wrapper">
                                <div className="card w-full relative flex items-center justify-center overflow-hidden border-0">
                                    <div className="imgBx">
                                        <div>
                                            <img src="https://api.mrh-store.com/files/uploads/images/sections/7ddf9f56ac1d8b8cc190e02c1ba2b416.webp" alt="banner" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SectionBanners;
