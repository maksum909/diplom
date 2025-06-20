import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Hero = () => {
  const [filter, setFilter] = useState('');
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Досліджуйте<br />
              найкращу
              <br /> Нерухомість
            </motion.h1>
          </div>

          <div className="flexColStart secondaryText flexhero-des">
            <span>Знайдіть різноманітність нерухомості, яка підходить вам</span>
            <span>Забудьте про труднощі в пошуку нерухомості</span>
          </div>

          <SearchBar filter={filter} setFilter={setFilter} />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={88} end={100} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Преміум продуктів</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={5} end={20} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Задоволені клієнти</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={10} end={28} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Виграно нагород</span>
            </div>
          </div>
        </div> {/* <-- Закриваємо .hero-left */}

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./80260d79b07b22c601829a0af7721b62.jpg" alt="houses" />
          </motion.div>
        </div>
      </div> {/* <-- Закриваємо .hero-container */}
    </section>
  );
};

export default Hero;
