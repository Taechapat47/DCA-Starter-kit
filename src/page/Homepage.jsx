import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, } from 'lucide-react';

export default function DcaPage() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative w-full h-[270px] bg-gradient-to-r from-pink-200 via-pink-200 to-yellow-300 overflow-hidden font-prompt">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/Group 365.png")' }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-10" />
        </div>
        {/* เนื้อหา*/}
        <div className="relative z-10 grid grid-cols-1 h-full px-8 items-center ">
          <div className="flex justify-center items-center">
            <div className="relative text-white text-[37px] font-bold mb-2 w-fit drop-shadow-2xl">
              <span className="relative z-10">
                <span className="text-white" style={{textShadow: '0 4px 6px rgba(0,0,0,0.4)'}}>DCA STARTER KIT </span>
                <span className="font-medium text-white ml-1" style={{textShadow: '0 4px 6px rgba(0,0,0,0.4)'}}> เว็บไซต์ที่จะพาคุณไปสำรวจ</span>
              </span>
              <div className=" flex text-black text-[55px] font-extrabold drop-shadow-md justify-center items-center">
                โลกของการ
                <span className="inline-flex items-center text-green-500">ลงทุนแบบ DCA
                  <TrendingUp className="w-14 h-14 text-purple-600 rotate-[25deg] drop-shadow-md" strokeWidth={3} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dollar Cost Average Section */}
      <div className="w-full p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
          <div className="flex-1 flex justify-center">
            <div
              className="w-80 h-80 bg-cover bg-center rounded-2xl"
              style={{backgroundImage: 'url("logo0.20.png")'}}
            >
            </div>
          </div>
          <div className="flex-1 space-y-6 font-prompt">
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 " style={{textShadow: '0 5px 7px rgba(0,0,0,0.4)'}}>
                การลงทุนแบบ <span className="text-black">DCA</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-700 ">
                หรือ Dollar Cost Average
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-green-600 ">
              คือ การทยอยลงทุนระยะยาว
            </h3>
            <p className="text-black text-lg lg:text-xl leading-relaxed ">
              ซื้อหุ้นหรือกองทุน ด้วยเงินเท่าเดิมเดือนละหนึ่งครั้ง
              <br />
              โดยไม่สนว่าหุ้นหรือกองทุนที่เราลงทุนนั้นบูลล์ก็าช่ะแพงหรือถูก
            </p>
          </div>
        </div>
      </div>

      {/* DCA Benefits Section */}
      <div className="relative w-full h-[600px] mt-20  bg-gradient-to-b from-gray-50  to-gray-400 overflow-hidden font-prompt">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('Mask group.png')"
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto translate-y-8">
          {/* Header */}
          <div className="text-center mb-12 text-black text-4xl md:text-5xl font-bold font-prompt">
            <h1 className="">
              <span className="">ทำไม ?</span>{' '}
              <span className="">นักลงทุนมือใหม่และมือเก่าจึงควร</span>
            </h1>
            <h2 className="">
              เลือกการลงทุนแบบ DCA{' '}
              <span className="text-purple-500">✨</span>
            </h2>
          </div>

          {/* Cards  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 translate-y-5  shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-center text-lg font-bold">
                <h3 className=" text-green-600 mb-2 font-prompt">ความเสี่ยงน้อย</h3>
                <p className=" text-gray-600 mb-4 font-prompt">ควรจะลงทุนแบบยืด</p>
                
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('img01.png')"
                  }}
                ></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 translate-y-20 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-center text-xl font-bold ">
                <h3 className=" text-gray-700 mb-1 font-prompt">เริ่มต้นลงทุนตั้งแต่</h3>
                <p className="  text-gray-700 mb-1 font-prompt">เพียง
                   <span className=" text-green-600 mb-4 font-prompt pl-2">
                   2,000 บาท/เดือน
                   </span>
                   </p>
                
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('img02.png')"
                  }}
                ></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 translate-y-5 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-center text-xl font-bold">
                <h3 className=" text-gray-700 mb-1 font-prompt ">การออมยิ่งได้ถึง
                  <span className=" inline-flex text-green-600 mb-4 font-prompt pl-2 ">1-8%</span>
                </h3>
                
                
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('img03.png')"
                  }}
                ></div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 translate-y-20 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-center text-xl font-bold">
                <h3 className=" text-gray-700 mb-1 font-prompt">การลงทุนระยะยาว 
                  <span className=" inline-flex text-green-600 font-prompt pr-2">
                    ยังไงก็กำไร! 
                   </span>
                   ถ้าเลือกหุ้นดี
                </h3>               
                <div 
                  className="w-24 h-24 pt-3 mx-auto mb-4 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('img04.png')"
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div 
      className="min-h-screen text-white p-6 flex flex-col items-center relative overflow-hidden bg-cover bg-center font-prompt"
      style={{ backgroundImage: "url('/bg-black.png')" }}
      >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col-2 text-left mb-16 mt-12 relative z-10 font-prompt">
        <div className="flex flex-col mb-4">
          <h1 className="text-8xl font-bold text-[#38CF53] mr-4">เหตุผล<br />2 ข้อ</h1>
        </div>
        <div className="flex flex-col justify-between h-full pt-14 p-2 ">
          <h2 className="text-4xl text-white ">
          ที่การลงทุนแบบ <span className="font-bold">DCA</span>
          </h2>
          <h3 className="text-4xl text-purple-400 font-semibold pt-4 ">
          ขึ้นชื่อเรื่องความเสี่ยงน้อย
          </h3>
        </div>
      </div>

      {/* กล่อง 1 */}
      <div className="w-full mb-12 flex justify-center relative z-10">
        <div 
          className="w-[700px] relative rounded-3xl p-8 shadow-2xl  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Group 361.png')",
          backgroundSize: "100% 100%",
           }}
        >
          <div className="flex items-start gap-4 relative z-10 max-w-5xl">
            <div className=" text-[#38CF53] w-12 h-12 pl-2 pt-2 flex items-center justify-center text-7xl font-bold shrink-0">
              1.
            </div>
            <div className="text-black">
              <h3 className="text-3xl font-bold ">
                ซื้อหุ้น<span className="text-purple-600">ได้ถูกลง</span>
              </h3>
              <h4 className="text-3xl font-bold mb-3">
                จากการ <span className="text-green-600">"เฉลี่ยต้นทุน"</span>
              </h4>
              <p className="text-base leading-relaxed font-medium">
                เมื่อเราซื้ออย่างสม่ำเสมอ เราจะได้ซื้อหุ้นหรือกองทุนในราคา<br/>
                ทั้งถอนที่ถูก ทั้งตอนที่แพง เมื่อรวมกันแล้วจะทำให้ได้<br/>
                "ราคาเฉลี่ย" ที่ดีกว่าการซื้อก้อนใหญ่เฉียวตอนที่ราคาสูง
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* กล่อง 2 */}
      <div className="w-full mb-12 flex justify-center relative z-10">
        <div 
          className="w-[700px] relative rounded-3xl p-8 shadow-2xl  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Group 379.png')" ,
          backgroundSize: "100% 100%"
           }}
        >
      
          <div className="flex items-start gap-4 relative z-10 max-w-5xl justify-end">
            <div className="text-black">
              <div className="text-right">
                <h3 className="text-3xl font-bold ">
                  ไม่ต้องกังวลเรื่อง
                </h3>
                <h4 className="text-3xl font-bold mb-3">
                  <span className="text-green-600">"การจับจังหวะตลาด"</span>
                </h4>
                <p className="text-base leading-relaxed font-medium">
                  คนส่วนใหญ่ก็จะพยายามซื้อหุ้นตอนที่ราคาถูกและขายตอนที่<br/>
                  ราคาแพงที่สุด ซึ่งยากมากที่จะทำได้ถูกต้องตลอดเวลา DCA<br/>
                  ช่วยตัดความกังวลดังกล่าวนี้ออกไป เพราะเราซื้อไปเรื่อยๆ<br/>
                  ไม่ว่าจะราคาขึ้นหรือลง ทำให้ไม่ต้องนั่งคิดมากว่าวันนี้ควรซื้อมั้ย
                </p>
              </div>
            </div>
            <div className=" text-[#38CF53] w-12 h-12 pr-2 pt-2 flex items-center justify-center text-7xl font-bold shrink-0 ">
              2.
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* Warren Buffet Section */}
        <div 
          className="min-h-screen min-w-screen  text-white p-6  items-center relative overflow-hidden bg-cover bg-center font-prompt"
          style={{
           backgroundImage: "url('/bg-Mask.png')", 
          }}
         >
        <div className="absolute inset-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 ">
        {/* Header */}
           <div className="flex flex-col text-center mb-24 mt-24">
 <div className="mb-4 mr-12 pr-12">
   <span className="text-purple-500 text-7xl font-bold inline pr-4 mr-8" 
     style={{
       textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.3)'
     }}
   >
     Warren Buffet
   </span>{" "}
   <span className="text-black text-7xl font-bold inline pr-5 mr-5" 
     style={{
       textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.3)'
     }}
   >
     เชื่อว่า
   </span>
 </div>
 
 <h2 className="text-6xl font-bold text-black mb-4 pl-20 ml-20" 
   style={{
     textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.3)'
   }}
 >
   การลงทุนระยะยาว
 </h2>
 
 <h3 className="text-7xl font-bold text-green-500 pl-20 ml-20" 
   style={{
     textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.3)'
   }}
 >
   อย่างไรก็กำไร!
 </h3>
