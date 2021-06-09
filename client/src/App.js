import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/homepage";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Homepage} />
    </Router>
  );
}
