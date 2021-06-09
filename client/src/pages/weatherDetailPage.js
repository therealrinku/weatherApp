import Navbar from "../components/Navbar";
import styles from "../styles/weatherDetailPage.module.css";
import { IoIosCloudy } from "react-icons/io";

export default function WeatherDetailPage() {
  const weatherDetails = [
    { property: "Humidity", value: "63%" },
    { property: "Wind", value: "10km/s" },
    { property: "Cloudy", value: "84%" },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.weatherDetailPage}>
        <section>
          <h2>20 degrees</h2>
          <p style={{ fontWeight: "bold", marginTop: "-10px" }}>London</p>
          <span>
            <IoIosCloudy />
            <p>Cloudy</p>
          </span>
        </section>
        <section>
          <p style={{ borderBottom: "solid 1px black" }}>Details</p>
          {weatherDetails.map((detail) => {
            return (
              <div key={detail.property} className={styles.weatherProperty}>
                <p>{detail.property}</p>
                <p>{detail.value}</p>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
