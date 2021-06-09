import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <ul className={styles.whiteColoredLink}>
          <Link to="/">weatherApp</Link>
        </ul>

        <ul>
          <Link to="/auth">Login</Link>
        </ul>
      </div>
    </nav>
  );
}
