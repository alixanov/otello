import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Navbar, InfoProduct, Product, HotelsList, MostLiked, Reservation, Cabinet, Register } from '../components/';

const AppRoutes = ({ hotel }) => {
  const location = useLocation(); // Получаем текущий маршрут
  const isRegisterPage = location.pathname === "/register"; // Проверяем, находимся ли мы на /register

  return (
    <div>
      {/* Скрываем Navbar при маршруте /register */}
      {!isRegisterPage && <Navbar />}

      {/* Если страница регистрации, убираем padding-inline */}
      <div className={`main ${isRegisterPage ? "no-padding" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<InfoProduct />} />
          <Route path="/products" element={<Product />} />
          <Route path="/star/:id" element={<HotelsList />} />
          <Route path="/api/favorite" element={<MostLiked />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/api/cabinet' element={<Cabinet />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
