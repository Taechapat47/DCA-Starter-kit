import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between bg-[#000000] px-8 py-4 rounded-t-xl shadow-md">
      <div className="flex items-center gap-2">
        <div className="bg-white/30 rounded-full p-2">
          {/* โลโก้กราฟกลม ๆ */}
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
            <circle cx={12} cy={12} r={10} fill="#fff" opacity=".5"/>
            <rect x={8} y={10} width={2} height={6} fill="#22739c"/>
            <rect x={12} y={7} width={2} height={9} fill="#22739c"/>
            <rect x={16} y={13} width={2} height={3} fill="#22739c"/>
          </svg>
        </div>
        <span className="text-white text-2xl font-bold ml-2">DCA Starter KIT</span>
      </div>
      <div className="flex items-center gap-8 text-lg font-semibold">
        <Link
          to="/"
          className={`pb-0.5 ${
            location.pathname === "/" ? "text-white border-b-2 border-white" : "text-white/80"
          }`}
        >
          DCA
        </Link>
        <Link
          to="/Riskassessment1"
          className={`pb-0.5 ${
            location.pathname === "/Riskassessment1"
              ? "text-white border-b-2 border-white"
              : "text-white/80"
          }`}
        >
          ประเมินความเสี่ยง
        </Link>
        <Link
          to="/portfolio"
          className={`pb-0.5 ${
            location.pathname === "/portfolio"
              ? "text-white border-b-2 border-white"
              : "text-white/80"
          }`}
        >
          พอร์ตฟอลิโอ
        </Link>
        <Link
          to="/marketcap"
          className={`pb-0.5 ${
            location.pathname === "/marketcap"
              ? "text-white border-b-2 border-white"
              : "text-white/80"
          }`}
        >
          MarketCap
        </Link>
      </div>
    </nav>
  );
}
