import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import page1 from "../assets/page1.png";

export default function Riskassessment1() {
  const [goal, setGoal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [dcaIncrease, setDcaIncrease] = useState(false);
  const [years, setYears] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!goal) {
      setError("กรุณากรอกเป้าหมาย");
      return;
    }
    if (!years || parseInt(years) < 5) {
      setError("กรุณาระบุปีอย่างน้อย 5 ปี");
      return;
    }
    if (!monthly || parseInt(monthly) < 2000) {
      setError("จำนวนเงินลงทุนขั้นต่ำ 2,000 บาท/เดือน");
      return;
    }
    if (!investmentType) {
      setError("กรุณาเลือกประเภทการลงทุน");
      return;
    }

    navigate("/Riskassessment2", {
      state: {
        goal,
        years,
        monthly,
        dcaIncrease,
        investmentType,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start text-lg items-center pt-8">
      <div className="flex flex-col items-center mb-4">
        {/* หัวข้อ */}
        <div className="text-green-500 font-extrabold text-3xl md:text-4xl mb-2 text-center">
          แบบประเมินเป้าหมายในการลงทุน
        </div>
        <div className="text-gray-500 mb-4 text-center text-lg md:text-xl">
          กรุณาระบุเป้าหมายและความสามารถในการลงทุนของคุณ
        </div>
        {/* ปุ่มเลือก 2 อัน */}
        <div className="flex rounded-full border border-green-400 overflow-hidden text-lg">
          <button
            className="bg-green-500 text-white font-semibold px-6 py-2 text-xl rounded-full focus:outline-none"
            disabled
          >
            เป้าหมายในการลงทุน
          </button>
          <button
            className="bg-white text-green-500 font-semibold px-6 py-2 text-xl rounded-full focus:outline-none"
            disabled
          >
            ประเมินความเสี่ยง
          </button>
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start gap-2 md:gap-6 px-2">
        {/* รูปมือถือ/คนด้านซ้าย */}
        <div className="w-full md:w-2/3 flex justify-center items-center mb-4 md:mb-0">
          <img
            src={page1}
            alt="DCA Starter Kit"
            className="w-full max-w-4xl md:max-w-4xl lg:max-w-4xl h-auto"
            draggable={false}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* ฟอร์มด้านขวา */}
        <div className="w-full md:w-1/1 flex justify-center">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. เป้าหมาย + ปี */}
            <div>
              <label className="font-bold text-xl text-gray-800 block mb-3">
                1. เป้าหมายในการลงทุนและระยะเวลาที่คุณคิดว่าจะได้ใช้เงินเป้าหมายนั้นคืออะไร?
              </label>
              <div className="flex gap-3 items-center">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-green-400 focus:border-green-400 transition"
                  type="text"
                  placeholder="เช่น DCA เพื่อซื้อบ้าน"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  required
                />
                <input
                  className="border border-gray-300 rounded-lg px-3 py-3 w-24 text-center text-lg"
                  type="number"
                  min={5}
                  placeholder="ปี"
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  required
                />
                <span className="text-gray-500 ml-2 text-lg">ปี</span>
              </div>
              <div className="text-base text-gray-500 mt-3">
                <span className="block">เช่น DCA เพื่อซื้อบ้านภายในอีก 5 ปีข้างหน้า</span>
                <span className="block">เช่น DCA เพื่อส่งลูกเรียน, เพื่อการเกษียณในอีก 30 ปี</span>
                <span className="text-green-700 font-medium">
                  * แนะนำ DCA ควรลงทุนอย่างน้อย 5 ปีขึ้นไป
                </span>
              </div>
            </div>

            {/* 2. จำนวนเงินต่อเดือน */}
            <div>
              <label className="font-bold text-xl text-gray-800 block mb-3">
                2. จำนวนเงินที่คุณสามารถลงทุนได้ต่อเดือน (บาท/เดือน)
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-green-400 focus:border-green-400 transition"
                type="number"
                min="2000"
                step="100"
                placeholder="เช่น 3000"
                value={monthly}
                onChange={e => setMonthly(e.target.value)}
                required
              />
              <label className="flex items-center mt-3 gap-2 text-lg text-gray-600">
                <input
                  type="checkbox"
                  checked={dcaIncrease}
                  onChange={e => setDcaIncrease(e.target.checked)}
                  className="h-6 w-6 rounded border-gray-300 text-green-500 focus:ring-green-400"
                />
                เพิ่มเงินลงทุนในอัตราเดือนละ 10% (ถ้าสถานะทางการเงินคุณโตขึ้น)
              </label>
            </div>

            {/* 3. ประเภทการลงทุน */}
            <div>
              <label className="font-bold text-xl text-gray-800 block mb-3">
                3. คุณสนใจในการลงทุนประเภทใด
              </label>
              <div className="flex flex-col md:flex-row gap-4 mt-3">
                <label className={`flex-1 border-2 rounded-xl p-5 flex items-start gap-4 cursor-pointer transition ${investmentType === "stock"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}>
                  <input
                    type="radio"
                    name="investmentType"
                    value="stock"
                    checked={investmentType === "stock"}
                    onChange={() => setInvestmentType("stock")}
                    className="mt-1 h-6 w-6 accent-green-600"
                    required
                  />
                  <div>
                    <span className="font-semibold text-lg text-green-700">หุ้น : เน้นเลือกให้ถูกตัว</span>
                    <div className="text-base text-gray-600 mt-2">
                      *เสี่ยงปานกลางค่อนข้างสูง / ผลตอบแทนคาดหวัง 5-10% ต่อปี
                    </div>
                  </div>
                </label>
                <label className={`flex-1 border-2 rounded-xl p-5 flex items-start gap-4 cursor-pointer transition ${investmentType === "fund"
                  ? "border-purple-400 bg-purple-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}>
                  <input
                    type="radio"
                    name="investmentType"
                    value="fund"
                    checked={investmentType === "fund"}
                    onChange={() => setInvestmentType("fund")}
                    className="mt-1 h-6 w-6 accent-purple-500"
                    required
                  />
                  <div>
                    <span className="font-semibold text-lg text-purple-700">กองทุนรวม : กระจายความเสี่ยงให้</span>
                    <div className="text-base text-gray-600 mt-2">
                      *เสี่ยงต่ำ-ปานกลาง / ผลตอบแทนคาดหวัง 1.5-7% ต่อปี
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full px-8 py-4 rounded-lg text-white font-semibold text-xl mt-8 transition-all 
                ${goal && years >= 5 && monthly >= 2000 && investmentType
                  ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
              disabled={!(goal && years >= 5 && monthly >= 2000 && investmentType)}
            >
              ต่อไป
            </button>
            {/* แสดง error */}
            {error && (
              <div className="mt-4 text-center text-red-500 font-semibold text-lg">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
