import React, { useState } from "react"; 
import useNoScale from '../hooks/useNoScale'; 
import { TopSection } from '../component/TopSection'; 
import { BottomSection } from '../component/BottomSection'; 
import StockDetailPage from '../component/StockDetailPage';  

export default function StockAnalysisPage() {   
  useNoScale();    

  // State จัดการว่าตอนนี้แสดงหน้าไหน
  const [currentView, setCurrentView] = useState('list'); // 'list' = หน้ารายการ, 'detail' = หน้ารายละเอียด
  const [selectedStock, setSelectedStock] = useState(null); // เก็บข้อมูลหุ้นที่เลือก

  // ฟังก์ชันเมื่อมีการกดหุ้นในหน้ารายการ
  const handleStockClick = (stockData) => {
    console.log('กดหุ้น:', stockData.name);
    setSelectedStock(stockData); // เก็บข้อมูลหุ้นที่เลือก
    setCurrentView('detail'); // เปลี่ยนไปแสดงหน้ารายละเอียด
  };

  // ฟังก์ชันเมื่อกดปุ่มกลับจากหน้ารายละเอียด
  const handleBackToList = () => {
    console.log('กลับไปหน้ารายการ');
    setCurrentView('list'); // เปลี่ยนกลับไปแสดงหน้ารายการ
    setSelectedStock(null); // ลบข้อมูลหุ้นที่เลือก
  };

  return (     
    <div className="min-h-screen bg-gray-50 font-prompt">       
      {currentView === 'list' ? (
        // แสดงหน้ารายการหุ้น (เหมือนเดิม)
        <>
          <TopSection />       
          <BottomSection onStockClick={handleStockClick} />
        </>
      ) : (
        // แสดงหน้ารายละเอียดหุ้น (เต็มหน้าจอ)
        <>
        <TopSection />
        <StockDetailPage 
          stockData={selectedStock} 
          onBack={handleBackToList} 
        />
        </>
      )}
    </div>   
  ); 
}