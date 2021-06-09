import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <ul>
          <Link src="/">weatherApp</Link>
        </ul>

        <ul>
          <Link src="/auth">Login</Link>
        </ul>
      </div>
    </nav>
  );
}
