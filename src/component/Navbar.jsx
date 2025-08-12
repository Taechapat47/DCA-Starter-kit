import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
 const location = useLocation();
 
 return (
   <>
     {/* Fixed Navbar */}
     <nav className="fixed top-0 left-0 right-0 z-50 flex h-[100px] items-center justify-between bg-[#000000] px-8 py-2 shadow-md">
       <div className="flex items-center gap-1">
         <div className="bg-white/30 rounded-full p-2">
           {/* โลโก้กราฟกลม ๆ */}
           <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
             <circle cx={12} cy={12} r={10} fill="#fff" opacity=".5"/>
             <rect x={8} y={10} width={2} height={6} fill="#22739c"/>
             <rect x={12} y={7} width={2} height={9} fill="#22739c"/>
             <rect x={16} y={13} width={2} height={3} fill="#22739c"/>
           </svg>
         </div>
         <span className="text-white text-base font-bold ml-2">DCA Starter KIT</span>
       </div>
       
       <div className="flex items-center gap-5 text-sm font-semibold">
         <Link
           to="/"
           className={`pb-0.5 hover:text-white transition-colors ${
             location.pathname === "/" ? "text-white border-b-2 border-white" : "text-white/80"
           }`}
         >
           DCA คืออะไร
         </Link>
         <Link
           to="/Riskassessment1"
           className={`pb-0.5 hover:text-white transition-colors ${
             location.pathname === "/Riskassessment1"
               ? "text-white border-b-2 border-white"
               : "text-white/80"
           }`}
         >
           ประเมินความเสี่ยง
         </Link>
         <Link
           to="/StockAnalysisPage"
           className={`pb-0.5 hover:text-white transition-colors ${
             location.pathname === "/StockAnalysisPage"
               ? "text-white border-b-2 border-white"
               : "text-white/80"
           }`}
         >
           แสกนหาหุ้นพื้นฐานดี
         </Link>
         
       </div>
     </nav>
     
     {/* Spacer - เพื่อไม่ให้เนื้อหาถูกบัง */}
     <div className="h-[100px]"></div>
   </>
 );
}
