import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import Riskassessment from "./page/Riskassessment.jsx";
import Portfolio from "./page/Portfolio.jsx";
import Navbar from "./component/Navbar";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Riskassessment" element={<Riskassessment />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}
