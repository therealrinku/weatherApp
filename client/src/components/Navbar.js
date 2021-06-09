import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../userContext";

export default function Navbar() {
  const { userEmail, setUserAccessToken, setUserEmail } = useContext(UserContext);

  const history = useHistory();

  const Logout = () => {
    setUserAccessToken("");
    setUserEmail("");

    //redirecting to home after logout
    history.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <ul className={styles.whiteColoredLink}>
          <Link to="/">weatherApp</Link>
        </ul>

        <ul>{userEmail ? <button onClick={Logout}>Logout</button> : <Link to="/auth">Login</Link>}</ul>
      </div>
    </nav>
  );
}
