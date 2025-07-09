import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Riskassessment1() {
  const [goal, setGoal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [dcaIncrease, setDcaIncrease] = useState(false);
  const [investmentType, setInvestmentType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ส่งข้อมูลจากฟอร์มนี้ไปยังหน้าถัดไปผ่าน state ของ router
    navigate("/Riskassessment2", {
      state: {
        goal,
        monthly,
        dcaIncrease,
        investmentType,
      },
    });
  };

  return (
    // ปรับแก้ layout หลักให้กะทัดรัดขึ้น
    <div className="bg-white w-full flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            แบบประเมินเป้าหมายในการลงทุน
          </div>
          <div className="text-gray-600 text-lg mb-4 text-center">
            กรุณาระบุเป้าหมายและความสามารถในการลงทุนของคุณ
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full mt-2 mb-4">
            <div className="h-2.5 bg-blue-600 rounded-full" style={{ width: "50%" }} />
          </div>
          <div className="text-gray-500 text-base">
            <span className="font-semibold text-blue-700">ตอนที่ 1</span> / 2 : เป้าหมายในการลงทุน
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. เป้าหมายการลงทุน */}
          <div>
            <label className="font-bold text-xl text-gray-800 block mb-2">
              1. เป้าหมายในการลงทุนและระยะเวลาที่คุณคิดว่าจะได้ใช้เงินเป้าหมายนั้นคืออะไร?
            </label>
            <input
              className="w-full border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-blue-500 focus:border-blue-500 transition"
              type="text"
              placeholder="เช่น DCA เพื่อซื้อบ้านภายในอีก 5 ปีข้างหน้า"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              required
            />
            <div className="text-gray-600 text-sm mt-2">
              เช่น DCA เพื่อซื้อบ้าน, เพื่อการเกษียณในอีก 30 ปี <br />
              <b className="text-blue-700">* แนะนำ DCA ควรลงทุนอย่างน้อย 5 ปีขึ้นไป</b>
            </div>
          </div>

          {/* 2. จำนวนเงินลงทุนต่อเดือน */}
          <div>
            <label className="font-bold text-xl text-gray-800 block mb-2">
              2. จำนวนเงินที่คุณสามารถลงทุนได้ต่อเดือน (บาท/เดือน)
            </label>
            <input
              className="w-full border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-blue-500 focus:border-blue-500 transition"
              type="number"
              min="0"
              step="100"
              placeholder="เช่น 3000"
              value={monthly}
              onChange={e => setMonthly(e.target.value)}
              required
            />
            <label className="flex items-center mt-3 gap-3 text-base text-gray-700">
              <input
                type="checkbox"
                checked={dcaIncrease}
                onChange={e => setDcaIncrease(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              เพิ่มเงินลงทุนในอัตราเดือนละ 10% (ถ้าสถานะทางการเงินคุณโตขึ้น)
            </label>
          </div>

          {/* 3. ประเภทการลงทุน */}
          <div>
            <label className="font-bold text-xl text-gray-800 block mb-2">
              3. คุณสนใจในการลงทุนประเภทใด
            </label>
            <div className="flex flex-col gap-3 mt-2">
              <label className={`border-2 rounded-xl p-5 flex items-start gap-4 cursor-pointer transition ${
                investmentType === "stock"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}>
                <input
                  type="radio"
                  name="investmentType"
                  value="stock"
                  checked={investmentType === "stock"}
                  onChange={() => setInvestmentType("stock")}
                  className="mt-1 h-5 w-5 accent-blue-600"
                  required
                />
                <div>
                  <span className="font-semibold text-lg text-blue-800">หุ้น : เน้นเลือกให้ถูกตัว</span>
                  <div className="text-base text-gray-600 mt-1">
                    *เสี่ยงปานกลางค่อนข้างสูง / ผลตอบแทนคาดหวัง 5-10% ต่อปี
                  </div>
                </div>
              </label>
              <label className={`border-2 rounded-xl p-5 flex items-start gap-4 cursor-pointer transition ${
                investmentType === "fund"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}>
                <input
                  type="radio"
                  name="investmentType"
                  value="fund"
                  checked={investmentType === "fund"}
                  onChange={() => setInvestmentType("fund")}
                  className="mt-1 h-5 w-5 accent-blue-600"
                  required
                />
                <div>
                  <span className="font-semibold text-lg text-blue-800">กองทุนรวม : กระจายความเสี่ยงให้</span>
                  <div className="text-base text-gray-600 mt-1">
                    *เสี่ยงต่ำ-ปานกลาง / ผลตอบแทนคาดหวัง 1.5-7% ต่อปี
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold text-xl mt-6 transition-all transform hover:scale-105"
          >
            ต่อไป
          </button>
        </form>
      </div>
    </div>
  );
}
