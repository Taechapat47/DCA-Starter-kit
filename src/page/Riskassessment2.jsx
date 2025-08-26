import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, RefreshCw, CheckCircle, Eye, RotateCcw } from "lucide-react";
import DCAcalculator from "../component/DCAcalculate";
import ICsection from "../component/ICsection";
import q7 from "../assets/q7.png";
import pg1 from "../assets/pg1.png";
import risk1 from "../assets/risk1.png";
import risk2 from "../assets/risk2.png";
import risk3 from "../assets/risk3.png";
import useNoScale from "../hooks/useNoScale";

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
    advice: "หุ้นปันผล",
    color: "text-red-600",
    recommendedReturn: 5,
    riskstar: "ความเสี่ยงระดับ 1 ดาว กำไรเฉลี่ยรายปีประมาณการณ์: 5% - 9%",
    image: risk3,
    because:
      "ให้ผลตอบแทนสม่ำเสมอในรูปเงินปันผล และมักเป็นบริษัทที่มั่นคง ทำให้ความผันผวนของราคาน้อยกว่าหุ้นประเภทอื่น",
  },
  {
    min: 15,
    max: 21,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างต่ำ",
    advice: "หุ้นปันผล",
    color: "text-orange-600",
    recommendedReturn: 5,
    riskstar: "ความเสี่ยงระดับ 1 ดาว กำไรเฉลี่ยรายปีประมาณการณ์: 5% - 9%",
    image: risk3,
    because:
      "ให้ผลตอบแทนสม่ำเสมอในรูปเงินปันผล และมักเป็นบริษัทที่มั่นคง ทำให้ความผันผวนของราคาน้อยกว่าหุ้นประเภทอื่น",
  },
  {
    min: 22,
    max: 29,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างสูง",
    advice: "หุ้นคุณค่า",
    color: "text-yellow-600",
    recommendedReturn: 8,
    riskstar: "ความเสี่ยงระดับ 2 ดาว กำไรเฉลี่ยรายปีประมาณการณ์: 8% - 15%",
    image: risk1,
    because:
      "เป็นหุ้นของบริษัทที่มั่นคง มีพื้นฐานดี แต่ราคาตลาดต่ำกว่ามูลค่าที่แท้จริง ทำให้มีโอกาสเติบโตในระยะยาวและผันผวนน้อยกว่าหุ้นโตเร็ว",
  },
  {
    min: 30,
    max: 36,
    label: "รับความเสี่ยงได้สูง",
    advice: "หุ้นเติบโต",
    color: "text-green-600",
    recommendedReturn: 10,
    riskstar: "ความเสี่ยงระดับ 3 ดาว กำไรเฉลี่ยรายปีประมาณการณ์: 10% - 25%",
    image: risk2,
    because:
      "เป็นหุ้นของบริษัทที่มีศักยภาพในการขยายตัวสูง มีโอกาสที่ราคาจะเพิ่มขึ้นอย่างก้าวกระโดด แม้จะมีความผันผวนสูงตามไปด้วยครับ",
  },
  {
    min: 37,
    max: 40,
    label: "รับความเสี่ยงได้สูงมาก",
    advice: "หุ้นเติบโต",
    color: "text-blue-600",
    recommendedReturn: 10,
    riskstar: "ความเสี่ยงระดับ 3 ดาว กำไรเฉลี่ยรายปีประมาณการณ์: 10% - 25%",
    image: risk2,
    because:
      "เป็นหุ้นของบริษัทที่มีศักยภาพในการขยายตัวสูง มีโอกาสที่ราคาจะเพิ่มขึ้นอย่างก้าวกระโดด แม้จะมีความผันผวนสูงตามไปด้วยครับ",
  },
];

