import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import ButtonBox from "./components/ButtonBox";
const APIKey = `dd21ea36c1e98e9f075d4a9e5386c5bc`;

function App() {
  const [weather, setWeather] = useState();

  //현재 위치(위도, 경도)값 추출
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherByCurrentLocation(latitude, longitude); //현재위치날씨함수에서 위경도값 사용할 수 있게 인수로 넘겨줌
    });
  };

  //현재위치 날씨 불러오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data); //받아온 날씨데이터가 state가 됨
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <ButtonBox />
      </div>
    </div>
  );
}

export default App;
