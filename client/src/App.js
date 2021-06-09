import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthPage from "./pages/authpage";
import Homepage from "./pages/homepage";
import WeatherDetailPage from "./pages/weatherDetailPage";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Homepage} />
      <Route path="/auth" exact component={AuthPage} />
      <Route path="/weather/:city" exact component={WeatherDetailPage} />
    </Router>
  );
}
