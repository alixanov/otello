import React from 'react';
import soul from "../../videos/soul.mp4";
import build from "../../videos/build.mp4";
import "./advance.css";

const Advance = () => {
     return (
          <div className='advance__video'>
               <video src={soul} autoPlay loop muted></video>
               <div className="advance__overlay"></div> {/* Добавляем overlay */}
               <div className="advance__txt">
                    <h1>Отели для путешествий по всему миру</h1>
               </div>
          </div>
     );
}

export default Advance;
