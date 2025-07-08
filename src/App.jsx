import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import Riskassessment2 from "./component/Riskassessment2.jsx";
import Riskassessment1 from "./component/Riskassessment1.jsx";
import Portfolio from "./page/Portfolio.jsx";
import Navbar from "./component/Navbar";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Riskassessment" element={<Riskassessment1 />} />
                <Route path="/Riskassessment2" element={<Riskassessment2 />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}
