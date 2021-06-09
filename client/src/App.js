import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthPage from "./pages/authpage";
import Homepage from "./pages/homepage";
import WeatherDetailPage from "./pages/weatherDetailPage";
import UserContext from "./userContext";

export default function App() {
  const [userEmail, setUserEmail] = useState("");
  const [userAccessToken, setUserAccessToken] = useState("");

  return (
    <Router>
      <UserContext.Provider value={{ userEmail, setUserEmail, userAccessToken, setUserAccessToken }}>
        <Route path="/" exact component={Homepage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/weather/:city" exact component={WeatherDetailPage} />
      </UserContext.Provider>
    </Router>
  );
}
