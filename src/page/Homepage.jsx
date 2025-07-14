import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaStar, FaPlayCircle } from "react-icons/fa";

export default function DcaPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff]">
      {/* Title */}
      <div className="flex flex-col items-center mt-2">
        <h1 className="text-2xl font-bold text-[#22739c] my-5">DCA</h1>
        
        {/* กล่องใหญ่ 2 ช่องบน */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 justify-center mb-6">
          {/* DCA คืออะไร */}
          <div className="bg-gradient-to-br from-[#e7f0fa] to-[#e4ecf6] shadow-md rounded-2xl p-6 flex-1 min-h-[140px]">
            <div className="flex items-center gap-2 font-semibold text-[#22739c] mb-2">
              <FaChartLine />
              <span>DCA คืออะไร</span>
            </div>
            <div className="text-gray-700 text-sm">
              การออมเงินหรือการลงทุนเป็นประจำ ด้วยจำนวนเงินที่เท่าๆ กันในแต่ละงวด เช่น รายเดือน ช่วยสร้างวินัยในการออม และลดความเสี่ยงเรื่อง "จับจังหวะ" การลงทุน
            </div>
          </div>
          {/* จุดเด่น DCA */}
          <div className="bg-gradient-to-br from-[#e7f0fa] to-[#e4ecf6] shadow-md rounded-2xl p-6 flex-1 min-h-[140px]">
            <div className="flex items-center gap-2 font-semibold text-[#22739c] mb-2">
              <FaStar />
              <span>จุดเด่น DCA</span>
            </div>
            <ul className="list-disc ml-4 text-gray-700 text-sm">
              <li>ลดความเสี่ยงจากความผันผวนของตลาด</li>
              <li>เริ่มต้นง่าย ใช้เงินลงทุนจำนวนน้อยได้</li>
              <li>เหมาะกับมือใหม่และผู้ที่ต้องการวินัยทางการเงิน</li>
            </ul>
          </div>
        </div>

        {/* วีดีโอแนะนำ DCA */}
        <div className="w-full max-w-4xl mb-6">
          <div className="bg-gradient-to-br from-[#e7f0fa] to-[#e4ecf6] shadow-md rounded-2xl p-6 min-h-[120px]">
            <div className="flex items-center gap-2 font-semibold text-[#22739c] mb-2">
              <FaPlayCircle />
              <span>วีดีโอแนะนำ DCA</span>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-44 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                <FaPlayCircle className="text-5xl text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">คลิกเพื่อรับชมวิดีโอ (ตัวอย่าง)</span>
              </div>
            </div>
          </div>
        </div>

        {/* กล่อง 2 อันล่าง */}
        <div className="w-full max-w-5xl flex flex-col gap-5">
          {/* ประเมินความเสี่ยง */}
          <div className="bg-gradient-to-br from-[#e7f0fa] to-[#e4ecf6] shadow-md rounded-2xl px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <div className="text-[#22739c] font-semibold mb-1">ประเมินความเสี่ยง</div>
              <div className="text-gray-500 text-sm">ทำแบบประเมินเพื่อดูระดับความเสี่ยงที่เหมาะกับคุณ</div>
            </div>
            <Link to="/Riskassessment1">
              <button className="mt-3 md:mt-0 bg-[#4faee6] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#22739c] transition-all">
                เริ่มทำแบบประเมิน
              </button>
            </Link>
          </div>
          {/* พอร์ตฟอลิโอ */}
          <div className="bg-gradient-to-br from-[#e7f0fa] to-[#e4ecf6] shadow-md rounded-2xl px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <div className="text-[#22739c] font-semibold mb-1">พอร์ตฟอลิโอ</div>
              <div className="text-gray-500 text-sm">รวมข้อมูลสินทรัพย์และการลงทุนของคุณ</div>
            </div>
            <Link to="/portfolio">
              <button className="mt-3 md:mt-0 bg-[#4faee6] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#22739c] transition-all">
                สร้างพอร์ตฟอลิโอ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