</div>
          <div className="grid grid-cols-2 gap-8 m-15">
          {/* ข้อความ 1  */}
            <div className="overflow-hidden m-12 ">
              <div className="p-6 text-black">
                <h3 className="text-2xl font-bold text-center">
                  เมื่อเราซื้อหุ้น เราซื้อ "ส่วนหนึ่งของธุรกิจ"<br />
                  ไม่ใช่แค่ตัวเลขที่วิ่งขึ้นลงในตลาด
                </h3>
              </div>
              <div className="h-48 p-6 flex items-center justify-center">
                <p className="text-black text-xl leading-relaxed text-center">
                เขาจึงเน้นลงทุนในบริษัทที่มีพื้นฐานแข็งแกร่ง <br /> 
                 มีการบริหารจัดการที่ดีมีความได้เปรียบทางการ <br />
                แข่งขันที่ยั่งยืน และเข้าใจจุดแข็งของธุรกิจนั้นๆ <br /> 
                อย่างถ่องแท้
                </p>
              </div>
            </div>

          {/* ข้อความ 2  */}
            <div className="overflow-hidden m-12">
              <div className="p-6 text-black">
                <h3 className="text-2xl font-bold text-center">
                ตลาดหุ้นผันผวนจากข่าวและอารมณ์ <br /> ทำให้ราคาหุ้นอาจไม่ตรงกับ “มูลค่าจริง”
                </h3>
              </div>
              <div className="h-48 p-6 flex items-center justify-center">
                <p className="text-black text-xl leading-relaxed text-center">
                เขาจึงไม่สนการเก็งกำไรในระยะสั้น <br /> แต่เน้นการถือหุ้นให้ได้นานที่สุดเพื่อรอให้ตลาด <br />
                ปรับตัวและแสดง มูลค่าที่แท้จริง ของบริษัท

                </p>
              </div>
            </div>

          {/* ข้อความ 3 */}
            <div className="overflow-hidden m-12 ">
              <div className="p-6 text-black">
                <h3 className="text-2xl font-bold text-center">
                พลังของดอกเบี้ยทบต้นทำให้การลงทุน <br />
                ระยะยาวได้กำไรมหาศาล
                </h3>
              </div>
              <div className="h-48 p-6 flex items-center justify-center">
                <p className="text-black text-xl leading-relaxed text-center">
                การถือหุ้นดีๆ ไว้นานๆ จะทำให้ผลตอบแทน <br /> 
                ทบต้น ไปเรื่อยๆ เหมือนต้นไม้ที่โตขึ้น <br /> 
                 ผลกำไรเก่าจะกลายเป็นเงินลงทุนใหม่ <br /> 
                ทำให้เงินงอกเงยแบบทวีคูณเมื่อเวลาผ่านไป

                </p>
              </div>
            </div>

          {/* ข้อความ 4 */}
            <div className="overflow-hidden m-12">
              <div className=" p-6 text-black">
                <h3 className="text-2xl font-bold text-center">
                    ตลาดหุ้นคืออุปกรณ์ที่ส่งต่อเงินจากคน <br />
                    ไม่อดทนไปสู่คนอดทน
                </h3>
              </div>
              <div className="h-48  p-6 flex items-center justify-center">
                  <p className="text-black text-xl leading-relaxed text-center">
                    การลงทุนระยะยาวต้องการความอดทนอย่างสูง <br /> 
                    ไม่หวั่นไหวไปกับความกลัวหรือความโลภในระยะ <br />
                    สั้น และมีวินัยในการยึดมั่นในหลักการที่วางไว้
                  </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mb-10 mt-12">
            <div className="text-center relative z-20">
              <p className="text-black text-xl leading-relaxed mb-12  max-w-5xl font-normal ">
              ในเว็บไซต์นี้จะเป็นเครื่องมือช่วยคุณมองหาการลงทุน DCA ที่เหมาะกับความเสี่ยงที่คุณรับได้ <br />
               และพาคุณไปสำรวจหุ้นที่พื้นฐานบริษัทแข็งแรงตามแนวคิดของการเลือกหุ้นของ Warren Buffet <br />
                ทั้งบริษัทในไทย และอเมริกา
              </p>
              
              <Link
                to="/Riskassessment1"
                className={`bg-green-500  text-white px-8 py-4 rounded-full text-4xl font-bold shadow-3xl hover:bg-green-600 transition-colors ${
                location.pathname === "/Riskassessment1" ? "bg-green-600 " : ""
                }`}style={{
                textShadow: '4px 4px  8px rgba(0,0,0,0.3) , 2px 2px 4px rgba(0,0,0,0.3)'
                }}
                >
               เริ่มทำแบบประเมินได้เลย!
              </Link>
              
            </div>
          </div>
        </div>
        </div>
      </div>
      

  );
}
