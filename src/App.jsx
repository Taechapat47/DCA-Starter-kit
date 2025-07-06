import react from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import Riskassessment from "./component/Riskassessment.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Riskassessment" element={<Riskassessment />} />
            </Routes>

        </Router>
    );
}
