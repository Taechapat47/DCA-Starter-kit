import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { DollarSign } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Clock } from "lucide-react";

const frequencyMap = {
  Monthly: 12,
  Quarterly: 4,
  Yearly: 1,
};

export default function DCAcalculator({ initialValues }) {
  const [years, setYears] = useState("");
  const [initial, setInitial] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [contribute, setContribute] = useState("");
  const [advice, setAdvice] = useState("");
  const [because, setBecause] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setYears(initialValues.years || "");
      setInitial(initialValues.initial || "");
      setExpectedReturn(initialValues.expectedReturn || "");
      setContribute(initialValues.contribute || "");
      setAdvice(initialValues.advice || "");
      setBecause(initialValues.because || "");
    }
  }, [initialValues]);

  useEffect(() => {
    const allValuesPresent = years && initial && expectedReturn && contribute;
    if (allValuesPresent) {
      let total = Number(initial);
      let currentContribute = Number(contribute);
      const periods = Number(years) * frequencyMap["Monthly"];
      const r = Math.pow(1 + Number(expectedReturn) / 100, 1 / 12) - 1;
      if (
        isNaN(total) ||
        isNaN(currentContribute) ||
        isNaN(periods) ||
        isNaN(r)
      ) {
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
    <div className="flex flex-row w-[2150px] h-[850px] ml-14 mb-6 font-prompt ">
      {/* ฝั่งซ้าย (ใส่รูป) */}
      <div className="absolute bottom-[-1px] left-[-200px] ">
        <img
          src="/Group 432.png" // 🔁 ใส่ path รูปเหรียญล่างซ้าย
          alt="Coin Bottom Left"
          className="w-[900px] h-[650px] object-contain pointer-events-none "
        />
      </div>
      <div className="absolute top-[750px] right-[-240px] z-20">
        <img
          src="/Group 388.png" // 🔁 ใส่ path รูปเหรียญขวา
          alt="Coin Right"
          className="w-[1100px] h-[1100px] object-contain pointer-events-none "
        />
      </div>
      <div className="w-1/3 flex items-center justify-center p-6 ml-6">
        <div className="w-[650px] h-[650px] relative">
          <img
            src="/Group 428.png" // 🔁 เปลี่ยน path นี้เป็นรูปที่ต้องการ
            alt="DCA Calculator"
            className="w-full h-full object-contain "
          />
        </div>
      </div>

      {/* ฝั่งขวา (มี bg รูปภาพ และกล่องข้อมูลทับด้านบน) */}
      <div
        className="w-1/2 p-6 flex flex-col rounded justify-center gap-4 bg-cover bg-center bg-no-repeat scale-75 ml-5 overflow-hidden opacity-70"
        style={{
          backgroundImage: "url(/bg-l-02.png)", // 🔁 เปลี่ยน path รูปพื้นหลังตามต้องการ
        }}
      >
        <div className="mb-32 pr-6 pl-6 pt-8">
          <h2 className="text-5xl font-bold text-black pl-4 pt-14">
            ประเภทหุ้นที่ควรซื้อ{" "}
          </h2>
          <p className="text-3xl text-black p-4 font-normal">
            คุณควรซื้อหุ้นประเภท:{" "}
            <span className="text-[40px] font-medium text-[#6c63ff]">
              {advice}
            </span>
          </p>
          <p className="text-[40px] font-medium text-[#6c63ff] p-5 ">
            เพราะ {"       "}
            <span className="text-3xl text-black font-normal">{because}</span>
          </p>
        </div>

        <div className="relative z-10 gap-8 mb-24">
          <div className="grid grid-cols-2 gap-8 text-sm mt-4">
            {/* คาดการณ์กำไรที่ */}
            <div className="text-center">
              <p className="text-purple-500 font-semibold flex text-4xl p-2 ">
                <TrendingUp size={32} /> คาดการณ์กำไรที่
              </p>
              <p className="bg-white rounded-2xl p-4 shadow text-2xl font-bold text-gray-800 m-2">
                {expectedReturn}%
              </p>
            </div>

            {/* คุณจะได้กำไรทั้งหมด */}
            {result !== null && (
              <div className="text-center">
                <p className="text-[#16894e] font-semibold flex text-4xl p-2  ">
                  <DollarSign size={32} /> คุณจะได้กำไรทั้งหมด
                </p>
                <p className="bg-white rounded-2xl p-4 shadow text-2xl font-bold text-gray-800 m-2">
                  ฿
                  {result.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            )}

            {/* จำนวนเงินลงทุนต่อเดือน */}
            <div className="text-center">
              <p className="text-cyan-600 font-semibold flex text-4xl p-2">
                <BarChart3 size={32} />
                คุณลงทุนไป
              </p>
              <p className="bg-white rounded-2xl p-4 shadow text-2xl font-bold text-gray-800 m-2">
                {Number(contribute).toLocaleString()} บาท/เดือน
              </p>
            </div>

            {/* ใช้ระยะเวลา */}
            <div className="text-center">
              <p className="text-pink-500 font-semibold flex text-4xl p-2 ">
                <Clock size={32} />
                ใช้ระยะเวลา
              </p>
              <p className="bg-white rounded-2xl p-4 shadow text-2xl font-bold text-gray-800 m-2">
                {years} ปี
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
