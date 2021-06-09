import Navbar from "../components/Navbar";
import styles from "../styles/weatherDetailPage.module.css";
import { IoIosCloudy, IoRainyOutline, IoSunnySharp } from "react-icons/all";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiUrl";

export default function WeatherDetailPage() {
  const params = useParams();

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const imagesForThisWeather = {};

  const assetForDifferentWeathers = [
    { for: "Clouds", mainImageUrl: "https://bit.ly/3w87k0q", icon: <IoIosCloudy /> },
    { for: "Rain", mainImageUrl: "https://bit.ly/356egPE", icon: <IoRainyOutline /> },
    { for: "Clear", mainImageUrl: "https://bit.ly/3waBpMN", icon: <IoSunnySharp /> },
  ];

  useEffect(() => {
    axios
      .get(`${apiUrl}/weather/${params.city}`)
      .then((res) => {
        setLoading(false);
        setWeatherData(res.data);

        //setting different images based on weather
        assetForDifferentWeathers.forEach((asset) => {
          if (asset.for === res.data.weather[0]?.main) {
            imagesForThisWeather.mainImageUrl = asset.mainImageUrl;
            imagesForThisWeather.icon = asset.icon;
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <main className={styles.weatherDetailPage}>
            <section
              style={{ backgroundImage: `url(${imagesForThisWeather.mainImageUrl || "https://bit.ly/3gqSH1M"})` }}
            >
              <h2>{weatherData.main?.temp} farenheit</h2>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>{weatherData.name}</p>
              <span>
                {imagesForThisWeather.icon || <IoSunnySharp />}
                {weatherData.weather ? <p>{weatherData.weather[0]?.description}</p> : null}
              </span>
            </section>
            <section>
              <p style={{ borderBottom: "solid 1px black" }}>Details</p>
              <div className={styles.weatherProperty}>
                <p>Humidity</p>
                <p>{weatherData.main?.humidity}%</p>
              </div>

              <div className={styles.weatherProperty}>
                <p>Pressure</p>
                <p>{weatherData.main?.pressure}</p>
              </div>

              <div className={styles.weatherProperty}>
                <p>Visibility</p>
                <p>{weatherData.visibility}</p>
              </div>
            </section>
          </main>
        </>
      ) : (
        <div className={styles.loadingText}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}