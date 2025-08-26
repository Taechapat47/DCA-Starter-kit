import useNoScale from "../hooks/useNoScale";

export default function DCAStarterUI() {
  useNoScale();
  return (
    <div className="min-h-screen flex flex-col font-prompt">
      <div className="relative bg-gradient-to-r from-[#ffc5d3] via-[#ffc8c3] to-[#fbd848] py-16 px-4 overflow-hidden">
        {/* Background Image 1 - Investment Data */}
        <div
          className="absolute top-1/2 right-28 transform -translate-y-1/2 w-[350px] h-[350px] bg-no-repeat bg-contain z-10"
          style={{
            backgroundImage: "url('/undraw_investment-data_m7wb 2.png')",
            backgroundPosition: "center",
          }}
        />

        {/* Background Image 2 - Group */}
        <div
          className="absolute top-1/2 right-8 transform -translate-y-1/2 w-[350px] h-[350px] bg-no-repeat bg-contain z-5"
          style={{
            backgroundImage: "url('/Group 479.png')",
            backgroundPosition: "center",
          }}
        />
        <div className="pl-16 text-left">
          <h1 className="text-[48px] font-semibold text-black mb-2">
            ยกระดับการลงทุน ด้วยเครื่องมือวิเคราะห์หุ้นพื้นฐาน
          </h1>
          <p className="text-[#1e4c63] font-medium text-[35px] mb-6 pt-4">
            หุ้นดีไม่หลุด สแกนจบในคลิกเดียว{" "}
            <span className="font-semibold text-[42px]">
              “แสกนหาหุ้นพื้นฐานดี”
            </span>
          </p>
        </div>
      </div>

      <div className=" mx-60 py-14 px-4">
        <h2 className="text-center text-[48px] font-bold mb-8">
          ทำไมต้องแสกนหาหุ้นกับ{" "}
          <span className="text-green-500 text-[50px]">DCA Starter Kit.</span>{" "}
          👏
        </h2>
        <div className="grid gap-10 md:grid-cols-4 text-xl">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="/saving 1.png"
              alt="เลือกหุ้นได้ตามสไตล์คุณ"
              className="mx-auto mb-4 w-14 h-14"
            />
            <h3 className="font-bold mb-2">เลือกหุ้นได้ตามสไตล์คุณ</h3>
            <p className="text-lg text-gray-600">
              เลือกหุ้นได้อิสระตามความสนใจ หรือเป้าหมาย ไม่จำกัดแค่หุ้นยอดนิยม
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="/market-research 1.png"
              alt="ระบบสแกนอัจฉริยะ"
              className="mx-auto mb-4 w-14 h-14"
            />
            <h3 className="font-bold mb-2">ระบบสแกนอัจฉริยะ</h3>
            <p className=" text-lg text-gray-600">
              ใช้เทคโนโลยีวิเคราะห์พื้นฐานช่วยคัดหุ้นที่ใช่ให้คุณ
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="/planning 1.png"
              alt="วางแผนการลงทุนอย่างมีระบบ"
              className="mx-auto mb-4 w-14 h-14"
            />
            <h3 className="font-bold mb-2">วางแผนการลงทุนอย่างมีระบบ</h3>
            <p className="text-lg text-gray-600">
              สม่ำเสมอ พร้อมเครื่องมือจำลองผลตอบแทน
              เพื่อการเติบโตระยะยาวอย่างมั่นใจ
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="/comfort 1.png"
              alt="ออกแบบพอร์ตลงทุนทุกระดับ"
              className="mx-auto mb-4 w-14 h-14"
            />
            <h3 className="font-bold mb-2">ออกแบบพอร์ตลงทุนทุกระดับ</h3>
            <p className="text-lg text-gray-600">
              ไม่ว่าคุณจะเป็นมือใหม่หรือมืออาชีพ
              เราช่วยให้คุณตัดสินใจได้แม่นยำและเป็นระบบมากขึ้น
            </p>
          </div>
        </div>
      </div>

      {/* ประเภทหุ้น 3 สไตล์พื้นฐาน */}
      <div className="bg-gray-50 py-12 px-20 mx-20">
        <h2 className="text-center text-5xl font-semibold mb-8">
          ประเภทหุ้น{" "}
          <span className="text-green-500 text-6xl">3 สไตล์พื้นฐาน</span>
        </h2>
        <p className="text-center font-semibold text-[#615e5e] mb-10 text-3xl">
          เลือกหุ้นได้ตามสไตล์การลงทุนของคุณ มีให้เลือก 3 สไตล์
        </p>
        <div className=" mx-20 px-20 grid gap-6 md:grid-cols-3 ">
          <div className="flex bg-white rounded-xl shadow p-6 text-center bg-gradient-to-b from-[#cfeeff] to-[#ffffff]">
            <img
              src="/undraw_personal-finance_98p3 1.png"
              alt="Dividend"
              className="mx-auto w-40 h-40"
            />
            <div className=" flex-col px-8">
            <h3 className="font-bold text-2xl text-blue-500 mb-2 text-start">Dividend</h3>
            <p className="text-lg text-gray-600 text-start">
              หุ้นที่จ่ายเงินปันผลสม่ำเสมอ เหมาะกับคนที่ต้องการรายได้ ระหว่างทาง
            </p>
            </div>
          </div>
          <div className="flex bg-white rounded-xl shadow p-6 text-center bg-gradient-to-b from-[#ddc3ff] to-[#ffffff]">
            <img
              src="/undraw_happy-news_d5bt.png"
              alt="Value"
              className="mx-auto w-40 h-40"
            />
            <div className=" flex-col px-8">
            <h3 className="font-bold text-2xl text-purple-500 mb-2 text-start">Value</h3>
            <p className="text-lg text-gray-600 text-start">
              หุ้นที่ราคาต่ำกว่ามูลค่าที่ควรเป็น เหมาะกับคนที่มองหา
              “ของดีราคาถูก”
            </p>
            </div>
          </div>
          <div className="flex bg-white rounded-xl shadow p-6 text-center bg-gradient-to-b from-[#f5e4a2] to-[#ffffff]">
            <img
              src="/undraw_investment_ojxu (1).png"
              alt="Growth"
              className="mx-auto w-40 h-40"
            />
             <div className=" flex-col px-8">
            <h3 className="font-bold text-2xl text-yellow-500 mb-2 text-start">Growth</h3>
            <p className="text-lg text-gray-600 text-start">
              หุ้นของบริษัทที่มีแนวโน้มโตเร็ว รายได้-กำไรเพิ่มต่อเนื่อง
              เหมาะกับคนเน้นกำไรระยะยาว
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
