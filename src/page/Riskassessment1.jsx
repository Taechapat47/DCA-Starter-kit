import React, { useState, useEffect } from "react";
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

   useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";    // Firefox
    document.body.style["-ms-overflow-style"] = "none"; // IE/Edge
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `body::-webkit-scrollbar { display: none !important; }`;
    document.head.appendChild(styleTag);

    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
      document.body.style["-ms-overflow-style"] = "";
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col justify-start text-sm items-center pt-8 ">
      <div className="flex flex-col items-center mb-4">
        {/* หัวข้อ */}
        <div className="text-green-500 font-extrabold text-xl md:text-3xl mb-2 text-center">
          แบบประเมินเป้าหมายในการลงทุน
        </div>
        <div className="text-gray-500 mb-4 text-center text-sm md:text-base">
          กรุณาระบุเป้าหมายและความสามารถในการลงทุนของคุณ
        </div>
        <div className="flex rounded-full border border-gray-400 overflow-hidden text-sm">
          <button
            className="bg-green-500 text-white font-inter px-6 py-2 text-sm rounded-full focus:outline-none"
            disabled
          >
            เป้าหมายในการลงทุน
          </button>
          <button
            className="bg-white text-black font-inter px-6 py-2 text-sm rounded-full focus:outline-none"
            disabled
          >
            ความเสี่ยงที่คุณรับได้
          </button>
          <button
            className="bg-white text-black font-inter px-6 py-2 text-sm rounded-full focus:outline-none"
            disabled
          >
            DCA ที่เหมาะสมกับคุณ
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
          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {/* 1. เป้าหมาย + ปี */}
            <div>
              <label className="font-bold text-base text-gray-800 block mb-2">
                1. เป้าหมายในการลงทุนและระยะเวลาที่คุณคิดว่าจะได้ใช้เงินเป้าหมายนั้นคืออะไร?
              </label>
              <div className="flex gap-2 items-center">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-400 focus:border-green-400 transition"
                  type="text"
                  placeholder="เช่น DCA เพื่อซื้อบ้าน"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  required
                />
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-center text-sm"
                  type="number"
                  min={5}
                  placeholder="ปี"
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  required
                />
                <span className="text-gray-500 ml-1 text-sm">ปี</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                <span className="block">เช่น DCA เพื่อส่งลูกเรียน, เพื่อการเกษียณในอีก 30 ปี</span>
                <span className="text-green-700 font-medium">
                  * แนะนำ DCA ควรลงทุนอย่างน้อย 5 ปีขึ้นไป
                </span>
              </div>
            </div>

            {/* 2. จำนวนเงินต่อเดือน */}
            <div>
              <label className="font-bold text-base text-gray-800 block mb-2">
                2. จำนวนเงินที่คุณสามารถลงทุนได้ต่อเดือน (บาท/เดือน)
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-400 focus:border-green-400 transition"
                type="number"
                min="2000"
                step="100"
                placeholder="เช่น 3000"
                value={monthly}
                onChange={e => setMonthly(e.target.value)}
                required
              />
              <label className="flex items-center mt-2 gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={dcaIncrease}
                  onChange={e => setDcaIncrease(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-400"
                />
                เพิ่มเงินลงทุนในอัตราเดือนละ 10% (ถ้าสถานะทางการเงินคุณโตขึ้น)
              </label>
            </div>

            {/* 3. ประเภทการลงทุน */}
            <div>
                <label className="font-bold text-base text-gray-800 block mb-2">
                  3. คุณสนใจในการลงทุนประเภทใด
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {["stock", "fund"].map((type) => (
                    <label 
                      key={type}
                      className={`flex-1 border-2 rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-all duration-200 ${investmentType === type
                        ? "border-purple-500 bg-purple-50 shadow-md scale-105"
                        : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="investmentType"
                        value={type}
                        checked={investmentType === type}
                        onChange={() => setInvestmentType(type)}
                        className="mt-1 h-5 w-5 flex-shrink-0 accent-purple-600"
                      />
                      <div>
                        <span className="font-semibold text-base text-purple-700">
                          {type === 'stock' ? 'หุ้น: เน้นเลือกให้ถูกตัว' : 'กองทุนรวม: กระจายความเสี่ยงให้'}
                        </span>
                        <div className="text-xs text-gray-600 mt-1">
                          {type === 'stock' 
                            ? '*เสี่ยงปานกลางค่อนข้างสูง / ผลตอบแทนคาดหวัง 5-10% ต่อปี'
                            : '*เสี่ยงต่ำ-ปานกลาง / ผลตอบแทนคาดหวัง 1.5-7% ต่อปี'
                          }
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            <button
              type="submit"
              className={`w-full px-8 py-3 rounded-lg text-white font-semibold text-base mt-6 transition-all 
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
              <div className="mt-3 text-center text-red-500 font-semibold text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}