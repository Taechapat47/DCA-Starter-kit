import React, { useState } from "react";

const questions = [
  {
    question: "1. ปัจจุบันคุณอายุเท่าไหร่?",
    choices: [
      "20-29 ปี",
      "30-39 ปี",
      "40-59 ปี",
      "60 ปีขึ้นไป"
    ]
  },
  {
    question: "2. สัดส่วนภาระทางการเงินและค่าใช้จ่ายประจำต่อรายได้?",
    choices: [
      "น้อยกว่า 25%",
      "25-50%",
      "50-75%",
      "มากกว่า 75%"
    ]
  },
  {
    question: "3. สถานะทางการเงินในปัจจุบัน?",
    choices: [
      "ทรัพย์สินน้อยกว่าหนี้สิน",
      "ทรัพย์สินเท่ากับหนี้สิน",
      "ทรัพย์สินมากกว่าหนี้สิน",
      "มั่นใจว่ามีทรัพย์สินพอหลังเกษียณ"
    ]
  },
  {
    question: "4. ประสบการณ์ด้านการลงทุน?",
    choices: [
      "รู้จักแต่เงินฝากธนาคาร",
      "มีความรู้แต่ไม่เคยลงทุนจริง",
      "มีประสบการณ์ลงทุนไม่เกิน 1 ปี",
      "มีประสบการณ์ลงทุนมากกว่า 1 ปี"
    ]
  },
  {
    question: "5. ระยะเวลาที่ไม่จำเป็นต้องใช้เงินลงทุนนี้?",
    choices: [
      "ไม่เกิน 1 ปี",
      "1-3 ปี",
      "3-5 ปี",
      "มากกว่า 5 ปี"
    ]
  },
  {
    question: "6. วัตถุประสงค์หลักในการลงทุน DCA?",
    choices: [
      "เน้นเงินต้นปลอดภัย ผลตอบแทนต่ำแต่สม่ำเสมอ",
      "เน้นผลตอบแทนสม่ำเสมอ ยอมขาดทุนบ้าง",
      "เน้นผลตอบแทนสูงขึ้น ยอมเสี่ยงขาดทุนมากขึ้น",
      "เน้นผลตอบแทนสูงสุด ยอมเสี่ยงขาดทุนส่วนใหญ่"
    ]
  },
  {
    question: "7. ตัวอย่างกลุ่มการลงทุนที่ยอมรับได้มากสุด?",
    choices: [
      "ผลตอบแทน 2.5% ไม่ขาดทุนเลย",
      "ผลตอบแทน 7% อาจขาดทุน 1%",
      "ผลตอบแทน 15% อาจขาดทุน 5%",
      "ผลตอบแทน 25% อาจขาดทุน 15%"
    ]
  },
  {
    question: "8. หากลงทุนสินทรัพย์เสี่ยงสูง คุณจะรู้สึกอย่างไร?",
    choices: [
      "กังวลและตื่นตระหนกกลัวขาดทุน",
      "ไม่สบายใจแต่พอเข้าใจได้บ้าง",
      "เข้าใจและยอมรับความผันผวนได้ในระดับหนึ่ง",
      "ไม่กังวลกับโอกาสขาดทุนสูง"
    ]
  },
  {
    question: "9. รับไม่ได้/กังวลถ้าเงินลงทุนลดลงกี่ %",
    choices: [
      "5% หรือน้อยกว่า",
      "มากกว่า 5-10%",
      "มากกว่า 10-20%",
      "มากกว่า 20% ขึ้นไป"
    ]
  },
  {
    question: "10. หากเงินลงทุนลดลงเหลือ 85% จะทำอย่างไร?",
    choices: [
      "ตกใจและขายทิ้ง",
      "กังวลใจและย้ายไปสินทรัพย์เสี่ยงต่ำ",
      "อดทนถือต่อ",
      "ยังมั่นใจ เพิ่มเงินลงทุน"
    ]
  }
];

const riskLevelText = [
  { min: 0, max: 14, label: "รับความเสี่ยงได้ต่ำ", advice: "ควรลงทุนในกองทุนรวมตราสารหนี้ 80% หุ้น 20%" },
  { min: 15, max: 21, label: "รับความเสี่ยงได้ปานกลางค่อนข้างต่ำ", advice: "ควรลงทุนในกองทุนรวมตราสารหนี้ผสมหุ้น 80% หุ้น 20%" },
  { min: 22, max: 29, label: "รับความเสี่ยงได้ปานกลางค่อนข้างสูง", advice: "ควรลงทุนในกองทุนรวมตราสารหนี้ผสมหุ้น 50% หุ้น 50%" },
  { min: 30, max: 36, label: "รับความเสี่ยงได้สูง", advice: "ควรลงทุนในกองทุนรวมตราสารหนี้ผสมหุ้น 20% หุ้น 80%" },
  { min: 37, max: 40, label: "รับความเสี่ยงได้สูงมาก", advice: "ควรลงทุนในกองทุนรวมหุ้น 20% หุ้น 80%" }
];

export default function RiskAssessment() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qIdx, cIdx) => {
    const next = [...answers];
    next[qIdx] = cIdx;
    setAnswers(next);
  };

  const handleSubmit = () => setShowResult(true);

  const totalScore = answers.reduce((sum, ans) => ans !== null ? sum + (ans + 1) : sum, 0);

  const riskResult = riskLevelText.find(
    rl => totalScore >= rl.min && totalScore <= rl.max
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center">แบบประเมินความเสี่ยงการลงทุน</h1>
      {!showResult ? (
        <>
          {questions.map((q, i) => (
            <div className="mb-6" key={i}>
              <div className="font-semibold mb-2">{q.question}</div>
              <div className="space-y-2">
                {q.choices.map((choice, j) => (
                  <label
                    key={j}
                    className={`flex items-center space-x-3 cursor-pointer rounded-lg px-2 py-1 transition-all
                      ${answers[i] === j ? "bg-green-200 font-semibold" : "hover:bg-gray-100"}`}
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={answers[i] === j}
                      onChange={() => handleSelect(i, j)}
                      className="form-radio text-green-600"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className={`w-full mt-6 py-2 rounded-lg bg-green-600 text-white font-bold text-lg 
              transition-all shadow-lg hover:bg-green-700 disabled:opacity-50`}
            onClick={handleSubmit}
            disabled={answers.some(a => a === null)}
          >
            ประเมินผล
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-xl font-bold text-green-700 mb-2">
            คะแนนรวมของคุณ: {totalScore} คะแนน
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {riskResult?.label}
          </div>
          <div className="mt-2 text-gray-800 text-lg">{riskResult?.advice}</div>
          <div className="mt-6">
            <button
              className="py-2 px-6 rounded bg-gray-200 font-semibold hover:bg-gray-300"
              onClick={() => { setShowResult(false); setAnswers(Array(questions.length).fill(null)); }}
            >
              ทำแบบประเมินใหม่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
