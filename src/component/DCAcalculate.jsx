import React, { useState } from "react";

export default function DCAcalculator() {
  const [monthlyInvest, setMonthlyInvest] = useState("");
  const [prices, setPrices] = useState(""); // กรอกราคาหุ้นคั่นด้วย , เช่น 50,55,52,60
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const priceList = prices
      .split(",")
      .map((p) => parseFloat(p.trim()))
      .filter((n) => !isNaN(n) && n > 0);
    if (!monthlyInvest || priceList.length === 0) {
      setResult(null);
      return;
    }
    let totalShares = 0;
    let totalInvestment = 0;

    priceList.forEach((price) => {
      const shares = Number(monthlyInvest) / price;
      totalShares += shares;
      totalInvestment += Number(monthlyInvest);
    });

    const lastPrice = priceList[priceList.length - 1];
    const currentValue = totalShares * lastPrice;
    const profit = currentValue - totalInvestment;
    const profitPercent = (profit / totalInvestment) * 100;

    setResult({
      totalShares,
      totalInvestment,
      currentValue,
      profit,
      profitPercent,
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        คำนวณผลตอบแทน DCA หุ้น
      </h2>
      <div className="mb-4">
        <label className="font-medium">จำนวนเงินลงทุนต่อเดือน (บาท)</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded w-full"
          value={monthlyInvest}
          onChange={(e) => setMonthlyInvest(e.target.value)}
          min={0}
        />
      </div>
      <div className="mb-4">
        <label className="font-medium">
          ราคาหุ้นแต่ละเดือน (คั่นด้วยเครื่องหมาย , เช่น 50,51,55,53)
        </label>
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full"
          value={prices}
          onChange={(e) => setPrices(e.target.value)}
        />
        <div className="text-gray-500 text-xs mt-1">
          * ใส่ราคาต่อเดือน เช่น 50,51,55,53 (ใส่เท่ากับจำนวนเดือนที่ลงทุน)
        </div>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-4 w-full font-semibold"
        onClick={handleCalculate}
      >
        คำนวณ
      </button>
      {result && (
        <div className="bg-gray-50 rounded-xl p-4 mt-2 text-center">
          <div>จำนวนหุ้นรวม: <span className="font-bold">{result.totalShares.toFixed(4)}</span> หุ้น</div>
          <div>เงินลงทุนรวม: <span className="font-bold">{result.totalInvestment.toLocaleString()} บาท</span></div>
          <div>มูลค่าปัจจุบัน: <span className="font-bold">{result.currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} บาท</span></div>
          <div>กำไร/ขาดทุน: <span className={`font-bold ${result.profit >= 0 ? "text-green-600" : "text-red-600"}`}>{result.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })} บาท</span></div>
          <div>เปอร์เซ็นต์กำไร/ขาดทุน: <span className={`font-bold ${result.profitPercent >= 0 ? "text-green-600" : "text-red-600"}`}>{result.profitPercent.toFixed(2)}%</span></div>
        </div>
      )}
    </div>
  );
}
