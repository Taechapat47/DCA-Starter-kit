import React, { useState } from "react";

const frequencyMap = {
  "Monthly": 12,
  "Quarterly": 4,
  "Yearly": 1,
};

export default function DCAcalculatorV2() {
  const [years, setYears] = useState();
  const [initial, setInitial] = useState();
  const [expectedReturn, setExpectedReturn] = useState();
  const [contribute, setContribute] = useState();
  const [contributeFreq, setContributeFreq] = useState("Monthly");
  const [growth, setGrowth] = useState();
  const [growthFreq, setGrowthFreq] = useState("Yearly");
  const [result, setResult] = useState(null);

  function calculateDCA() {
    let total = Number(initial);
    let currentContribute = Number(contribute);
    let periods = years * frequencyMap[contributeFreq];
    let r = Math.pow(1 + expectedReturn / 100, 1 / frequencyMap[contributeFreq]) - 1;

    for (let i = 0; i < periods; i++) {
      total = total * (1 + r) + currentContribute;
      // เพิ่มการโตของเงินลงทุน
      if (
        (growthFreq === "Yearly" && (i + 1) % frequencyMap[contributeFreq] === 0) ||
        (growthFreq === "Monthly" && true)
      ) {
        if (growthFreq === "Yearly" && (i + 1) % frequencyMap[contributeFreq] === 0) {
          currentContribute *= 1 + growth / 100;
        } else if (growthFreq === "Monthly") {
          currentContribute *= 1 + growth / 100 / 12;
        }
      }
    }
    setResult(total);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 border">
      <h2 className="text-xl font-bold text-center mb-6 text-purple-700">DCA Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">ระยะเวลาสำหรับแผนของคุณ:</label>
          <input type="number" value={years} min={1} max={100}
            onChange={e => setYears(e.target.value)} className="border p-2 rounded w-32 mr-2" />
          <span className="ml-2 text-gray-500">ปี</span>
        </div>
        <div>
          <label className="block font-medium">เงินต้น:</label>
          <input type="number" value={initial} min={0}
            onChange={e => setInitial(e.target.value)} className="border p-2 rounded w-40 mr-2" />
          <span className="ml-2 text-gray-500">บาท</span>
        </div>
        <div>
          <label className="block font-medium">ผลตอบแทนที่คาดหวังต่อปี:</label>
          <input type="number" value={expectedReturn} min={0}
            onChange={e => setExpectedReturn(e.target.value)} className="border p-2 rounded w-20 mr-2" />
          <span className="ml-2 text-gray-500">%</span>
        </div>
        <hr className="my-4" />
        <div>
          <label className="block font-medium">การลงทุนเพิ่มเติม:</label>
          <input type="number" value={contribute} min={0}
            onChange={e => setContribute(e.target.value)} className="border p-2 rounded w-32 mr-2" />
          <select value={contributeFreq} onChange={e => setContributeFreq(e.target.value)}
            className="border p-2 rounded">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">การเติบโตของการลงทุนเพิ่มเติม:</label>
          <input type="number" value={growth} min={0}
            onChange={e => setGrowth(e.target.value)} className="border p-2 rounded w-20 mr-2" />
          <span className="ml-2 text-gray-500">%</span>
          <select value={growthFreq} onChange={e => setGrowthFreq(e.target.value)}
            className="border p-2 rounded ml-3">
            <option value="Yearly">Year over Year</option>
            <option value="Monthly">Month over Month</option>
          </select>
        </div>
        <div className="pt-4 pb-1 text-lg font-bold text-center">
          เงินสะสมจากแผน DCA: {" "}
          <span className="text-purple-700">
            ฿ {result ? result.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "-"}
          </span>
        </div>
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-xl mt-2"
          onClick={calculateDCA}>
          Calculate
        </button>
      </div>
    </div>
  );
}
