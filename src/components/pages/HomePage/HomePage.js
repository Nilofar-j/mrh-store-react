import SectionIntroduction from "../../Sections/Slideimages/SlideImages.js";
import SectionStory from "../../Sections/Story/story.js";
import SectionCategories from "../../Sections/category_parent/categoryParent.js";
import DiscountSection from "../../Sections/discount/discountSection.js";
import DailyProducts from "../../Sections/daily_products/dailyProducts.js";
import NewProducts from "../../Sections/new_products/new_products.js";
import SectionBanners from "../../Sections/banner/banners.js";
import AnimeFigures from "../../Sections/animeFigures/anime_figures.js";
import NonAnimeFigures from "../../Sections/nonAnimeFigures/non_anime_figures.js";
import CollectionAccessories from "../../Sections/collectionAccessories/collection_accessories.js";
import Banner from "../../Sections/banner/banner.js";
import AboutHomeText from "../../Sections/aboutHomeText/aboutHomeText.js";

const HomePage = () => {
    return (
        <main>
            <SectionIntroduction />
            <SectionStory />
            <SectionCategories />
            <DiscountSection />
            <DailyProducts />
            <NewProducts />
            <SectionBanners/>
            <AnimeFigures/>
            <NonAnimeFigures/>
            <CollectionAccessories/>
            <Banner/>
            <AboutHomeText/>
        </main>
    );
};

export default HomePage;
