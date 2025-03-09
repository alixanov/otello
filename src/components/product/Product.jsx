import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Импортируем заполненную иконку
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from 'react-router-dom';
import { Advance } from "../";
import ContentLoader from "react-content-loader";

const Product = () => {
     const { id } = useParams();
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [favoriteHotels, setFavoriteHotels] = useState([]);

     useEffect(() => {
          axios
               .get("https://otello-server.vercel.app/api/getall")
               .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
               })
               .catch((error) => {
                    console.error("Ошибка при загрузке данных:", error);
                    setError("Не удалось загрузить данные. Попробуйте позже.");
                    setLoading(false);
               });

          // Загружаем избранные отели из localStorage при монтировании компонента
          const storedFavorites = JSON.parse(localStorage.getItem('favoriteHotels')) || [];
          setFavoriteHotels(storedFavorites);
     }, []);

     const toggleFavorite = (hotelId) => {
          let updatedFavorites;
          if (favoriteHotels.includes(hotelId)) {
               updatedFavorites = favoriteHotels.filter(id => id !== hotelId);
          } else {
               updatedFavorites = [...favoriteHotels, hotelId];
          }
          setFavoriteHotels(updatedFavorites);
          localStorage.setItem('favoriteHotels', JSON.stringify(updatedFavorites));
     };

     const filteredProducts = id ? products.filter(product => product.star == id) : products;

     const groupedProducts = filteredProducts.reduce((acc, product) => {
          const star = product.star;
          if (!acc[star]) {
               acc[star] = [];
          }
          acc[star].push(product);
          return acc;
     }, {});

     const sortedStars = Object.keys(groupedProducts).sort((a, b) => b - a);

     return (
          <div className="product__big__container">
               <div className="product__container">
                    {/* Advance всегда отображается */}
                    <Advance />

                    {loading ? (
                         // Скелетон загрузки
                         <div className="product__cards">
                              {[...Array(6)].map((_, index) => (
                                   <div key={index} className="product__card">
                                        <ContentLoader
                                             speed={2}
                                             width={300}
                                             height={400}
                                             viewBox="0 0 300 400"
                                             backgroundColor="#f3f3f3"
                                             foregroundColor="#ecebeb"
                                        >
                                             <rect x="0" y="0" rx="12" ry="12" width="100%" height="200" />
                                             <rect x="0" y="220" rx="6" ry="6" width="80%" height="20" />
                                             <rect x="0" y="250" rx="6" ry="6" width="60%" height="15" />
                                             <rect x="0" y="280" rx="6" ry="6" width="50%" height="15" />
                                             <rect x="0" y="310" rx="6" ry="6" width="40%" height="15" />
                                             <rect x="0" y="340" rx="6" ry="6" width="30%" height="15" />
                                        </ContentLoader>
                                   </div>
                              ))}
                         </div>
                    ) : error ? (
                         <div className="error-message">{error}</div>
                    ) : (
                         sortedStars.map((star) => (
                              <div key={star} className="product__category">
                                   <div className="product__star__title">
                                        <h2>Отели с {star} звездами</h2>
                                        <p>Лучшие предложения по отелям</p>
                                   </div>

                                   <div className="product__cards__wrapper" key={id || "all"}>
                                        <div className="product__cards">
                                             {groupedProducts[star].map((product) => (
                                                  <Link to={`/hotel/${product._id}`} key={product._id} className="product__card">
                                                       <div className="product__card__img">
                                                            <img
                                                                 src={product.rasm?.[0] || "/placeholder.jpg"}
                                                                 alt={product.nomi}
                                                                 className="product__image"
                                                                 loading="lazy"
                                                            />
                                                       </div>

                                                       {product.discount > 0 && (
                                                            <div className="product__discount">
                                                                 <AutoAwesomeIcon sx={{ color: "#58CC16" }} />
                                                                 <button>{product.discount}%</button>
                                                            </div>
                                                       )}

                                                       <div className="product__info">
                                                            <p className="product__rating">{"⭐".repeat(product.star)} {product.rating}</p>
                                                            <h3 className="product__name">{product.nomi}</h3>
                                                            <p className="product__location">{product.manzil}</p>
                                                            <p className="product__dates">Даты: {product.dates} взрослых</p>
                                                            <p className="product__price">{product.narxi} $ / ночь</p>
                                                       </div>

                                                       <div className="product__favorites__icon" onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleFavorite(product._id);
                                                       }}>
                                                            {favoriteHotels.includes(product._id) ? (
                                                                 <FavoriteIcon sx={{ color: "red" }} /> // Красная иконка, если отель в избранном
                                                            ) : (
                                                                 <FavoriteBorderIcon /> // Пустая иконка, если отель не в избранном
                                                            )}
                                                       </div>
                                                  </Link>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
};

export default Product;