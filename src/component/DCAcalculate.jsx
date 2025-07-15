import React, { useState, useEffect } from "react";

const frequencyMap = {
  "Monthly": 12,
  "Quarterly": 4,
  "Yearly": 1,
};

// คอมโพเนนต์จะรับ props ที่ชื่อ initialValues
export default function DCAcalculator({ initialValues }) {
  // กำหนด State เริ่มต้นเป็นค่าว่าง
  const [years, setYears] = useState("");
  const [initial, setInitial] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [contribute, setContribute] = useState("");
  const [result, setResult] = useState(null);

  // ใช้ useEffect เพื่ออัปเดต state เมื่อได้รับ props initialValues ใหม่
  // ทำให้ค่าในเครื่องคิดเลขเปลี่ยนตามผลประเมินล่าสุดเสมอ
  useEffect(() => {
    if (initialValues) {
      setYears(initialValues.years || "");
      setInitial(initialValues.initial || "");
      setExpectedReturn(initialValues.expectedReturn || "");
      setContribute(initialValues.contribute || "");
    }
  }, [initialValues]);

  // useEffect สำหรับคำนวณอัตโนมัติเมื่อค่าเปลี่ยน
  useEffect(() => {
    const allValuesPresent = years && initial && expectedReturn && contribute;

    if (allValuesPresent) {
      let total = Number(initial);
      let currentContribute = Number(contribute);
      const periods = Number(years) * frequencyMap["Monthly"]; // สมมติว่าลงทุนเป็นรายเดือนเสมอ
      const r = Math.pow(1 + Number(expectedReturn) / 100, 1 / 12) - 1;

      // ตรวจสอบค่าเบื้องต้นเพื่อป้องกันผลลัพธ์ที่ผิดพลาด (NaN)
      if (isNaN(total) || isNaN(currentContribute) || isNaN(periods) || isNaN(r)) {
          setResult(null);
          return;
      }

      for (let i = 0; i < periods; i++) {
        total = total * (1 + r) + currentContribute;
      }
      setResult(total);
    } else {
      setResult(null); // รีเซ็ตผลลัพธ์ถ้ามีช่องใดยังไม่ได้กรอก
    }
  }, [years, initial, expectedReturn, contribute]); // ทำงานเมื่อค่าเหล่านี้เปลี่ยน

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 border">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">DCA ที่เหมาะสมกับคุณ</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">ระยะเวลาสำหรับแผนของคุณ:</label>
          <div className="flex items-center mt-1">
            <input type="number" value={years}
              readOnly
              className="border p-2 rounded w-full mr-2 bg-gray-100 cursor-not-allowed"
            />
            <span className="text-gray-500">ปี</span>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">เงินต้น:</label>
          <div className="flex items-center mt-1">
            <input type="number" value={initial}
              readOnly
              className="border p-2 rounded w-full mr-2 bg-gray-100 cursor-not-allowed"
            />
            <span className="text-gray-500">บาท</span>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">ผลตอบแทนที่คาดหวังต่อปี:</label>
           <div className="flex items-center mt-1">
            <input type="number" value={expectedReturn}
              readOnly
              className="border p-2 rounded w-full mr-2 bg-gray-100 cursor-not-allowed"
            />
            <span className="text-gray-500">%</span>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <label className="block font-medium text-gray-700">การลงทุนเพิ่มเติม:</label>
           <div className="flex items-center mt-1">
            <input type="number" value={contribute}
              readOnly
              className="border p-2 rounded w-full mr-2 bg-gray-100 cursor-not-allowed"
            />
            <span className="ml-2 text-gray-500 whitespace-nowrap">บาท/เดือน</span>
          </div>
        </div>
        
        {result !== null && (
            <div className="pt-4 pb-1 text-lg font-bold text-center">
                เงินสะสมจากแผน DCA: {" "}
                <span className="text-green-600 text-xl">
                    ฿{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
            </div>
        )}
      </div>
    </div>
  );
}
