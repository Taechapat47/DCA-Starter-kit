import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, RefreshCw, CheckCircle, Eye } from "lucide-react";
import DCAcalculator from "../component/DCAcalculate";
import ICsection from "../component/ICsection";
import q7 from "../assets/q7.png";

// --- DATA CONSTANTS ---
const questions = [
  {
    question: "1. ปัจจุบันคุณอายุเท่าไหร่?",
    choices: ["20-29 ปี", "30-39 ปี", "40-59 ปี", "60 ปีขึ้นไป"],
  },
  {
    question: "2. สัดส่วนภาระทางการเงินและค่าใช้จ่ายประจำต่อรายได้?",
    choices: ["น้อยกว่า 25%", "25-50%", "50-75%", "มากกว่า 75%"],
  },
  {
    question: "3. สถานะทางการเงินในปัจจุบัน?",
    choices: [
      "ทรัพย์สินน้อยกว่าหนี้สิน",
      "ทรัพย์สินเท่ากับหนี้สิน",
      "ทรัพย์สินมากกว่าหนี้สิน",
      "มั่นใจว่ามีทรัพย์สินพอหลังเกษียณ",
    ],
  },
  {
    question: "4. ประสบการณ์ด้านการลงทุน?",
    choices: [
      "รู้จักแต่เงินฝากธนาคาร",
      "มีความรู้แต่ไม่เคยลงทุนจริง",
      "มีประสบการณ์ลงทุนไม่เกิน 1 ปี",
      "มีประสบการณ์ลงทุนมากกว่า 1 ปี",
    ],
  },
  {
    question: "5. ระยะเวลาที่ไม่จำเป็นต้องใช้เงินลงทุนนี้?",
    choices: ["ไม่เกิน 1 ปี", "1-3 ปี", "3-5 ปี", "มากกว่า 5 ปี"],
  },
  {
    question: "6. วัตถุประสงค์หลักในการลงทุน DCA?",
    choices: [
      "เน้นเงินต้นปลอดภัย ผลตอบแทนต่ำแต่สม่ำเสมอ",
      "เน้นผลตอบแทนสม่ำเสมอ ยอมขาดทุนบ้าง",
      "เน้นผลตอบแทนสูงขึ้น ยอมเสี่ยงขาดทุนมากขึ้น",
      "เน้นผลตอบแทนสูงสุด ยอมเสี่ยงขาดทุนส่วนใหญ่",
    ],
  },
  {
    question: "7. ตัวอย่างกลุ่มการลงทุนที่ยอมรับได้มากสุด?",
    choices: [
      "ผลตอบแทน 2.5% ไม่ขาดทุนเลย",
      "ผลตอบแทน 7% อาจขาดทุน 1%",
      "ผลตอบแทน 15% อาจขาดทุน 5%",
      "ผลตอบแทน 25% อาจขาดทุน 15%",
    ],
  },
  {
    question: "8. หากลงทุนสินทรัพย์เสี่ยงสูง คุณจะรู้สึกอย่างไร?",
    choices: [
      "กังวลและตื่นตระหนกกลัวขาดทุน",
      "ไม่สบายใจแต่พอเข้าใจได้บ้าง",
      "เข้าใจและยอมรับความผันผวนได้ในระดับหนึ่ง",
      "ไม่กังวลกับโอกาสขาดทุนสูง",
    ],
  },
  {
    question: "9. รับไม่ได้/กังวลถ้าเงินลงทุนลดลงกี่ %",
    choices: [
      "5% หรือน้อยกว่า",
      "มากกว่า 5-10%",
      "มากกว่า 10-20%",
      "มากกว่า 20% ขึ้นไป",
    ],
  },
  {
    question: "10. หากเงินลงทุนลดลงเหลือ 85% จะทำอย่างไร?",
    choices: [
      "ตกใจและขายทิ้ง",
      "กังวลใจและย้ายไปสินทรัพย์เสี่ยงต่ำ",
      "อดทนถือต่อ",
      "ยังมั่นใจ เพิ่มเงินลงทุน",
    ],
  },
];

