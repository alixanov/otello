import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './navbar.css';
import { Bonuses } from '../'; // Исправленный импорт

const Navbar = () => {
  const location = useLocation(); // Получаем текущий путь
  const [isBonusesOpen, setIsBonusesOpen] = useState(false); // Состояние для модального окна
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Состояние для мобильного меню

  const toggleBonusesModal = () => {
    setIsBonusesOpen(!isBonusesOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className='nav__container'>
      <Link className='nav__logo' to={"/"} onClick={closeMobileMenu}>
        <KeyIcon />
        <h1>ello</h1>
      </Link>

      <div className={`nav__a__links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link
          className={`nav__a__link ${location.pathname === "/" ? "active" : ""}`}
          to={"/"}
          onClick={closeMobileMenu}
        >
          <ElectricBoltIcon /> Суперцены
        </Link>

        <Link
          className={`nav__a__link ${location.pathname === "/api/favorite" ? "active" : ""}`}
          to={"/api/favorite"}
          onClick={closeMobileMenu}
        >
          <FavoriteIcon /> Избранное
        </Link>

        <Link
          className={`nav__a__link ${location.pathname === "/reservation" ? "active" : ""}`}
          to={"/reservation"}
          onClick={closeMobileMenu}
        >
          <ShoppingBasketIcon /> Брони
        </Link>

        <Link className='nav__a__link__user' to={"/api/cabinet"} onClick={closeMobileMenu}>
          <AccountCircleIcon />
        </Link>

        <div className='nav__a__link__sale' onClick={toggleBonusesModal}>
          Бонусы
          <span className="nav__a__icon">C</span>
        </div>
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {isBonusesOpen && <Bonuses onClose={toggleBonusesModal} />}

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;