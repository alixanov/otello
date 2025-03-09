import React from "react";
import "./register.css";
import { Button } from "@mui/material";
import { Google, Facebook, Apple, VpnKey, MailOutline, Person } from "@mui/icons-material";
import google from "../../assets/google.png"
import vk from "../../assets/vk.png"
import apple from "../../assets/apple-logo.png"
import facebook from "../../assets/facebook.png"

const Register = () => {
     return (
          <div className="register__container">
               {/* Левая сторона */}
               <div className="register__left">
                    <h1>2ГИС</h1>
                    <h3>Вход</h3>
                    <p>Войдите в 2ГИС любым удобным способом</p>
               </div>

               {/* Правая сторона */}
               <div className="register__right">
                    <div className="register__buttons">
                         <Button className="register__button" variant="outlined"
                              sx={{
                                   border: "1px solid #ddd",
                                   color: "#222222"

                              }}                         >
                              <div className="register__button__start">

                              <Person /> Продолжить как [Имя]
                              </div>
                         </Button>
                         <Button className="register__button" variant="outlined"

                              sx={{
                                   border: "1px solid #ddd",
                                   color: "#222222"

                              }}
                         >
                              <div className="register__button__start">
                                   <img src={vk} alt="" /> Войти с VK ID

                              </div>

                         </Button>
                         <Button className="register__button" variant="outlined"
                              sx={{
                                   border: "1px solid #ddd",
                                   color: "#222222"

                              }}

                         >
                              <div className="register__button__start">
                              
                              <img src={google} alt="" /> Войти через Google
                              </div>
                         </Button>
                         <Button className="register__button" variant="outlined"
                              sx={{
                                   border: "1px solid #ddd",
                                   color: "#222222"

                              }}

                         >

                              <div className="register__button__start">

                              <img src={facebook} alt="" /> Войти через Facebook
                              </div>
                         </Button>
                         <Button
                              className="register__button"
                              variant="outlined"
                              sx={{
                                   border: "1px solid #ddd",
                                   color:"#222222"
                                   
                              }}
                         >
                              <div className="register__button__start">
                                   <img src={apple} alt="Apple Login" /> Вход с Apple
                              </div>
                         </Button>


                    </div>

                    <p className="register__terms">
                         Нажимая на любую кнопку, вы принимаете условия{" "}
                         <a href="#">Лицензионного соглашения</a> и даёте согласие на обработку персональных данных на условиях, определённых{" "}
                         <a href="#">Политикой конфиденциальности</a>.
                    </p>

                    <p className="register__support">
                         <a href="#">Техническая поддержка</a>
                    </p>
               </div>
          </div>
     );
};

export default Register;