const riskLevelText_stocks = [
  {
    min: 0,
    max: 14,
    label: "รับความเสี่ยงได้ต่ำ",
    advice: "แนะนำให้คุณเลือกซื้อหุ้นประเภท ปันผล",
    color: "text-red-600",
    recommendedReturn: 5,
  },
  {
    min: 15,
    max: 21,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างต่ำ",
    advice: "แนะนำให้คุณเลือกซื้อหุ้นประเภท ปันผล",
    color: "text-orange-600",
    recommendedReturn: 5,
  },
  {
    min: 22,
    max: 29,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างสูง",
    advice: "แนะนำให้คุณเลือกซื้อหุ้นประเภท คุณค่า",
    color: "text-yellow-600",
    recommendedReturn: 8,
  },
  {
    min: 30,
    max: 36,
    label: "รับความเสี่ยงได้สูง",
    advice: "แนะนำให้คุณเลือกซื้อหุ้นประเภท เติบโต",
    color: "text-blue-600",
    recommendedReturn: 10,
  },
  {
    min: 37,
    max: 40,
    label: "รับความเสี่ยงได้สูงมาก",
    advice: "แนะนำให้คุณเลือกซื้อหุ้นประเภท เติบโต",
    color: "text-green-600",
    recommendedReturn: 10,
  },
];

const riskLevelText_funds = [
  {
    min: 0,
    max: 14,
    label: "รับความเสี่ยงได้ต่ำ",
    advice: "แนะนำให้คุณเลือกซื้อกองทุนรวมประเภท ตลาดเงินที่ลงทุนเฉพาะในประเทศ",
    color: "text-red-600",
    recommendedReturn: 5,
  },
  {
    min: 15,
    max: 21,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างต่ำ",
    advice:
      "แนะนำให้คุณเลือกซื้อกองทุนรวมประเภท ตลาดเงิน, พันธบัตรรัฐบาล, ตราสารหนี้",
    color: "text-orange-600",
    recommendedReturn: 5,
  },
  {
    min: 22,
    max: 29,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างสูง",
    advice: "แนะนำให้คุณเลือกซื้อกองทุนรวมประเภท ผสม",
    color: "text-yellow-600",
    recommendedReturn: 8,
  },
  {
    min: 30,
    max: 36,
    label: "รับความเสี่ยงได้สูง",
    advice: "แนะนำให้คุณเลือกซื้อกองทุนรวมประเภท ตราสารทุน หรือ หมวดอุตสาหกรรม",
    color: "text-blue-600",
    recommendedReturn: 10,
  },
  {
    min: 37,
    max: 40,
    label: "รับความเสี่ยงได้สูงมาก",
    advice: "แนะนำให้คุณเลือกซื้อกองทุนรวมประเภท ทรัพย์สินทางเลือก",
    color: "text-green-600",
    recommendedReturn: 10,
  },
];

const API_BASE_URL = "http://localhost:8000/api";

const getOrCreateAnonymousId = () => {
  const ANONYMOUS_ID_KEY = "riskAssessmentAnonymousId";
  let userId = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_ID_KEY, userId);
  }
  return userId;
};

