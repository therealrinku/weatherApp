import Navbar from "../components/Navbar";
import styles from "../styles/weatherDetailPage.module.css";

export default function WeatherDetailPage() {
  return (
    <>
      <Navbar />
      <main className={styles.weatherDetailPage}></main>
    </>
  );
}
