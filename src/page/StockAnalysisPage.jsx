import React, { useState } from 'react';
import { ChevronDown, Star, Calendar, TrendingUp } from 'lucide-react';

export default function StockAnalysisPage() {
  const [activeTab, setActiveTab] = useState('fundamental');
  
  const stockData = [
    { code: 'AAA', sector: 'เทคโนโลยี', growth: '+12.5%', price: '45.50', change: '+2.3%', risk: 'ต่ำ' },
    { code: 'BBB', sector: 'พลังงาน', growth: '+8.2%', price: '125.00', change: '+1.8%', risk: 'ปานกลาง' },
    { code: 'CCC', sector: 'การเงิน', growth: '+15.7%', price: '67.25', change: '+3.1%', risk: 'ต่ำ' },
    { code: 'DDD', sector: 'อุตสาหกรรม', growth: '+6.9%', price: '89.75', change: '+0.9%', risk: 'สูง' },
    { code: 'EEE', sector: 'สาธารณูปโภค', growth: '+4.2%', price: '32.10', change: '+1.2%', risk: 'ต่ำ' },
    { code: 'FFF', sector: 'วัสดุก่อสร้าง', growth: '+9.8%', price: '156.50', change: '+2.7%', risk: 'ปานกลาง' },
    { code: 'GGG', sector: 'อสังหาริมทรัพย์', growth: '+7.3%', price: '78.90', change: '+1.5%', risk: 'ปานกลาง' },
    { code: 'HHH', sector: 'สื่อสารโทรคมนาคม', growth: '+11.4%', price: '42.75', change: '+2.1%', risk: 'ต่ำ' },
    { code: 'III', sector: 'เกษตรและอาหาร', growth: '+5.6%', price: '98.25', change: '+0.8%', risk: 'ปานกลาง' },
    { code: 'JJJ', sector: 'ค้าปลีก', growth: '+13.2%', price: '234.50', change: '+4.2%', risk: 'สูง' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-400 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
              ระบบการลงทุน ด้วยเครื่องมือวิเคราะห์หุ้นพื้นฐาน
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              ค้นหุ้นพลาง สมเกณฑ์ในหลักเกณฑ์ "แลกหุ้นหุ้นพื้นฐานดี"
            </p>
          </div>
        </div>
      </div>
      {/* Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>หุ้น</option>
                <option>ทุกกลุ่ม</option>
                <option>เทคโนโลยี</option>
                <option>พลังงาน</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>ประเภทหุ้น</option>
                <option>หุ้นใหญ่</option>
                <option>หุ้นกลาง</option>
                <option>หุ้นเล็ก</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>อุตสาหกรรม</option>
                <option>ระยะสั้น</option>
                <option>ระยะกลาง</option>
                <option>ระยะยาว</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Fund Info Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">กองทุนพื้นฐานดี</h2>
          <p className="text-gray-600 text-sm mb-4">
            เหมาะสำหรับนักลงทุนที่ต้องการลงทุนแบบความเสี่ยงปานกลาง Value Investor โดยหลักเกณฑ์หุ้นที่มีฐานะทางการเงินมั่นคง
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              <span className="font-semibold">หมายเหตุ:</span> เชื่อมโยงกับความเป็นจริงของระยะเวลาโดยไม่มีอุปสรรคการถือนานนาน ตัดสิ้นจากการใช้มืองของการพิจารณาแล้ก
            </p>
          </div>
        </div>

        {/* Top 10 Section */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-current" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Top 10 <span className="text-sm font-normal text-gray-500">Guideline by DCA Starter Kit</span></h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>ข้อมูล ณ วันที่ 30 ก.ค. 2568</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab('fundamental')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'fundamental' 
                  ? 'bg-green-500 text-white border-b-2 border-green-500' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ภาพรวมหลักทรัพย์
            </button>
            <button 
              onClick={() => setActiveTab('growth')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'growth' 
                  ? 'bg-green-500 text-white border-b-2 border-green-500' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              
            </button>
          </div>

          {/* Table Header */}
          <div className="bg-green-50 px-6 py-3 border-b">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-2">รายชื่อหลักทรัพย์</div>
              <div className="col-span-2">สื่อหลักทรัพย์</div>
              <div className="col-span-2">การเติบโตยาก 4 ปีออกหลัง</div>
              <div className="col-span-2">ราคาต่อหุ้นสูงสุด</div>
              <div className="col-span-2">ราคาปั่นสินสุดปาว (1 สินเชิง)</div>
              <div className="col-span-2">ความเสี่ยง</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {stockData.map((stock, index) => (
              <div key={stock.code} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center text-sm">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                      {index + 1}
                    </div>
                    <span className="font-medium text-blue-600 cursor-pointer hover:underline">
                      {stock.code}
                    </span>
                  </div>
                  <div className="col-span-2 text-gray-600">{stock.sector}</div>
                  <div className="col-span-2">
                    <span className="text-green-600 font-medium">{stock.growth}</span>
                  </div>
                  <div className="col-span-2 font-medium">{stock.price}</div>
                  <div className="col-span-2">
                    <span className="text-green-600 font-medium">{stock.change}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stock.risk === 'ต่ำ' ? 'bg-green-100 text-green-800' :
                      stock.risk === 'ปานกลาง' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {stock.risk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}