// --- MAIN COMPONENT ---
export default function RiskAssessment() {
  // --- STATE MANAGEMENT ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [showDcaCalculator, setShowDcaCalculator] = useState(false);
  const [dcaInitialValues, setDcaInitialValues] = useState(null);
  const [anonymousId, setAnonymousId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const part1Data = location.state || {};
  const goal = location.state?.goal || "";

  const goToPortfolio = () => {
    navigate("/Portfolio", {
      state: {
        goal: part1Data.goal,
      },
    });
  };

  // --- LIFECYCLE HOOKS ---
  useEffect(() => {
    const id = getOrCreateAnonymousId();
    setAnonymousId(id);
  }, []);

  const riskLevelText =
    part1Data.investmentType === "stock"
      ? riskLevelText_stocks
      : riskLevelText_funds;

  // --- EVENT HANDLERS & LOGIC ---
  const handleSelect = (choiceIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = choiceIndex;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = answers
      .map((answer, index) => (answer === null ? index + 1 : null))
      .filter((q) => q !== null);

    if (unansweredQuestions.length > 0) {
      alert(
        `กรุณาตอบคำถามให้ครบทุกข้อ\nข้อที่ยังไม่ได้ตอบ: ${unansweredQuestions.join(
          ", "
        )}`
      );
      setCurrentQuestion(unansweredQuestions[0] - 1);
      return;
    }
    setShowResult(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setSubmitted(false);
    setShowHistory(false);
    setShowDcaCalculator(false);
    setDcaInitialValues(null);
    navigate("/Riskassessment1");
  };

  // --- API CALLS ---
  const sendToGoogleSheets = async () => {
    if (!anonymousId) {
      alert("ไม่สามารถระบุตัวตนได้ กรุณาลองรีเฟรชหน้าเว็บ");
      return;
    }
    setIsSubmitting(true);

    try {
      const answersDetail = answers.map((answerIndex, questionIndex) => ({
        question: questions[questionIndex].question,
        answer: questions[questionIndex].choices[answerIndex],
        score: answerIndex + 1,
      }));

      const totalScore = answers.reduce((sum, ans) => sum + (ans + 1), 0);
      const riskResult = riskLevelText.find(
        (rl) => totalScore >= rl.min && totalScore <= rl.max
      );

      const data = {
        anonymousId: anonymousId,
        timestamp: new Date().toISOString(),
        totalScore: totalScore,
        riskLevel: riskResult?.label,
        riskAdvice: riskResult?.advice,
        answers: JSON.stringify(answersDetail),
        ...part1Data,
      };

      const response = await fetch(`${API_BASE_URL}/assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      setSubmitted(true);
      setShowDcaCalculator(true);
      setDcaInitialValues({
        years: part1Data.years,
        initial: part1Data.monthly,
        expectedReturn: riskResult?.recommendedReturn,
        contribute: part1Data.monthly,
      });
      alert("ส่งผลการประเมินเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchHistoryData = async () => {
    if (!anonymousId) {
      alert("ไม่สามารถระบุตัวตนได้ กรุณาลองรีเฟรชหน้าเว็บ");
      return;
    }
    setIsLoadingHistory(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/assessment/history?userId=${anonymousId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch history from server.");
      }
      const data = await response.json();
      const processedData = data
        .slice(1)
        .map((row) => ({
          date: row[1],
          score: parseInt(row[2], 10),
          riskLevel: row[3],
          advice: row[4],
        }))
        .reverse();
      setHistoryData(processedData);
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const totalScore = answers.reduce(
    (sum, ans) => (ans !== null ? sum + (ans + 1) : sum),
    0
  );
  const riskResult = riskLevelText.find(
    (rl) => totalScore >= rl.min && totalScore <= rl.max
  );
  const currentQ = questions[currentQuestion];

  const renderQuestionView = () => {
    if (!currentQ) {
      return (
        <div className="text-center">
          <p className="text-red-600">เกิดข้อผิดพลาด: ไม่พบคำถาม</p>
          <button
            onClick={() => setCurrentQuestion(0)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            กลับไปข้อแรก
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Progress and Navigation */}
        <div className="mb-6 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-medium text-gray-700">
              ข้อที่ {currentQuestion + 1} จาก {questions.length}
            </span>
            <span className="text-xs text-gray-500">
              ตอบแล้ว {answers.filter((a) => a !== null).length} ข้อ
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-[#6c63ff] h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          {/* <div className="flex flex-wrap gap-1 justify-center">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                  answers[index] !== null
                    ? "bg-green-500 text-white"
                    : index === currentQuestion
                    ? "bg-[#6c63ff] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={`ข้อ ${index + 1} ${
                  answers[index] !== null ? "(ตอบแล้ว)" : "(ยังไม่ตอบ)"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div> */}
        </div>

        {/* Question Body */}
        <div className="mb-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-100">
            <h2 className="text-base font-semibold mb-3 text-gray-800">
              {currentQ.question}
            </h2>

            {currentQuestion === 6 ? (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* รูปภาพด้านซ้าย */}
                <div className="flex justify-center items-start lg:w-1/2 ">
                  <img
                    src={q7}
                    alt="ตัวอย่างผลตอบแทนของกลุ่มการลงทุน"
                    className="max-w-[400px] w-full h-auto rounded-lg pt-10"
                    draggable={false}
                  />
                </div>

                {/* ตัวเลือกคำตอบด้านขวา */}
                <div className="flex-1 lg:w-1/2">
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {currentQ.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 text-sm ${
                          answers[currentQuestion] === index
                            ? "bg-blue-50 border-[#aba7f8] text-[#6c63ff] font-semibold"
                            : "bg-white border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1">{choice}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {currentQ.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 text-sm ${
                      answers[currentQuestion] === index
                        ? "bg-blue-100 border-[#aba7f8] text-[#6c63ff] font-semibold transform scale-[1.02]"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{choice}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestion === 0}
                className={`px-12 py-2 rounded-lg font-medium transition-colors text-base ${
                  currentQuestion === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gray-400 text-white hover:bg-red-500"
                }`}
              >
                ย้อนกลับ
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className={`px-7 py-3 rounded-lg font-medium transition-colors text-sm ${
                    answers.filter((a) => a !== null).length ===
                    questions.length
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {answers.filter((a) => a !== null).length === questions.length
                    ? "ดูผลการประเมิน"
                    : `ตรวจสอบคำตอบ (ตอบแล้ว ${
                        answers.filter((a) => a !== null).length
                      }/${questions.length})`}
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(questions.length - 1, prev + 1)
                    )
                  }
                  disabled={currentQuestion === questions.length - 1}
                  className={`px-12 py-2 rounded-lg font-medium transition-colors text-base ${
                    currentQuestion === questions.length - 1
                      ? "bg-gray-200 text-white cursor-not-allowed"
                      : "bg-gray-400 text-white hover:bg-green-500"
                  }`}
                >
                  ถัดไป
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderResultView = () => (
    <div className="space-y-5 text-center">
      <div className="bg-gradient-to-r from-blue-200 to-green-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ผลการประเมินความเสี่ยงของคุณ
        </h2>
        <div className="text-3xl font-bold mb-2">
          <span className="text-blue-600">{totalScore}</span>
          <span className="text-gray-600 text-lg ml-1"> คะแนน</span>
        </div>
        <div className={`text-2xl font-bold mb-3 ${riskResult?.color}`}>
          {riskResult?.label}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-xl text-gray-800 font-medium mb-1">
            คำแนะนำการลงทุน:
          </div>
          <div className="text-xl text-gray-700">{riskResult?.advice}</div>
        </div>
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={sendToGoogleSheets}
          disabled={isSubmitting || submitted}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-colors text-sm ${
            submitted
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="animate-spin" size={18} /> กำลังส่ง...
            </>
          ) : submitted ? (
            <>
              <CheckCircle size={18} /> ส่งผลแล้ว
            </>
          ) : (
            <>
              <Send size={18} /> ส่งผลการประเมิน
            </>
          )}
        </button>
        <button
          onClick={fetchHistoryData}
          disabled={isLoadingHistory}
          className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          {isLoadingHistory ? (
            <>
              <RefreshCw className="animate-spin" size={18} /> โหลด...
            </>
          ) : (
            <>
              <Eye size={18} /> ดูประวัติ
            </>
          )}
        </button>
        <button
          onClick={resetAssessment}
          className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          ประเมินใหม่
        </button>
        {submitted && (
          <button
            onClick={() => {
              navigate("/Portfolio", {
                state: {
                  goal: part1Data.goal,
                },
              });
            }}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
          >
            ไปหน้า Portfolio
          </button>
        )}
      </div>
    </div>
  );

  const renderHistoryView = () => (
    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">
          ประวัติการประเมิน
        </h2>
        <button
          onClick={() => setShowHistory(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      {historyData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">
                {historyData.length}
              </div>
              <div className="text-xs text-gray-600">ครั้งที่ประเมิน</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">
                {(
                  historyData.reduce((sum, item) => sum + item.score, 0) /
                  historyData.length
                ).toFixed(1)}
              </div>
              <div className="text-xs text-gray-600">คะแนนเฉลี่ย</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-base font-bold text-purple-600">
                {historyData[0]?.riskLevel || "-"}
              </div>
              <div className="text-xs text-gray-600">ล่าสุด</div>
            </div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {historyData.slice(0, 10).map((item, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded border flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{item.riskLevel}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(item.date).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base">{item.score}</div>
                  <div className="text-xs text-gray-600">คะแนน</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-6 text-sm">
          ยังไม่มีประวัติการประเมิน
        </div>
      )}
    </div>
  );

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl mt-8 text-xl font-prompt">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <h1 className="text-[#1AC338] font-bold text-[40px] md:text-[40px] m-2 text-center">
            แบบประเมินความเสี่ยงการลงทุน
          </h1>
        </div>
        <p className="text-[#746F6F] m-4 text-center text-[23px] font-semibold">
          ประเมินระดับความเสี่ยงที่เหมาะสมกับคุณ
        </p>
        <div className="flex justify-center w-full px-4 mt-5">
          <div className="m-4 flex rounded-full border border-gray-400 overflow-hidden text-xl">
            <button
              className="bg-white text-black font-inter px-9 py-3 text-lg rounded-full focus:outline-none"
              disabled
            >
              เป้าหมายในการลงทุน
            </button>
            <button
              className="bg-green-500 text-white font-inter px-9 py-3 text-lg rounded-full focus:outline-none"
              disabled
            >
              ความเสี่ยงที่คุณรับได้
            </button>
            <button
              className="bg-white text-black font-inter px-9 py-3 text-lg rounded-full focus:outline-none"
              disabled
            >
              DCA ที่เหมาะสมกับคุณ
            </button>
          </div>
        </div>
      </div>

      {showHistory && renderHistoryView()}
      {!showResult ? renderQuestionView() : renderResultView()}
      {showDcaCalculator && (
        <div className="w-full max-w-2xl my-8 mx-auto">
          <hr className="mb-8" />
          <DCAcalculator initialValues={dcaInitialValues} />
        </div>
      )}
    </div>
    { showDcaCalculator && <ICsection /> }
    </>
  );
}
