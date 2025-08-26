import React, { useEffect, useRef, useState } from "react";
import { Star, Calendar, ChevronDown, RefreshCw, AlertCircle } from "lucide-react";

// Custom Hook สำหรับดึงข้อมูลหุ้น
const useStockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_BASE_URL = 'http://localhost:8000';

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching stock data from API...');
      
      const response = await fetch(`${API_BASE_URL}/api/stocks`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ Successfully fetched ${result.count} stocks`);
        setStockData(result.data);
        setLastUpdated(result.lastUpdated);
        setError(null);
      } else {
        throw new Error(result.message || 'Failed to fetch stock data');
      }
      
    } catch (err) {
      console.error('❌ Error fetching stock data:', err.message);
      setError(err.message);
      
      // ถ้า API ไม่ทำงาน ให้ใช้ sample data
      const sampleData = [
        {
          name: "NVIDIA Corporation",
          code: "NVDA",
          price: "171.83",
          priceChange: "+$4.27",
          marketCap: "$4.28T",
          sector: "เทคโนโลยี",
          stockType: "หุ้นเติบโต",
          index: "S&P500",
          Currency: "USD",
        },
        {
          name: "Microsoft Corporation",
          code: "MSFT",
          price: "496.78",
          priceChange: "+$3.94",
          marketCap: "$3.72T",
          sector: "เทคโนโลยี",
          stockType: "หุ้นปันผล",
          index: "S&P500",
          Currency: "USD",
        },
        {
          name: "Apple Inc.",
          code: "AAPL",
          price: "219.16",
          priceChange: "-$2.48",
          marketCap: "$3.43T",
          sector: "เทคโนโลยี",
          stockType: "หุ้นคุณค่า",
          index: "S&P500",
          Currency: "USD",
        }
      ];
      
      console.log('🔄 Using sample data as fallback');
      setStockData(sampleData);
      setLastUpdated(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      console.log('🔄 Manual refresh requested...');
      
      // เรียก refresh API
      const refreshResponse = await fetch(`${API_BASE_URL}/api/stocks/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (refreshResponse.ok) {
        console.log('✅ Refresh request sent');
        // รอสักครู่แล้วดึงข้อมูลใหม่
        setTimeout(() => {
          fetchStockData();
        }, 2000);
      }
      
    } catch (err) {
      console.error('❌ Error refreshing data:', err);
      // ถ้า refresh ไม่ได้ ก็ดึงข้อมูลใหม่เลย
      fetchStockData();
    }
  };

  // Auto-fetch เมื่อ component mount
  useEffect(() => {
    fetchStockData();
  }, []);

  // Auto-refresh ทุก 5 นาที
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh stock data...');
      fetchStockData();
    }, 5 * 60 * 1000); // 5 นาที

    return () => clearInterval(interval);
  }, []);

  return { 
    stockData, 
    loading, 
    error, 
    lastUpdated,
    refetch: fetchStockData,
    refresh: refreshData
  };
};

