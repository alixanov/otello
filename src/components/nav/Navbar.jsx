import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './navbar.css';
import {Bonuses} from '../'; // Исправленный импорт

const Navbar = () => {
  const location = useLocation(); // Получаем текущий путь
  const [isBonusesOpen, setIsBonusesOpen] = useState(false); // Состояние для модального окна

  const toggleBonusesModal = () => {
    setIsBonusesOpen(!isBonusesOpen);
  };

  return (
    <nav className='nav__container'>
      <Link className='nav__logo' to={"/"}>
        <KeyIcon />
        <h1>ello</h1>
      </Link>

      <div className="nav__a__links">
        <Link
          className={`nav__a__link ${location.pathname === "/" ? "active" : ""}`}
          to={"/"}
        >
          <ElectricBoltIcon /> Суперцены
        </Link>

        <Link
          className={`nav__a__link ${location.pathname === "/api/favorite" ? "active" : ""}`}
          to={"/api/favorite"}
        >
          <FavoriteIcon /> Избранное
        </Link>

        <Link
          className={`nav__a__link ${location.pathname === "/reservation" ? "active" : ""}`}
          to={"/reservation"}
        >
          <ShoppingBasketIcon /> Брони
        </Link>

        <Link className='nav__a__link__user' to={"/api/cabinet"} >
          <AccountCircleIcon />
        </Link>

        <div className='nav__a__link__sale' onClick={toggleBonusesModal}>
          Бонусы
          <span className="nav__a__icon">C</span>
        </div>
      </div>

      {isBonusesOpen && <Bonuses onClose={toggleBonusesModal} />}
    </nav>
  );
};

export default Navbar;