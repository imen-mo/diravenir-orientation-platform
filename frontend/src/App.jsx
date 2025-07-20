import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import Etudiants from "./pages/Etudiants";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/etudiants" element={<Etudiants />} />
            </Routes>
        </Router>
    );
}

export default App;
