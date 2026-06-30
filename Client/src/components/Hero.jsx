import "./Hero.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ArrowRight } from "lucide-react";

import cozyLibrary from "../assets/hero/cozy-library.png";
import scifiLibrary from "../assets/hero/scifi-library.png";
import romanticLibrary from "../assets/hero/romantic-library.png";

const slides = [
  {
    image: cozyLibrary,
    title: "Lose Yourself in Stories",
    subtitle:
      "Explore thousands of timeless classics and unforgettable adventures.",
    button: "Explore Books",
  },
  {
    image: scifiLibrary,
    title: "Journey Beyond Imagination",
    subtitle:
      "Dive into futuristic worlds and science fiction masterpieces.",
    button: "Browse Collection",
  },
  {
    image: romanticLibrary,
    title: "Stories That Stay With You",
    subtitle:
      "Discover romance, emotions and heart-touching novels.",
    button: "Start Reading",
  },
];

function Hero() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      className="hero-slider"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="hero-overlay">

              <div className="hero-content">

                <h1>{slide.title}</h1>

                <p>{slide.subtitle}</p>

                <button>
                  {slide.button}
                  <ArrowRight size={20} />
                </button>

              </div>

            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;