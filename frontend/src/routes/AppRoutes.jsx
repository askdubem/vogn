import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home       from '../pages/Home';
import Shop       from '../pages/Shop';
import Category   from '../pages/Category';
import Product    from '../pages/Product';
import Cart       from '../pages/Cart';
import Checkout   from '../pages/Checkout';
import About      from '../pages/About';
import Contact    from '../pages/Contact';
import FAQ        from '../pages/FAQ';
import NotFound   from '../pages/NotFound';

// Auth Pages
import Login    from '../pages/Login';
import Register from '../pages/Register';

// Protected Pages
import Profile from '../pages/Profile';
import Orders  from '../pages/Orders';

// Policy Pages
import PrivacyPolicy  from '../pages/policies/PrivacyPolicy';
import Terms          from '../pages/policies/Terms';
import ShippingPolicy from '../pages/policies/ShippingPolicy';
import RefundPolicy   from '../pages/policies/RefundPolicy';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts  from '../pages/admin/Products';
import AdminOrders    from '../pages/admin/Orders';

const AppRoutes = () => {
  return (
    <Routes>

      {/* ── Public Routes (with main layout) ── */}
      <Route element={<MainLayout />}>
        <Route path="/"                  element={<Home />} />
        <Route path="/shop"              element={<Shop />} />
        <Route path="/category/:slug"    element={<Category />} />
        <Route path="/product/:slug"     element={<Product />} />
        <Route path="/cart"              element={<Cart />} />
        <Route path="/about"             element={<About />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/faq"               element={<FAQ />} />
        <Route path="/login"             element={<Login />} />
        <Route path="/register"          element={<Register />} />

        {/* Policy Pages */}
        <Route path="/privacy-policy"    element={<PrivacyPolicy />} />
        <Route path="/terms"             element={<Terms />} />
        <Route path="/shipping-policy"   element={<ShippingPolicy />} />
        <Route path="/refund-policy"     element={<RefundPolicy />} />

        {/* Protected — requires login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="/orders"   element={<Orders />} />
        </Route>
      </Route>

      {/* ── Admin Routes (with admin layout) ── */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin"          element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders"   element={<AdminOrders />} />
        </Route>
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
