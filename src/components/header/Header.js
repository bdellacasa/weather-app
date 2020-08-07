import React, { useEffect } from 'react';
import {
  Navbar,
  Container
} from 'reactstrap';
import './header.scss';
import { dates, months } from '../../utils/Constants';
import logo from '../../assets/cloud.png';

const styleContainer = {
  width: '100vw',
  height: window.matchMedia("(max-width: 480px)").matches ? '20vh' : '10vh',
  backgroundColor: '#432C85'
}

const Header = () => {
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const tick = () => {
    setDate(new Date());
  }

  return (
    <div>
      <Navbar light expand="md" style={styleContainer}>
        <img src={logo} className={"header-logo"} alt="" />
        <p className={"header-text"}>WeatherApp</p>
        <Container>
          <p className={"header-day-week"}>{dates[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</p>
          <p className={"header-time"}>{date.toLocaleTimeString()}</p>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;