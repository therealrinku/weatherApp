import styles from "../styles/authpage.module.css";
import { Link } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

export default function AuthPage() {
  const [loginMode, setLoginMode] = useState(true);

  //form handlers;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.authpage}>
      <span>
        <TiWeatherCloudy />
        <Link to="/">WeatherApp</Link>
      </span>
      <h2>{loginMode ? "Login to WeatherApp" : "Create a WeatherApp account"}</h2>

      <form>
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="cr7@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="*****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          <p>{loginMode ? "Login" : "Sign Up"}</p>
          <FiArrowRight />
        </button>
      </form>

      <p style={{ margin: "35px 0 -5px 0", color: "gray" }}>Already have an account?</p>
      <button style={{ border: "none" }} onClick={() => setLoginMode((prev) => !prev)}>
        {!loginMode ? "Login" : "Signup"} to WeatherApp
      </button>
    </div>
  );
}
