import styles from "../styles/authpage.module.css";
import { Link } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";
import { FiArrowRight } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";
import UserContext from "../userContext";

export default function AuthPage() {
  const [loginMode, setLoginMode] = useState(true);
  const [serverIsBusy, setServerIsBusy] = useState(false);

  const { setUserEmail, setUserAccessToken } = useContext(UserContext);

  //form handlers;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const Login = (e) => {
    e.preventDefault();
    axios
      .post(apiUrl + "/auth/login", { email, password })
      .then((res) => {
        setUserEmail(res.email);
        setUserAccessToken(res.token);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const Signup = (e) => {
    e.preventDefault();
    setServerIsBusy(true);
    //email and password validation
    if (password.length < 8) {
      alert("password cannot be less than 8 characters.");
    } else {
      axios
        .post(apiUrl + "/auth/signup", { email, password })
        .then(() => {
          alert("Successfully signed up, now you can login.");
          setLoginMode(true);
          setServerIsBusy(false);
        })
        .catch((err) => {
          setError(err.message);
          setServerIsBusy(false);
        });
    }
  };

  //clearing input field on mode change
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
  }, [loginMode]);

  return (
    <div className={styles.authpage}>
      <span>
        <TiWeatherCloudy />
        <Link to="/">WeatherApp</Link>
      </span>
      <h2>{loginMode ? "Login to WeatherApp" : "Create a WeatherApp account"}</h2>

      <form onSubmit={loginMode ? Login : Signup}>
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="cr7@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="*****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={serverIsBusy}>
          <p>{loginMode ? "Login" : "Sign Up"}</p>
          <FiArrowRight />
        </button>
      </form>

      <p style={{ color: "red", fontSize: "14px" }}>{error}</p>

      <p style={{ margin: "35px 0 -5px 0", color: "gray" }}>
        {loginMode ? "Don't have an account?" : "Already have an account?"}
      </p>
      <button style={{ border: "none" }} onClick={() => setLoginMode((prev) => !prev)}>
        {!loginMode ? "Login" : "Signup"} to WeatherApp
      </button>
    </div>
  );
}
