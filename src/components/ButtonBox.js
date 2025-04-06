import React from "react";
import { Button } from "react-bootstrap";

const ButtonBox = ({
  cities,
  city,
  setCity,
  selectedCity,
  setSelectedCity,
}) => {
  //city state를 바꾸고 선택된 도시도 바꾸는 함수
  const handleCityClick = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  //current location 클릭 시 호출
  const currentLocationClick = () => {
    setCity("");
    setSelectedCity("");
  };

  return (
    <div className="button-box">
      <Button
        variant={city === "" ? "dark" : "warning"}
        onClick={() => currentLocationClick()}
      >
        Current Location
      </Button>

      {/* 도시이름 담은 배열을 ui에 뿌려주기 */}
      {cities.map((item) => (
        <Button
          variant={selectedCity === item ? "dark" : "warning"}
          onClick={() => handleCityClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default ButtonBox;
