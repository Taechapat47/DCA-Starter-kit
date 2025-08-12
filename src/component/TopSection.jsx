
export const TopSection = () => {
  return (
    <>
      <div
        className="w-full h-[180px] bg-cover bg-center bg-no-repeat py-8 px-4"
        style={{ backgroundImage: "url('/nav01.png')" }}
         // ใส่ path รูปจากที่อัปโหลด
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
              ยกระดับการลงทุน ด้วยเครื่องมือวิเคราะห์หุ้นพื้นฐาน
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              หุ้นดีไม่หลบ สแกนจบในคลิกเดียว “แสกนหาหุ้นพื้นฐานดี”
            </p>
          </div>
        </div>
      </div>

      {/* Fund Info Card */}
      <div className="max-w-6xl mx-auto px-4 py-6"
      
      >
        <div className="bg-white rounded-md p-6 mb-6"
        style={{boxShadow: "0 0 6px rgba(0,0,0,0.4) , 0 0 100px rgba(0,0,0,0.1)"}}
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
