import Navbar from "../components/Navbar";
import styles from "../styles/weatherDetailPage.module.css";
import { IoIosCloudy } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiUrl";

export default function WeatherDetailPage() {
  const params = useParams();

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/weather/${params.city}`)
      .then((res) => {
        setWeatherData(res.data);
        setLoading(false);
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
            <section>
              <h2>{weatherData.main?.temp} farenheit</h2>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>{weatherData.name}</p>
              <span>
                <IoIosCloudy />
                <p>{weatherData?.weather[0]?.description}</p>
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
      ) : null}
    </>
  );
}
