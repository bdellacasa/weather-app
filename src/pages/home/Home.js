import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import actions from '../../redux/actions';
import getCoordinates from '../../services/LocationService';
import Page from '../page/Page';
import CitiesCarousel from '../../components/carousel/Carousel';
import Search from '../../components/search/Search';
import CityCard from '../../components/card/CityCard';
import Map from '../../components/map/Map';
import pinIcon from '../../assets/pin.png';
import './home.scss';
import { cities } from '../../utils/Constants';
import { validate } from '../../utils/helpers';

const Home = ({ loadingCarousel, loadingDailyForecast, loadingTodayWeather, propCarousel, propTodayWeather, propDailyForecast, getCitiesCarouselWeather, getCityWeatherByName, getDailyForecast }) => {
    const [ city, setCity ] = useState(null);
    const [ citiesCarousel, setCitiesCarousel ] = useState([]);
    const [ todayWeather, setTodayWeather ] = useState(null);
    const [ dailyForecast, setDailyForecast ] = useState([]);

    const fetchCitiesCarousel = () => {
        const names = cities.map(c => c.name);
        getCitiesCarouselWeather(names);
    }

    const setCarouselData = () => {
        const data = propCarousel.map((element, idx) => ({
            name: cities[idx].name,
            src: cities[idx].src,
            temp: element.main.temp,
            description: element.weather[0].main,
            humidity: element.main.humidity,
            wind: element.wind.deg 
        }));
        setCitiesCarousel(data)
    }

    const getDefaultCity = async() => {
        try {
            getCityWeatherByName("Buenos Aires, Argentina");
        } catch (error) {
            console.log("ERROR: ",error)
            alert("There was an error, try again")
        }
    }

    const getInitialCityWeather = async() => {
        try {
            const result = await getCoordinates();
            getCityWeatherByName(result.city);
            setCity(result);
        } catch (error) {
            console.log("ERROR: ",error)
            getDefaultCity();
        }
    }

    useEffect(() => {
        if (!propCarousel.length) {
            fetchCitiesCarousel();
        }

        if (!propTodayWeather) {
            getInitialCityWeather();
        }

        if (propCarousel.length > 0 && !citiesCarousel.length) {
            setCarouselData(propCarousel);
        }

        if(propTodayWeather && (!todayWeather || (todayWeather.name !== propTodayWeather.name))) {
            setTodayWeather(propTodayWeather);
            getDailyForecast(propTodayWeather.coord.lat, propTodayWeather.coord.lon, propTodayWeather.name);
        }

        if(propDailyForecast && (!dailyForecast || !dailyForecast.length || (dailyForecast.timezone !== propDailyForecast.timezone))) {
            setDailyForecast(propDailyForecast.daily)
        }
    
    },[propCarousel, propTodayWeather, propDailyForecast]);


    let cardsArray = dailyForecast && dailyForecast.length > 0 ? dailyForecast.slice(1, dailyForecast.length).map((e,idx) => (
        <CityCard key={idx} idx={idx+1} data={e}/>
    )) : [];

    let title = todayWeather ? `${todayWeather.name.toUpperCase()}, ${todayWeather.sys.country}` : ' ';

    const searchCity = (name) => {
        const param = validate(name);
        if (param) {
            getCityWeatherByName(param);
        }
    };

    const renderContent = () => {
        return(
            <div>
                <CitiesCarousel data={citiesCarousel}/>
                <div>
                    <p className={"home-search-title"}>SEARCH CITIES</p>
                    <div className={"home-search-container"}>
                        <div className={"home-search-form"}>
                            <Search searchCity={name => searchCity(name)}/>
                        </div>
                        <div className={"home-place-container"}>
                            <img src={pinIcon} className={"home-place-icon"}/>
                            <p className={"home-title"}>{title}</p>
                        </div>
                        <div className={"home-today-card-container"}>
                            {todayWeather &&  <div className={"home-today-card-element"}>
                                <Map lat={todayWeather.coord.lat} lon={todayWeather.coord.lon}/>
                            </div>}
                            <div className={"home-today-card-element"} style={{ marginLeft: '20px' }}>
                                <CityCard data={todayWeather} idx={0}/>
                            </div>
                        </div>
                        <p className={"home-title-days"}>Daily forecast for the next 7 days</p>
                        <div className={"home-cards-container"}>
                            {cardsArray}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Page
            content={
                renderContent()
            }
            loading={
                loadingCarousel || loadingTodayWeather || loadingDailyForecast
            }
        />
    );
}

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state, props) => ({
    propCarousel: state.reducer.citiesWeather,
    propTodayWeather: state.reducer.cityWeather,
    propDailyForecast: state.reducer.dailyForecast,
    loadingCarousel: state.reducer.loadingCarousel,
    loadingTodayWeather: state.reducer.loadingTodayWeather,
    loadingDailyForecast: state.reducer.loadingDailyForecast
})

const mapDispatchToProps = dispatch => ({
    getCitiesCarouselWeather: (names) => dispatch(actions.getCitiesWeather(names)),
    getCityWeatherByName: (name) => dispatch(actions.getCityWeatherByName(name)),
    getDailyForecast: (lat, long, name) => dispatch(actions.getDailyForecast(lat, long, name))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);