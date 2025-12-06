import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import HomePage from './components/pages/HomePage/HomePage.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AnimeFigures from './components/ProductCategories/animeFigures.js';

import { CartProvider } from './components/ShoppingCart/Shoppingcart.js';
import { AuthProvider } from './components/UserAccount/UserAccountProvider.js';

import CartComponent from './components/ShoppingCart/CartComponent.js';

import Login from './components/UserAccount/Login.js';
import PhoneVerification from './components/UserAccount/PhoneVerification.js';
import Dashboard from './components/UserAccount/UserPanel/Dashboard.js';
import Profile from './components/UserAccount/UserPanel/Profile.js';
import Favorite from './components/UserAccount/UserPanel/Favorite.js';
import Orders from './components/UserAccount/UserPanel/Orders.js';

const MainLayout = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/login', '/PhoneVerification', '/customer/dashboard', '/customer/profile', '/customer/favorite', '/customer/orders'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Category/فیگور-های-انیمه" element={<AnimeFigures />} />
        <Route path="Shoppingcart/سبدخرید" element={<CartComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path='/PhoneVerification' element={<PhoneVerification />} />
        <Route path='/customer/dashboard' element={<Dashboard />} />
        <Route path='/customer/profile' element={<Profile />} />
        <Route path='/customer/favorite' element={<Favorite />} />
        <Route path='/customer/orders' element={<Orders />} />
      </Routes >
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}



export default App;
