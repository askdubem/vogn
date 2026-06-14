import { Helmet } from 'react-helmet-async';
import HeroSection       from '../components/home/HeroSection';
import CategorySection   from '../components/home/CategorySection';
import FeaturedSection   from '../components/home/FeaturedSection';
import BestSellersSection from '../components/home/BestSellersSection';
import NewsletterSection  from '../components/home/NewsletterSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>VŌGN — Lagos Fashion</title>
        <meta name="description" content="Premium fashion for the modern Nigerian. Shop Caps, T-Shirts, Hoodies, Bags, Accessories and Jackets." />
      </Helmet>

      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <BestSellersSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
