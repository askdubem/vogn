import { useState, useEffect } from 'react';
import { productService } from '../services/products';
import { MOCK_PRODUCTS } from '../utils/mockData';

/**
 * Fetch products from API, fall back to mock data if API is unavailable
 */
const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await productService.getAll(params);
        if (!cancelled) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch {
        // API not yet connected — use mock data
        if (!cancelled) {
          let list = [...MOCK_PRODUCTS];
          if (params.featured)   list = list.filter(p => p.isFeatured);
          if (params.bestseller) list = list.filter(p => p.isBestseller);
          if (params.category)   list = list.filter(p => p.category === params.category);
          if (params.search)     list = list.filter(p => p.name.toLowerCase().includes(params.search.toLowerCase()));
          setProducts(list);
          setPagination(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [JSON.stringify(params)]);

  return { products, loading, error, pagination };
};

export default useProducts;
