import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import ButtonBox from "./components/ButtonBox";
import ClipLoader from "react-spinners/ClipLoader";
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  let [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const cities = ["Seoul", "New York", "Vancouver", "Tokyo", "Sydney"];

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

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("API 응답 실패"); // HTTP 오류 처리
      const data = await response.json();
      setWeather(data); //받아온 날씨데이터가 state가 됨
      setIsCurrentLocation(true);
    } catch (error) {
      console.error("현재 위치 날씨 호출 중 에러:", error);
      alert("날씨 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  //도시별 날씨
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("API 응답 실패");
      const data = await response.json();
      setWeather(data);
      setIsCurrentLocation(false);
    } catch (error) {
      console.error("도시 날씨 호출 중 에러:", error);
      alert("선택한 도시의 날씨 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <ButtonBox
            cities={cities}
            setCity={setCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            getCurrentLocation={getCurrentLocation}
            isCurrentLocation={isCurrentLocation}
            setIsCurrentLocation={setIsCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
