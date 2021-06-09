import { useHistory } from "react-router-dom";
import styles from "../styles/loginButton.module.css";

export default function LoginButton() {
  const history = useHistory();

  return (
    <button className={styles.loginButton} onClick={() => history.push("/auth")}>
      Login for access
    </button>
  );
}
