import React, { useState, useEffect } from "react";

const frequencyMap = {
  "Monthly": 12,
  "Quarterly": 4,
  "Yearly": 1,
};

export default function DCAcalculator({ initialValues }) {
  const [years, setYears] = useState("");
  const [initial, setInitial] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [contribute, setContribute] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setYears(initialValues.years || "");
      setInitial(initialValues.initial || "");
      setExpectedReturn(initialValues.expectedReturn || "");
      setContribute(initialValues.contribute || "");
    }
  }, [initialValues]);

  useEffect(() => {
    const allValuesPresent = years && initial && expectedReturn && contribute;
    if (allValuesPresent) {
      let total = Number(initial);
      let currentContribute = Number(contribute);
      const periods = Number(years) * frequencyMap["Monthly"];
      const r = Math.pow(1 + Number(expectedReturn) / 100, 1 / 12) - 1;
      if (isNaN(total) || isNaN(currentContribute) || isNaN(periods) || isNaN(r)) {
        setResult(null);
        return;
      }
      for (let i = 0; i < periods; i++) {
        total = total * (1 + r) + currentContribute;
      }
      setResult(total);
    } else {
      setResult(null);
    }
  }, [years, initial, expectedReturn, contribute]);

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg p-6"
      style={{
        background: "linear-gradient(120deg, #C3FFFA, #BCE6E2, #A7CCC9)",
        border: "none",
      }}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* ระยะเวลา */}
        <div>
          <label className="block font-semi-bold text-lg mb-2" style={{ color: "#9747FF" }}>
            ระยะเวลาสำหรับแผนของคุณ:
          </label>
          <div className="flex items-center bg-white rounded-xl shadow px-4 py-2">
            <input
              type="number"
              value={years}
              readOnly
              className="w-full outline-none bg-white text-lg font-medium"
              style={{ border: "none", boxShadow: "none" }}
            />
            <span className="ml-2 text-gray-600 text-base">ปี</span>
          </div>
        </div>
        {/* เงินต้น */}
        <div>
          <label className="block font-bold text-lg mb-2" style={{ color: "#9747FF" }}>เงินต้น:</label>
          <div className="flex items-center bg-white rounded-xl shadow px-4 py-2">
            <input
              type="number"
              value={initial}
              readOnly
              className="w-full outline-none bg-white text-lg font-medium"
              style={{ border: "none", boxShadow: "none" }}
            />
            <span className="ml-2 text-gray-600 text-base">บาท</span>
          </div>
        </div>
        {/* ผลตอบแทนที่คาดหวัง */}
        <div>
          <label className="block font-bold text-lg mb-2" style={{ color: "#9747FF" }}>
            ผลตอบแทนคาดหวังต่อปี:
          </label>
          <div className="flex items-center bg-white rounded-xl shadow px-4 py-2">
            <input
              type="number"
              value={expectedReturn}
              readOnly
              className="w-full outline-none bg-white text-lg font-medium"
              style={{ border: "none", boxShadow: "none" }}
            />
            <span className="ml-2 text-gray-600 text-base">%</span>
          </div>
        </div>
        {/* การลงทุนเพิ่มเติม */}
        <div>
          <label className="block font-bold text-lg mb-2" style={{ color: "#9747FF" }}>
            การลงทุนเพิ่มเติม:
          </label>
          <div className="flex items-center bg-white rounded-xl shadow px-4 py-2">
            <input
              type="number"
              value={contribute}
              readOnly
              className="w-full outline-none bg-white text-lg font-medium"
              style={{ border: "none", boxShadow: "none" }}
            />
            <span className="ml-2 text-gray-600 text-base whitespace-nowrap">
              บาท/เดือน
            </span>
          </div>
        </div>
      </div>

      {/* ผลลัพธ์ */}
      {result !== null && (
        <div className="pt-8 pb-2 text-xl font-bold text-center">
          เงินสะสมจากแผน DCA:{" "}
          <span className="text-green-600 text-2xl">
            ฿{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      )}
    </div>
  );
}
