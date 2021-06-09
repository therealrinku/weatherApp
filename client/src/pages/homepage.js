import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/homepage.module.css";

export default function Homepage() {
  const cities = [
    { cityName: "Hongkong" },
    { cityName: "Paris" },
    { cityName: "London" },
    { cityName: "California" },
    { cityName: "Tokyo" },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.homepage}>
        <img src="https://bit.ly/3vbajnj" alt="hero-image" />
        <section>
          <h3>Get Latest Weather Information</h3>
          {cities.map((city) => {
            return (
              <Link key={city.cityName} to={`/weather/${city.cityName}`}>
                {city.cityName}
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
}
