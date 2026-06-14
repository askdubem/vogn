import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORIES } from '../utils/constants';
import ShopPage from './Shop';

// Category page just sets the search param and renders Shop
// Real routing: /category/:slug → filters shop by that category
const CategoryPage = () => {
  const { slug } = useParams();
  const category = CATEGORIES.find(c => c.slug === slug);

  if (!category) return <Navigate to="/shop" replace />;

  // Inject ?category=slug into URL so Shop page reads it
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (url.searchParams.get('category') !== slug) {
      url.searchParams.set('category', slug);
      window.history.replaceState({}, '', url.toString());
    }
  }

  return (
    <>
      <Helmet>
        <title>{category.label} — VŌGN</title>
        <meta name="description" content={`Shop VŌGN ${category.label} — premium fashion delivered across Nigeria.`} />
      </Helmet>
      <ShopPage />
    </>
  );
};

export default CategoryPage;
