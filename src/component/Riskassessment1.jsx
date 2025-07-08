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
    navigate("/Riskassessment2");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">
            แบบประเมินเป้าหมายในการลงทุน
          </div>
          <div className="text-gray-500 text-sm mb-2 text-center">
            กรุณาระบุเป้าหมายและความสามารถในการลงทุนของคุณ
          </div>
          <div className="w-full h-1 bg-gray-100 rounded mt-2 mb-4">
            <div className="h-1 bg-blue-500 rounded" style={{ width: "33%" }} />
          </div>
          <div className="text-gray-500 text-xs mb-2">
            <span className="font-semibold text-blue-700">ตอนที่ 1</span> / 2 : เป้าหมายในการลงทุน
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* 1. เป้าหมายการลงทุน */}
          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              1. เป้าหมายในการลงทุนและระยะเวลาที่คุณคิดว่าจะได้ใช้เงินเป้าหมายนั้นคืออะไร?
            </label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              type="text"
              placeholder="เช่น DCA เพื่อซื้อบ้านภายในอีก 5 ปีข้างหน้า"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              required
            />
            <div className="text-gray-500 text-xs mt-1">
              เช่น DCA เพื่อซื้อบ้านภายในอีก 5 ปีข้างหน้า, DCA เพื่อการเกษียณที่มั่นคงภายในอีก 30 ปีข้างหน้า <br />
              <b>* แนะนำ DCA ควรลงทุนอย่างน้อย 5 ปีขึ้นไป</b>
            </div>
          </div>

          {/* 2. จำนวนเงินลงทุนต่อเดือน */}
          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              2. จำนวนเงินที่คุณคิดว่าคุณสามารถลงทุนได้ต่อเดือนโดยไม่เดือดร้อนค่าใช้จ่ายอื่นๆ (บาท/เดือน)
            </label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              type="number"
              min="0"
              step="100"
              placeholder="เช่น 3000"
              value={monthly}
              onChange={e => setMonthly(e.target.value)}
              required
            />
            <label className="flex items-center mt-2 gap-2 text-sm">
              <input
                type="checkbox"
                checked={dcaIncrease}
                onChange={e => setDcaIncrease(e.target.checked)}
              />
              เพิ่มเงินลงทุนในอัตราเดือนละ 10% (ถ้าสถานะทางการเงินคุณโตขึ้น)
            </label>
          </div>

          {/* 3. ประเภทการลงทุน */}
          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              3. คุณสนใจในการลงทุนประเภทใด
            </label>
            <div className="flex flex-col gap-3 mt-2">
              <label className={`border rounded-lg p-4 flex items-start gap-2 cursor-pointer transition ${
                investmentType === "stock"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                  : "border-gray-200 bg-white"
              }`}>
                <input
                  type="radio"
                  name="investmentType"
                  value="stock"
                  checked={investmentType === "stock"}
                  onChange={() => setInvestmentType("stock")}
                  className="mt-1 accent-blue-500"
                  required
                />
                <div>
                  <span className="font-semibold text-blue-700">หุ้น : เน้นเลือกให้ถูกตัว</span>
                  <div className="text-xs text-gray-500 mt-1">
                    *เสี่ยงปานกลางค่อนข้างสูง / ผลตอบแทนปานกลางค่อนข้างสูง 5-10% ต่อปี
                  </div>
                </div>
              </label>
              <label className={`border rounded-lg p-4 flex items-start gap-2 cursor-pointer transition ${
                investmentType === "fund"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                  : "border-gray-200 bg-white"
              }`}>
                <input
                  type="radio"
                  name="investmentType"
                  value="fund"
                  checked={investmentType === "fund"}
                  onChange={() => setInvestmentType("fund")}
                  className="mt-1 accent-blue-500"
                  required
                />
                <div>
                  <span className="font-semibold text-blue-700">กองทุนรวม : กระจายความเสี่ยงให้</span>
                  <div className="text-xs text-gray-500 mt-1">
                    *เสี่ยงต่ำ-ปานกลางค่อนข้างสูง / ผลตอบแทนต่ำ-สูง 1.5-7% ต่อปี
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow font-semibold mt-3"
          >
            ส่งข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
}
