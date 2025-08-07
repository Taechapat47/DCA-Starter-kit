import React from "react";
import { MessageCircle, User2 } from "lucide-react";
import calculatorBg from "../assets/Calculator.png";

export default function ICsection() {
  return (
    <>
      {/* ส่วน Background + ข้อความหลัก */}
      <div className="relative w-full h-[280px] overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 bg-[#08705B] z-0" />
        <div
          className="absolute inset-0 bg-[#2F9976] z-10"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            background: `url(${calculatorBg}) center/cover no-repeat`,
            opacity: 0.25,
          }}
        />

        {/* Content */}
        <div className="relative z-30 flex items-center justify-center tracking-wide max-w-7xl mx-auto h-full py-8 px-5 font-prompt ">
          {/* ส่วนข้อความหลัก */}
          <div
            className="text-white font-bold text-4xl  tracking-wide text-center"
            style={{
              textShadow:
                "4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <span>
              " หุ้นที่ดีในระยะยาว คือ หุ้นที่บริษัทโตขึ้น <br />
            </span>
            <span>
              มาดูหุ้นที่แนวโน้มการเงินโตขึ้นใน 4 ปีหลังกัน! " <br />
            </span>
            <span>มาหาหุ้นตัวแรกที่คุณจะ DCA ได้ที่คลิก </span>
            <button
              className="bg-white text-[#278773] font-bold text-lg tracking-wide rounded-full px-12 py-2 ml-4 shadow-md hover:bg-gray-100 transition-all border-none whitespace-nowrap"
              style={{
                boxShadow: "0 4px 16px 0 rgba(34,34,34,0.10)",
              }}
              onClick={() => {
                window.location.href = "/StockAnalysisPage";
              }}
            >
              แสดนหาหุ้นพื้นฐานดี
            </button>
          </div>
        </div>
      </div>

      {/* ส่วนติดต่อ - นอก background */}
      <div className="bg-black py-8 relative">
        <div className=" mx-auto px-5 ">
          <div className="flex flex-col md:flex-row items-center justify-between ">
            {/* หัวข้อติดต่อ */}
            <div className="flex gap-3 mb-6">
              <span className="flex items-center justify-center rounded-full bg-[#3A96F6] w-8 h-8">
                <MessageCircle className="text-white" size={20} />
              </span>
              <span className="text-white font-bold text-base md:text-lg whitespace-nowrap">
                ติดต่อทีมปรึกษาด้านการลงทุนได้ที่
              </span>
            </div>

            {/* รายชื่อผู้ติดต่อ */}
            <div className="flex items-end justify-end gap-8 md:gap-12">
              {/* ผู้ติดต่อคนที่ 1 */}
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full bg-[#E6E6E6] w-9 h-9 flex-shrink-0">
                  <User2 className="text-[#827F7F]" size={22} />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-bold text-sm md:text-base">
                    ปณพร (อิม)
                  </span>
                  <span className="text-[#E6E6E6] text-xs md:text-sm font-medium">
                    02-052-xxxx
                  </span>
                </div>
              </div>

              {/* ผู้ติดต่อคนที่ 2 */}
              <div className="flex flex-row items-center gap-3">
                <span className="flex items-center justify-center rounded-full bg-[#E6E6E6] w-9 h-9 flex-shrink-0">
                  <User2 className="text-[#827F7F]" size={22} />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-bold text-sm md:text-base">
                    ทรรศกล (ตาล)
                  </span>
                  <span className="text-[#E6E6E6] text-xs md:text-sm font-medium">
                    02-097-xxxx
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
