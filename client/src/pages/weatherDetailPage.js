import Navbar from "../components/Navbar";
import styles from "../styles/weatherDetailPage.module.css";
import { IoIosCloudy, IoRainyOutline, IoSunnySharp } from "react-icons/all";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiUrl";
import UserContext from "../userContext";
import LoginButton from "../components/LoginButton";

export default function WeatherDetailPage() {
  const params = useParams();

  const { userAccessToken } = useContext(UserContext);

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //images for this weather type
  const [imagesForThisWeather, setImagesForThisWeather] = useState([]);

  const assetForDifferentWeathers = [
    { for: "Clouds", mainImageUrl: "https://bit.ly/3w87k0q" },
    { for: "Rain", mainImageUrl: "https://bit.ly/356egPE" },
    { for: "Clear", mainImageUrl: "https://bit.ly/3waBpMN" },
  ];

  useEffect(() => {
    axios
      .get(`${apiUrl}/weather/${params.city}`, {
        headers: {
          Authorization: "Bearer " + userAccessToken,
        },
      })
      .then((res) => {
        setLoading(false);
        setWeatherData(res.data);

        //setting different images based on weather
        assetForDifferentWeathers.forEach((asset) => {
          if (asset.for == res.data.weather[0]?.main) {
            setImagesForThisWeather((prev) => [...prev, { mainImageUrl: asset.mainImageUrl }]);
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <>
      {!loading && !error ? (
        <>
          <Navbar />
          <main className={styles.weatherDetailPage}>
            <section
              style={{ backgroundImage: `url(${imagesForThisWeather[0]?.mainImageUrl || "https://bit.ly/3gqSH1M"})` }}
            >
              <h2>{weatherData.main?.temp} farenheit</h2>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>{weatherData.name}</p>
              <span>{weatherData.weather ? <p>{weatherData.weather[0]?.description}</p> : null}</span>
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
        <div className={styles.infoView}>
          <p>
            {!error ? (
              "Loading..."
            ) : (
              <>
                <p>{error}</p>
                <LoginButton />
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}
