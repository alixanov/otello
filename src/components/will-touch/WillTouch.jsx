import React from 'react';
import "./will-touch.css"
import bell from "../../assets/bell.png"
import bolt from "../../assets/bolt.png"

const WillTouch = () => {
     return (
          <div className="will__touch__container">
               <div className="will__touch__content">
                    {/* Заголовок и описание */}
                    <h2>Будем на связи?</h2>
                    <span>Расскажем о скидках и подскажем идеи для новых путешествий</span>

                    {/* Форма подписки */}
                    <div className="will__touch__form">
                         <input type="email" placeholder="Электронная почта" />
                         <button type="submit">Подписаться</button>
                    </div>

                    {/* Соглашение */}
                    <p className="will__touch__agreement">
                         Нажимая на кнопку «Подписаться», я принимаю условия
                         <a href="#"> Лицензионного соглашения</a>, правила
                         <a href="#"> Программы лояльности</a>, а также даю ООО «ДубльГИС»
                         согласие на обработку персональных данных в соответствии с
                         <a href="#"> Политикой конфиденциальности</a>.
                    </p>
               </div>

               {/* Декоративные элементы (иконки) */}
               <div className="will__touch__icons">
                    <img src={bell} className="icon bell-icon" alt="Bell Icon" />
                    <img src={bolt} className="icon bolt-icon" alt="Bolt Icon" />
               </div>
          </div>
     );
};

export default WillTouch;