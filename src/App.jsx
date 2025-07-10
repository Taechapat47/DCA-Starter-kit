import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import Riskassessment2 from "./page/Riskassessment2.jsx";
import Riskassessment1 from "./page/Riskassessment1.jsx";
import Portfolio from "./page/Portfolio.jsx";
import Navbar from "./component/Navbar";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Riskassessment1" element={<Riskassessment1 />} />
                <Route path="/Riskassessment2" element={<Riskassessment2 />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}
