export const TopSection = () => {
  return (
    <>
      <div className="relative bg-gradient-to-r from-[#ffc5d3] via-[#ffc8c3] to-[#fbd848] py-16 px-4 overflow-hidden font-prompt">
        <div
          className="absolute top-1/2 right-28 transform -translate-y-1/2 w-[350px] h-[350px] bg-no-repeat bg-contain z-10"
          style={{
            backgroundImage: "url('/undraw_investment-data_m7wb 2.png')",
            backgroundPosition: "center",
          }}
        />
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

      {/* Fund Info Card */}
      <div className="max-w-6xl mx-auto px-4 py-6 font-prompt">
        <div
          className="bg-white rounded-md p-6 mb-6"
          style={{
            boxShadow: "0 0 6px rgba(0,0,0,0.4) , 0 0 100px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            หุ้นพื้นฐานดี
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            เหมาะสำหรับนักลงทุนที่ต้องการค้นหาหุ้นตามแนวทาง Value Investor
            โดยคัดเลือกหุ้นที่มีฐานะทางการเงินมั่นคง
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              <span className="font-semibold">หมายเหตุ:</span>{" "}
              หุ้นเป้าหมายที่คัดกรองแล้วเป็นการคัดกรองเบื้องต้น
              ผู้ลงทุนควรศึกษาข้อมูลเพิ่มเติมประกอบการตัดสินใจลงทุน
            </p>
            <div className="text-blue-600 font-bold">คาดการณ์กำไร 5%</div>
          </div>
        </div>
      </div>
    </>
  );
};
