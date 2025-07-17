import { shortList, list, longList } from "./data.js";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currPerson, setCurrPerson] = useState(0);

  const prevSlide = () => {
    setCurrPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };

  const nextSlide = () => {
    setCurrPerson((oldPerson) => {
      // console.log(oldPerson)
      const result = (oldPerson + 1) % people.length;
      // console.log(result);

      return result;
    });
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(sliderId);
    };
  }, [currPerson]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            key={id}
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currPerson)}%)`,
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <h6 className="title">{title}</h6>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