const riskLevelText_funds = [
  {
    min: 0,
    max: 14,
    label: "รับความเสี่ยงได้ต่ำ",
    advice: "กองทุนรวมประเภท ตลาดเงินที่ลงทุนเฉพาะในประเทศ",
    color: "text-red-600",
    recommendedReturn: 5,
    image: risk3,
    because:
      "ให้ผลตอบแทนสม่ำเสมอในรูปเงินปันผล และมักเป็นบริษัทที่มั่นคง ทำให้ความผันผวนของราคาน้อยกว่าหุ้นประเภทอื่น",
  },
  {
    min: 15,
    max: 21,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างต่ำ",
    advice: "กองทุนรวมประเภท ตลาดเงิน, พันธบัตรรัฐบาล, ตราสารหนี้",
    color: "text-orange-600",
    recommendedReturn: 5,
    image: risk3,
    because:
      "ให้ผลตอบแทนสม่ำเสมอในรูปเงินปันผล และมักเป็นบริษัทที่มั่นคง ทำให้ความผันผวนของราคาน้อยกว่าหุ้นประเภทอื่น",
  },
  {
    min: 22,
    max: 29,
    label: "รับความเสี่ยงได้ปานกลางค่อนข้างสูง",
    advice: "กองทุนรวมประเภท ผสม",
    color: "text-yellow-600",
    recommendedReturn: 8,
    image: risk1,
    because:
      "เป็นหุ้นของบริษัทที่มั่นคง มีพื้นฐานดี แต่ราคาตลาดต่ำกว่ามูลค่าที่แท้จริง ทำให้มีโอกาสเติบโตในระยะยาวและผันผวนน้อยกว่าหุ้นโตเร็ว",
  },
  {
    min: 30,
    max: 36,
    label: "รับความเสี่ยงได้สูง",
    advice: "กองทุนรวมประเภท ตราสารทุน หรือ หมวดอุตสาหกรรม",
    color: "text-green-600",
    recommendedReturn: 10,
    image: risk2,
    because:
      "เป็นหุ้นของบริษัทที่มีศักยภาพในการขยายตัวสูง มีโอกาสที่ราคาจะเพิ่มขึ้นอย่างก้าวกระโดด แม้จะมีความผันผวนสูงตามไปด้วยครับ",
  },
  {
    min: 37,
    max: 40,
    label: "รับความเสี่ยงได้สูงมาก",
    advice: "กองทุนรวมประเภท ทรัพย์สินทางเลือก",
    color: "text-blue-600",
    recommendedReturn: 10,
    image: risk2,
    because:
      "เป็นหุ้นของบริษัทที่มีศักยภาพในการขยายตัวสูง มีโอกาสที่ราคาจะเพิ่มขึ้นอย่างก้าวกระโดด แม้จะมีความผันผวนสูงตามไปด้วยครับ",
  },
];

const getRiskColor = (label) => {
  const item = [...riskLevelText_stocks, ...riskLevelText_funds].find(
    (i) => i.label === label
  );
  return item?.color || "text-gray-500";
};