// แก้ไข StockCard - เพิ่ม onCardClick prop และลบ stockData ซ้ำ
const StockCard = ({ rank, stockData, bgColor, onCardClick }) => {
  const chartContainerRef = useRef();
  const [chartLoaded, setChartLoaded] = useState(false);

  // เพิ่มฟังก์ชันจัดการการคลิก
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(stockData); // ส่งข้อมูลหุ้นไปยัง parent component
    }
  };

  useEffect(() => {
    let chart = null;

    const initChart = async () => {
      try {
        console.log("Initializing chart for:", stockData.name);

        if (!chartContainerRef.current) {
          console.log("Container not ready");
          return;
        }

        const containerWidth = chartContainerRef.current.clientWidth;
        console.log("Container width:", containerWidth);

        if (containerWidth === 0) {
          setTimeout(initChart, 500);
          return;
        }

        const { createChart } = await import("lightweight-charts");

        chart = createChart(chartContainerRef.current, {
          width: containerWidth,
          height: 80,
          layout: {
            background: { type: "solid", color: "transparent" },
            textColor: "#333",
          },
          grid: {
            vertLines: { visible: false },
            horzLines: { visible: false },
          },
          crosshair: {
            vertLine: { visible: false },
            horzLine: { visible: false },
          },
          timeScale: {
            visible: false,
            borderVisible: false,
            rightOffset: 0,
            leftOffset: 0,
          },
          rightPriceScale: {
            visible: false,
            borderVisible: false,
            entireTextOnly: false,
          },
          leftPriceScale: {
            visible: false,
            borderVisible: false,
          },
          handleScroll: false,
          handleScale: false,
          watermark: {
            visible: false,
          },
        });

        console.log("Chart created successfully");

        const currentPrice = parseFloat(stockData.price);

        const data = Array.from({ length: 30 }, (_, i) => {
          const date = new Date("2025-08-01");
          date.setDate(date.getDate() - (29 - i));

          const progress = i / 29;

          let volatilityMultiplier = 0.02;
          if (stockData.sector === "เทคโนโลยี") volatilityMultiplier = 0.035;
          if (stockData.sector === "บริการ") volatilityMultiplier = 0.015;
          if (stockData.sector === "ธุรกิจการเงิน") volatilityMultiplier = 0.025;
          if (stockData.code === "TSLA") volatilityMultiplier = 0.05;
          if (stockData.code === "NVDA") volatilityMultiplier = 0.04;

          let trendMultiplier = 0.85;
          const changeValue = parseFloat(stockData.priceChange.replace(/[+$-]/g, ""));
          const changePercent = (changeValue / currentPrice) * 100;

          if (changePercent > 2) trendMultiplier = 0.82;
          if (changePercent < 0) trendMultiplier = 0.88;

          const startPrice = currentPrice * trendMultiplier;
          const trend = (currentPrice - startPrice) * progress;

          const marketCycle = Math.sin(i * 0.3) * (currentPrice * 0.015);
          const volatility = (Math.random() - 0.5) * (currentPrice * volatilityMultiplier);
          const momentum = Math.sin(i * 0.5 + progress * 2) * (currentPrice * 0.01);

          let value = startPrice + trend + marketCycle + volatility + momentum;

          if (i === 29) {
            value = currentPrice;
          }

          const minPrice = currentPrice * 0.75;
          const maxPrice = currentPrice * 1.15;
          value = Math.max(minPrice, Math.min(maxPrice, value));

          return {
            time: date.toISOString().split("T")[0],
            value: value,
          };
        });

        const changeValue = parseFloat(stockData.priceChange.replace(/[+$-]/g, ""));
        const isPositive = stockData.priceChange.includes("+");
        const performanceStrength = Math.abs(changeValue / currentPrice) * 100;

        let topColor, bottomColor, lineColor;
        if (isPositive) {
          if (performanceStrength > 3) {
            topColor = "rgba(34, 197, 94, 0.6)";
            bottomColor = "rgba(34, 197, 94, 0.15)";
            lineColor = "#16a34a";
          } else {
            topColor = "rgba(34, 197, 94, 0.4)";
            bottomColor = "rgba(34, 197, 94, 0.1)";
            lineColor = "#22c55e";
          }
        } else {
          topColor = "rgba(239, 68, 68, 0.4)";
          bottomColor = "rgba(239, 68, 68, 0.1)";
          lineColor = "#ef4444";
        }

        const areaSeries = chart.addAreaSeries({
          topColor: topColor,
          bottomColor: bottomColor,
          lineColor: lineColor,
          lineWidth: 2,
          priceLineVisible: false,
          lastValueVisible: false,
        });

        areaSeries.setData(data);

        chart.timeScale().fitContent();
        chart.priceScale("right").applyOptions({
          autoScale: true,
        });

        console.log("Chart data set successfully");
        setChartLoaded(true);

        const handleResize = () => {
          if (chart && chartContainerRef.current) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
            });
          }
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          if (chart) {
            chart.remove();
          }
        };
      } catch (error) {
        console.error("Chart initialization error:", error);
        setChartLoaded(false);

        if (chartContainerRef.current) {
          const currentPrice = parseFloat(stockData.price);
          const changeValue = parseFloat(stockData.priceChange.replace(/[+$-]/g, ""));
          const isPositive = stockData.priceChange.includes("+");

          const barColor = isPositive ? "#22c55e" : "#ef4444";
          const barColorLight = isPositive ? "#4ade80" : "#f87171";

          chartContainerRef.current.innerHTML = `
            <div style="
              width: 100%; 
              height: 100%; 
              background: transparent; 
              border-radius: 0.5rem; 
              display: flex; 
              align-items: flex-end; 
              padding: 0; 
              margin: 0;
              gap: 1px;
              position: relative;
              box-sizing: border-box;
              overflow: hidden;
            ">
              ${Array.from({ length: 30 }, (_, i) => {
                const progress = i / 29;

                let baseHeight;
                if (isPositive) {
                  baseHeight = 25 + progress * 40;
                } else {
                  baseHeight = 50 - progress * 15;
                }

                let volatility = 5;
                if (stockData.sector === "เทคโนโลยี") volatility = 8;
                if (stockData.code === "TSLA") volatility = 12;

                const noise = (Math.random() - 0.5) * volatility;
                const finalHeight = Math.max(8, Math.min(70, baseHeight + noise));

                return `<div style="
                  background: linear-gradient(to top, ${barColor}, ${barColorLight}); 
                  width: 3%; 
                  height: ${finalHeight}px; 
                  border-radius: 0;
                  opacity: 0.85;
                  flex: 1;
                  margin: 0;
                  padding: 0;
                "></div>`;
              }).join("")}
            </div>
          `;
          setChartLoaded(true);
        }
      }
    };

    const timer = setTimeout(initChart, 100);

    return () => {
      clearTimeout(timer);
      if (chart) {
        chart.remove();
      }
    };
  }, [stockData.price, stockData.name]);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleCardClick}
    >
      {/* Rank Badge */}
      <div className="absolute top-0 right-0">
        <div
          className={`${bgColor} text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl font-bold text-lg`}
        >
          {rank}
        </div>
      </div>

      {/* Sector Badge */}
      <div className="absolute top-2 left-2">
        <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
          {stockData.sector}
        </div>
      </div>

      {/* Company Info */}
      <div className="mb-4 pr-12 pt-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-[52px] h-[52px] bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">
              {stockData.code.substring(0, 8)}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base leading-tight">
              {stockData.name.length > 25
                ? stockData.name.substring(0, 25) + "..."
                : stockData.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {stockData.code}
            </p>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl font-bold text-gray-800">
            ${stockData.price}
          </span>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-medium">
            {stockData.Currency}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 block">มูลค่าตลาด</span>
            <span className="text-blue-600 font-semibold">
              {stockData.marketCap}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">ราคาเปลี่ยนแปลง</span>
            <span
              className={`font-semibold ${
                stockData.priceChange.includes("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stockData.priceChange}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-20 bg-gray-50 rounded-lg relative overflow-hidden">
        <div
          ref={chartContainerRef}
          className="w-full h-full absolute inset-0"
          style={{
            margin: 0,
            padding: 0,
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        />
        {!chartLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-gray-400">Loading chart...</div>
          </div>
        )}
      </div>

      {/* Hover Effect Indicator */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
        คลิกเพื่อดูรายละเอียด →
      </div>
    </div>
  );
};

// แก้ไข BottomSection - เพิ่ม onStockClick prop
export const BottomSection = ({ onStockClick }) => {
  const { stockData, loading, error, lastUpdated, refetch, refresh } = useStockData();
  
  const [selectedIndex, setSelectedIndex] = useState("ทั้งหมด");
  const [selectedStockType, setSelectedStockType] = useState("ทั้งหมด");
  const [selectedSector, setSelectedSector] = useState("ทั้งหมด");

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg mb-2">กำลังโหลดข้อมูลหุ้น...</div>
          <div className="text-gray-400 text-sm">ดึงข้อมูล</div>
        </div>
      </div>
    );
  }

  // Error state with retry option
  if (error && stockData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <div className="text-red-600 text-lg mb-2">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
          <div className="text-gray-500 text-sm mb-4">{error}</div>
          <button 
            onClick={refetch}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  // Filter stocks based on selected options
  const filteredStocks = stockData.filter((stock) => {
    const indexMatch = selectedIndex === "ทั้งหมด" || stock.index === selectedIndex;
    const stockTypeMatch = selectedStockType === "ทั้งหมด" || stock.stockType === selectedStockType;
    const sectorMatch = selectedSector === "ทั้งหมด" || stock.sector === selectedSector;

    return indexMatch && stockTypeMatch && sectorMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pb-6">
      {/* Filter Section - Centered */}
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="relative">
                <select
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="ทั้งหมด">หุ้น - ทั้งหมด</option>
                  <option value="S&P500">S&P500</option>
                  <option value="SET100">SET100</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>

              <div className="relative">
                <select
                  value={selectedStockType}
                  onChange={(e) => setSelectedStockType(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="ทั้งหมด">ประเภทหุ้น - ทั้งหมด</option>
                  <option value="หุ้นปันผล">หุ้นปันผล</option>
                  <option value="หุ้นคุ้มค่า">หุ้นคุ้มค่า</option>
                  <option value="หุ้นเติบโต">หุ้นเติบโต</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>

              <div className="relative">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="ทั้งหมด">อุตสาหกรรม - ทั้งหมด</option>
                  <option value="เกษตรและอุตสาหกรรมอาหาร">
                    เกษตรและอุตสาหกรรมอาหาร (AGRO)
                  </option>
                  <option value="สินค้าอุปโภคบริโภค">
                    สินค้าอุปโภคบริโภค (CONSUMP)
                  </option>
                  <option value="ธุรกิจการเงิน">ธุรกิจการเงิน (FINCIAL)</option>
                  <option value="สินค้าอุตสาหกรรม">
                    สินค้าอุตสาหกรรม (INDUS)
                  </option>
                  <option value="ทรัพยากร">ทรัพยากร (RESOURC)</option>
                  <option value="บริการ">บริการ (SERVICE)</option>
                  <option value="เทคโนโลยี">เทคโนโลยี (TECH)</option>
                  <option value="สาธารณูปโภค">สาธารณูปโภค (PROPCON)</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <h3 className="text-lg font-bold text-gray-800">
              {filteredStocks.length} stocks{" "}
              <span className="text-sm font-normal text-gray-500">
                จากทั้งหมด {stockData.length} หุ้น 
                {error && (
                  <span className="text-orange-500 ml-2">
                    (⚠️ ใช้ข้อมูลสำรอง)
                  </span>
                )}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={refresh}
              className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 transition-colors"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              รีเฟรช
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>
                อัปเดตล่าสุด: {lastUpdated ? new Date(lastUpdated).toLocaleString('th-TH') : 'ไม่ทราบ'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Cards Grid */}
      {filteredStocks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock, index) => (
            <StockCard
              key={`${stock.code}-${index}`}
              rank={index + 1}
              stockData={stock}
              bgColor="bg-teal-400"
              onCardClick={onStockClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">
            ไม่พบหุ้นที่ตรงกับเงื่อนไขที่เลือก
          </div>
          <div className="text-gray-500 text-sm">
            กรุณาเปลี่ยนตัวเลือกการกรองข้อมูล
          </div>
        </div>
      )}
    </div>
  );
};