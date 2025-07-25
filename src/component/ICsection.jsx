import React from "react";
import { MessageCircle, User2 } from "lucide-react";
import calculatorBg from "../assets/Calculator.png";

export default function ICsection() {
    return (
        <div className="relative w-full min-h-[260px] md:min-h-[320px] lg:min-h-[300px] overflow-hidden">
            {/* BG */}
            <div className="absolute inset-0 bg-[#08705B] z-0" />
            <div className="absolute inset-0 bg-[#2F9976] z-10" style={{ opacity: 0.60 }} />
            <div
                className="absolute inset-0 z-20"
                style={{
                    background: `url(${calculatorBg}) center/cover no-repeat`,
                    opacity: 0.25,
                }}
            />
            {/* Content */}
            <div className="relative z-30 flex flex-col md:flex-row items-center md:items-start justify-between max-w-7xl mx-auto h-full py-12 px-5 md:px-12">
                {/* ส่วนด้านซ้าย */}
                <div className="flex-1 flex flex-col items-center md:items-start justify-center h-full text-center md:text-left">
                    <span className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
                        มาหาหุ้นตัวแรกที่คุณจะ DCA ได้ที่
                    </span>
                </div>

                {/* ส่วนด้านขวา */}
                <div className="flex-1 flex flex-col items-center md:items-end justify-center h-full mt-10 md:mt-0">
                    <button
                        className="bg-white text-[#278773] font-bold text-lg md:text-xl rounded-full px-14 py-3 shadow-md hover:bg-gray-100 transition-all border-none w-full max-w-md md:max-w-lg"
                        style={{
                            boxShadow: "0 4px 16px 0 rgba(34,34,34,0.10)",
                        }}
                        onClick={() => window.open('https://www.set.or.th/th/market/product/stock', '_blank')}
                    >
                        ดูรายละเอียดเพิ่มเติม
                    </button>

                    {/* ส่วนติดต่อทีมที่อัปเดตแล้ว */}
                    <div className="w-full flex flex-col items-center justify-center mt-10 ">
                        {/* หัวข้อ */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center rounded-full bg-[#3A96F6] w-8 h-8">
                                <MessageCircle className="text-white" size={20} />
                            </span>
                            <span className="text-white font-bold text-base md:text-lg whitespace-nowrap">
                                ติดต่อทีมปรึกษาด้านการลงทุนได้ที่
                            </span>
                        </div>

                        {/* รายชื่อผู้ติดต่อ (แนวนอน) */}
                        <div className="flex flex-row items-start justify-center gap-8 md:gap-12">
                            {/* ผู้ติดต่อคนที่ 1 */}
                            <div className="flex flex-row items-center gap-3">
                                <span className="flex items-center justify-center rounded-full bg-[#E6E6E6] w-9 h-9 flex-shrink-0">
                                    <User2 className="text-[#827F7F]" size={22} />
                                </span>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-white font-bold text-sm md:text-base">ปณพร (อิม)</span>
                                    <span className="text-[#E6E6E6] text-xs md:text-sm font-medium">02-052-xxxx</span>
                                </div>
                            </div>

                            {/* ผู้ติดต่อคนที่ 2 */}
                            <div className="flex flex-row items-center gap-3">
                                <span className="flex items-center justify-center rounded-full bg-[#E6E6E6] w-9 h-9 flex-shrink-0">
                                    <User2 className="text-[#827F7F]" size={22} />
                                </span>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-white font-bold text-sm md:text-base">ทรรศกล (ตาล)</span>
                                    <span className="text-[#E6E6E6] text-xs md:text-sm font-medium">02-097-xxxx</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
