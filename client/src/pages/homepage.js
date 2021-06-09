import Navbar from "../components/Navbar";
import styles from "../styles/homepage.module.css";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <main className={styles.homepage}>
        <img src="https://bit.ly/3vbajnj" alt="hero-image" />
        <section>
          <h3>Get Latest Weather Information</h3>
        </section>
      </main>
    </>
  );
}
