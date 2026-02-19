import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location"; // 위치 API
import Fontisto from "@expo/vector-icons/Fontisto"; // for 날씨 아이콘

//API KEY
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
//Dimentions : 앱 실행한 기기 크기 불러오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

//days의 날씨정보와 Fontisto 의 아이콘 이름 연결을 위한 오브젝트
const icons = {
  Clouds: "cloudy",
};

export default function App() {
  // 날씨 앱 만들기 (Nomad Coder's React Native)
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  //Expo Location 불러오기
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    //현재 위치 불러오기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    //불러온 위치 주소로 변환
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    );
    //state에 위치 주소 저장
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
    );
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("03:00:00")) {
          return weather;
        }
      }),
    );
    console.log(days);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        // indicatorStyle="black"
        contentContainerStyle={styles.weather}
      >
        {days.length == 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="black"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.temperture}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd700",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 45,
    fontWeight: 500,
  },
  weather: {},
  day: {
    padding: 20,
    width: SCREEN_WIDTH,
  },
  temperture: {
    marginTop: 50,
    fontSize: 120,
    fontWeight: 500,
  },
  description: {
    marginTop: -20,
    fontSize: 40,
  },
  tinyText: {
    fontSize: 20,
  },
});
