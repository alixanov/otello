import React from 'react';
import "./user.css";

const User = () => {
     return (
          <div className='user__container'>
               <div className="discount__section">
                    <p>Скидка 10% на первую бронь при оплате в приложении</p>
                    <p>Скидка до 1000 ₽</p>
                    <p>Промокод OTEL1010</p>
               </div>
               <div className="user__info">
                    <p>Алиханов</p>
                    <p>alixonovshukurullo13@gmail.com • 68753631</p>
               </div>
               <div className="bonus__section">
                    <h3>Боиусы</h3>
                    <p>Копите боиусы и списывайте до 99% при оплате отелей онлайн</p>
               </div>
               <div className="loyalty__program">
                    <h3>Программа лояльности</h3>
                    <h4>Гость 1-го уровня</h4>
                    <table>
                         <thead>
                              <tr>
                                   <th>Вал уровень</th>
                                   <th>2-й уровень</th>
                                   <th>3-й уровень</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr>
                                   <td>5% кешбек</td>
                                   <td>10% кешбек и скидки</td>
                                   <td>15% кешбек и скидки</td>
                              </tr>
                         </tbody>
                    </table>
                    <p>Как это работает?</p>
               </div>
               <div className="theme__section">
                    <p>Тёмная тема</p>
                    <p>Выйти из профиля</p>
               </div>
          </div>
     );
};

export default User;