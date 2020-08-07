import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import './carousel.scss';
import { kelvinToCelsius } from '../../utils/helpers';

const CitiesCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!items.length && !!data) {
      setItems(data)
    }
  }, [items, data])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className={"carousel-opacity"}>
          <img className={"carousel-img"} src={item.src} alt="" />
        </div>
        <div className={"carousel-place-container"}>
          <p className={"carousel-place"}>{item.name.toUpperCase()}</p>
        </div>
        <div className={"carousel-main-data-container"}>
          <p className={"carousel-temperature"}>{kelvinToCelsius(item.temp)} °</p>
          <p className={"carousel-description"}>{item.description.toUpperCase()}</p>
          <div className={"carousel-info-container"}>
            <div className={"carousel-info-col-1"}>
              <p className={"carousel-hum-wind-title"}>HUMIDITY</p>
              <p className={"carousel-humidity"}>{item.humidity}%</p>
            </div>
            <div className={"carousel-info-col-2"}>
              <p className={"carousel-hum-wind-title"}>WIND</p>
              <p className={"carousel-wind"}>{item.wind} K/M</p>
            </div>
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      style={{ width: '100vw' }}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CitiesCarousel;