const getRiskStar = (label) => {
  const item = riskLevelText_stocks.find((i) => i.label === label);
  return item?.riskstar || "";
};

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
  useNoScale();
  // --- STATE MANAGEMENT ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map((_, i) => (i === 3 ? [] : null))
  );
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDcaCalculator, setShowDcaCalculator] = useState(false);
  const [dcaInitialValues, setDcaInitialValues] = useState(null);
  const [anonymousId, setAnonymousId] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const part1Data = location.state || {};
  const goal = location.state?.goal || "";

  // --- LIFECYCLE HOOKS ---
  useEffect(() => {
    const id = getOrCreateAnonymousId();
    setAnonymousId(id);

    // ตรวจสอบว่ามาจากหน้าที่ทำเสร็จแล้วหรือไม่
    if (location.state?.fromCompleted && location.state?.resultData) {
      // โหลดข้อมูลที่เคยทำไว้
      const { answers: savedAnswers, resultData } = location.state;

      if (savedAnswers) {
        setAnswers(savedAnswers);
      }

      setShowResult(true);
      setSubmitted(true);
      setShowDcaCalculator(true);
      setSelectedResult(resultData.riskResult);
      setDcaInitialValues(resultData.dcaInitialValues);

      // เลื่อนไปยัง DCA Calculator
      setTimeout(() => {
        const dcaElement = document.getElementById("dca-calculator");
        if (dcaElement) {
          dcaElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    } else {
      // ตรวจสอบว่ามีข้อมูล part2 เก่าหรือไม่
      const savedPart2Data = localStorage.getItem("riskAssessmentPart2");
      if (savedPart2Data) {
        const data = JSON.parse(savedPart2Data);
        setAnswers(
          data.answers || questions.map((_, i) => (i === 3 ? [] : null))
        );
        setCurrentQuestion(data.currentQuestion || 0);
      }
    }
  }, [location.state]);

  // บันทึกข้อมูล part2 เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (!location.state?.fromCompleted) {
      const part2Data = {
        answers,
        currentQuestion,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("riskAssessmentPart2", JSON.stringify(part2Data));
    }
  }, [answers, currentQuestion, location.state?.fromCompleted]);

  const riskLevelText =
    part1Data.investmentType === "stock"
      ? riskLevelText_stocks
      : riskLevelText_funds;

  // --- EVENT HANDLERS & LOGIC ---
  const handleSelect = (choiceIndex) => {
    const newAnswers = [...answers];
    if (currentQuestion === 3) {
      // toggle multi-select
      const curr = newAnswers[3] || [];
      if (curr.includes(choiceIndex)) {
        newAnswers[3] = curr.filter((i) => i !== choiceIndex);
      } else {
        newAnswers[3] = [...curr, choiceIndex];
      }
      setAnswers(newAnswers);
    } else {
      newAnswers[currentQuestion] = choiceIndex;
      setAnswers(newAnswers);
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
        }, 300);
      }
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = answers
      .map((answer, index) => {
        if (index === 3)
          return !answer || answer.length === 0 ? index + 1 : null;
        return answer === null ? index + 1 : null;
      })
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
    // เคลียร์ทุก localStorage
    localStorage.removeItem("riskAssessmentPart1");
    localStorage.removeItem("riskAssessmentPart2");
    localStorage.removeItem("riskAssessmentResult");
    localStorage.removeItem("riskAssessmentCompleted");

    // รีเซ็ต state
    setCurrentQuestion(0);
    setAnswers(questions.map((_, i) => (i === 3 ? [] : null)));
    setShowResult(false);
    setSubmitted(false);
    setShowDcaCalculator(false);
    setDcaInitialValues(null);
    setSelectedResult(null);

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
      const answersDetail = answers.map((answerIndex, questionIndex) => {
        if (questionIndex === 3 && Array.isArray(answerIndex)) {
          return {
            question: questions[questionIndex].question,
            answer: answerIndex
              .map((i) => questions[questionIndex].choices[i])
              .join(", "),
            score: Math.max(...answerIndex.map((i) => i + 1)),
          };
        } else {
          return {
            question: questions[questionIndex].question,
            answer: questions[questionIndex].choices[answerIndex],
            score: answerIndex + 1,
          };
        }
      });

      const totalScore = answers.reduce((sum, ans, idx) => {
        if (idx === 3) {
          if (!ans || ans.length === 0) return sum;
          const maxScore = Math.max(...ans.map((i) => i + 1));
          return sum + maxScore;
        } else {
          return ans !== null ? sum + (ans + 1) : sum;
        }
      }, 0);

      const riskResult = riskLevelText.find(
        (rl) => totalScore >= rl.min && totalScore <= rl.max
      );

      const dcaValues = {
        years: part1Data.years,
        initial: part1Data.monthly,
        expectedReturn: riskResult?.recommendedReturn,
        contribute: part1Data.monthly,
        advice: riskResult?.advice,
        because: riskResult?.because,
      };

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

      // บันทึกผลลัพธ์ลง localStorage
      const resultData = {
        riskResult,
        dcaInitialValues: dcaValues,
        totalScore,
        answers,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("riskAssessmentResult", JSON.stringify(resultData));
      localStorage.setItem("riskAssessmentCompleted", "true");

      setSubmitted(true);
      setShowDcaCalculator(true);
      setDcaInitialValues(dcaValues);

      setTimeout(() => {
        const dcaElement = document.getElementById("dca-calculator");
        if (dcaElement) {
          dcaElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);

      alert("ส่งผลการประเมินเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  // totalScore ใหม่
  const totalScore = answers.reduce((sum, ans, idx) => {
    if (idx === 3) {
      if (!ans || ans.length === 0) return sum;
      const maxScore = Math.max(...ans.map((i) => i + 1));
      return sum + maxScore;
    } else {
      return ans !== null ? sum + (ans + 1) : sum;
    }
  }, 0);

  const calculatedRiskResult = riskLevelText.find(
    (rl) => totalScore >= rl.min && totalScore <= rl.max
  );
  const riskResult = selectedResult || calculatedRiskResult;
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
        <div className="mb-4 flex flex-row gap-8 w-full px-4">
          {/* ส่วนรูปภาพด้านซ้าย */}
          <div className=" flex justify-center items-center ml-12">
            {currentQuestion === 6 ? (
              <div className="flex justify-center items-center ">
                <img
                  src={q7}
                  alt="ตัวอย่างผลตอบแทนของกลุ่มการลงทุน"
                  className="w-[800px] h-[500px] object-contain"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center ">
                <img
                  src={pg1}
                  alt="ตัวอย่างผลตอบแทนของกลุ่มการลงทุน"
                  className="w-[800px] h-[500px] object-contain"
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* ส่วนเนื้อหาด้านขวา */}
          <div className=" flex-col w-[800px] h-full ml-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-medium text-gray-700">
                ข้อที่ {currentQuestion + 1} จาก {questions.length}
              </span>
              <span className="text-xs text-gray-500">
                ตอบแล้ว{" "}
                {
                  answers.filter((a, i) =>
                    i === 3 ? a.length > 0 : a !== null
                  ).length
                }{" "}
                ข้อ
              </span>
            </div>
            <div className="w-full rounded-full h-3 mb-6">
              <div
                className="bg-[#6c63ff] h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div
              className="mb-4 rounded-2xl"
              style={{ boxShadow: "-2px 2px 8px rgba(0,0,0,0.4)" }}
            >
              <div className=" p-4 rounded-2xl shadow-sm  ">
                <h2 className="text-xl font-semibold mb-6 text-black">
                  {currentQ.question}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.choices.map((choice, index) => {
                    const isSelected =
                      currentQuestion === 3
                        ? answers[3]?.includes(index)
                        : answers[currentQuestion] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`w-full p-3 m-1 text-left rounded-2xl  transition-all duration-200 text-base ${
                          isSelected
                            ? "bg-blue-100 border-[#aba7f8] text-[#6c63ff] font-semibold transform scale-[1.02]"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.4)" }}
                      >
                        <div className="flex items-center">
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1">{choice}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {currentQuestion === 3 && (
                  <div className="mt-2 text-xs text-gray-500">
                    * ข้อนี้สามารถเลือกได้มากกว่า 1 ข้อ
                  </div>
                )}
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  <button
                    onClick={() =>
                      setCurrentQuestion((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestion === 0}
                    className={`px-12 py-2 rounded-full font-medium transition-colors text-base ${
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
                      className={`px-7 py-3 rounded-full font-medium transition-colors text-sm ${
                        answers.filter((a) => a !== null).length ===
                        questions.length
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {answers.filter((a) => a !== null).length ===
                      questions.length
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
                      className={`px-12 py-2 rounded-full font-medium transition-colors text-base ${
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
          </div>
        </div>
      </>
    );
  };

  const renderResultView = () => (
    <div className="space-y-5 text-center ">
      <div className="bg-gradient-to-r from-[#d5e5ff] to-[#d1ffe5] p-6 rounded-2xl mx-auto w-[950px] min-h-[450px]">
        <h2 className="text-3xl font-normal text-gray-800 mb-4 mt-2">
          จากผลการประเมินคุณคือนักลงทุนประเภท...
        </h2>
        <div
          className="bg-white p-4 rounded-2xl shadow-sm m-6"
          style={{ boxShadow: " -1px 2px 7px #6a757b" }}
        >
          <div className={`text-4xl font-semibold mb-4 ${riskResult?.color}`}>
            {riskResult?.label}
          </div>
          <div className="flex justify-center mb-6">
            <div className="">
              {riskResult?.image && (
                <img
                  src={riskResult.image}
                  alt={riskResult.label || "Risk level"}
                  className="w-32 h-32 object-contain"
                />
              )}
            </div>
          </div>
          <div className="text-3xl text-black font-[450] m-2">
            โดยคุณสนใจลงทุนใน :{" "}
            <span className="text-[#6C63FF]"> {riskResult?.advice}</span>
          </div>
          <div className="text-3xl font-[450] text-black m-2">
            ด้วยเงินจำนวน{" "}
            <span className="text-[#6C63FF]">
              {part1Data.monthly?.toLocaleString()}
            </span>{" "}
            บาท/เดือน{" "}
          </div>
        </div>
        <div className="text-3xl text-gray-700 text-center pt-4 pb-4">
          {riskResult?.riskstar}
        </div>
      </div>
      <div className="m-4 text-black font-bold text-[38px] pb-10 pt-6">
        มาดูการลงทุน <span className="text-[#38cf53] text-5xl">DCA</span>{" "}
        ที่เหมาะสมกับคุณกัน!
      </div>
      <div className="flex gap-3 justify-center flex-wrap z-30 ">
        {!submitted && (
          <button
            onClick={sendToGoogleSheets}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-colors text-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="animate-spin" size={18} /> กำลังส่ง...
              </>
            ) : (
              <>
                <Send size={18} />  <span>ส่งผลการประเมิน</span>
              </>
            )}
          </button>
        )}

        {submitted && (
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm bg-green-100 text-green-700 cursor-not-allowed"
            disabled
          >
            <CheckCircle size={18} /> <span>ส่งผลแล้ว</span>
          </button>
        )}

        <button
          onClick={resetAssessment}
          className="flex items-center gap-2 px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm z-50"
        >
          <RotateCcw size={18} /> <span>ประเมินใหม่</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className=" mx-auto p-6 bg-white rounded-2xl mt-8 text-xl font-prompt">
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

        {!showResult ? renderQuestionView() : renderResultView()}
        {showDcaCalculator && (
          <div id="dca-calculator">
            <DCAcalculator initialValues={dcaInitialValues} />
          </div>
        )}
      </div>
      {showDcaCalculator && <ICsection />}
    </>
  );
}
