import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Почніть з ESTATORA</span>
          <span className="secondaryText">
            Підписуйтесь та знайдіть надзвичайно привабливі ціни на оголошення.
            <br />
            Знайдіть свій дім швидко
          </span>
          <button className="button" href>
            <a href="mailto:test@gmail.com">Почніть зараз</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
