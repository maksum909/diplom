import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./2025-06-20_18.08.53-removebg-preview.png" alt="" width={120} />
          <span className="secondaryText">
            Наше міркування - створити найкращий сервіс для надання послуг.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Інформація</span>
          <span className="secondaryText">Луцьк, Волинська область, Україна</span>
          <div className="flexCenter f-menu">
            <span>Оголошення</span>
            <span>Послуги</span>
            <span>Продукт</span>
            <span>Про нас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
