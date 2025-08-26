// StockDetailPage.jsx - แก้ไขแล้ว
import React, { useEffect, useRef, useState } from "react";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Calendar,
  Building,
  Heart,
  Share2,
  ShoppingCart,
  RefreshCw,
  Info
} from "lucide-react";

const StockDetailPage = ({ stockData, onBack }) => { // แก้ไข syntax error
  const chartContainerRef = useRef();
  const [chartLoaded, setChartLoaded] = useState(false);
  const [timeRange, setTimeRange] = useState('1M');
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Chart initialization
  useEffect(() => {
    let chart = null;

    const initChart = async () => {
      try {
        if (!chartContainerRef.current || !stockData) return;

        const containerWidth = chartContainerRef.current.clientWidth;
        if (containerWidth === 0) {
          setTimeout(initChart, 500);
          return;
        }

        const { createChart } = await import("lightweight-charts");

        chart = createChart(chartContainerRef.current, {
          width: containerWidth,
          height: 400,
          layout: {
            background: { type: "solid", color: "transparent" },
            textColor: "#374151",
          },
          grid: {
            vertLines: { color: "#f3f4f6" },
            horzLines: { color: "#f3f4f6" },
          },
          crosshair: { mode: 1 },
          timeScale: {
            borderColor: "#d1d5db",
            timeVisible: true,
            secondsVisible: false,
          },
          rightPriceScale: { borderColor: "#d1d5db" },
        });

        // สร้างข้อมูลกราฟแบบ dynamic
        const currentPrice = parseFloat(stockData.price);
        const getDaysFromRange = (range) => {
          switch(range) {
            case '1D': return 1;
            case '1W': return 7;
            case '1M': return 30;
            case '3M': return 90;
            case '1Y': return 365;
            default: return 30;
          }
        };

        const days = getDaysFromRange(timeRange);
        const data = Array.from({ length: days }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (days - 1 - i));

          // สร้างราคาแบบสุ่มตาม pattern
          const progress = i / (days - 1);
          let volatilityMultiplier = 0.02;
          
          if (stockData.sector === "เทคโนโลยี") volatilityMultiplier = 0.035;
          if (stockData.code === "NVDA") volatilityMultiplier = 0.04;

          const changeValue = parseFloat(stockData.priceChange.replace(/[+$-]/g, ""));
          let trendMultiplier = 0.85;
          if (stockData.priceChange.includes("+")) trendMultiplier = 0.82;

          const startPrice = currentPrice * trendMultiplier;
          const trend = (currentPrice - startPrice) * progress;
          const volatility = (Math.random() - 0.5) * (currentPrice * volatilityMultiplier);

          let value = startPrice + trend + volatility;
          if (i === days - 1) value = currentPrice;

          return {
            time: date.toISOString().split("T")[0],
            value: Math.max(currentPrice * 0.75, Math.min(currentPrice * 1.25, value)),
          };
        });

        const isPositive = stockData.priceChange.includes("+");
        const areaSeries = chart.addAreaSeries({
          topColor: isPositive ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)",
          bottomColor: isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
          lineColor: isPositive ? "#22c55e" : "#ef4444",
          lineWidth: 3,
        });

        areaSeries.setData(data);
        chart.timeScale().fitContent();
        setChartLoaded(true);

        const handleResize = () => {
          if (chart && chartContainerRef.current) {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
          }
        };

        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          if (chart) chart.remove();
        };

      } catch (error) {
        console.error("Chart error:", error);
        setChartLoaded(false);
      }
    };

    const timer = setTimeout(initChart, 100);
    return () => {
      clearTimeout(timer);
      if (chart) chart.remove();
    };
  }, [stockData, timeRange]);

  if (!stockData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">ไม่พบข้อมูลหุ้น</div>
      </div>
    );
  }

  const changeValue = parseFloat(stockData.priceChange.replace(/[+$-]/g, ""));
  const isPositive = stockData.priceChange.includes("+");
  const changePercent = ((changeValue / parseFloat(stockData.price)) * 100).toFixed(2);

  // สร้างข้อมูล mock สำหรับ ratio analysis
  const ratioData = {
    pe: Math.floor(Math.random() * 30) + 10, // P/E ratio 10-40
    pb: (Math.random() * 3 + 0.5).toFixed(2), // P/B ratio 0.5-3.5
    dividendYield: (Math.random() * 5 + 1).toFixed(2), // Dividend Yield 1-6%
    netProfitMargin: (Math.random() * 25 + 5).toFixed(2), // Net Profit Margin 5-30%
    roe: (Math.random() * 20 + 5).toFixed(2) // ROE 5-25%
  };

  return (
    <div className="min-h-screen bg-gray-50 font-prompt">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
                <span>กลับ</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600 text-sm">
                    {stockData.code.substring(0, 4)}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{stockData.name}</h1>
                  <p className="text-gray-500">{stockData.code}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={`p-2 rounded-lg transition-colors ${
                  isWatchlisted 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} className={isWatchlisted ? 'fill-current' : ''} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              {/* ส่วนหัว - ภาพรวมหลักทรัพย์ */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">ภาพรวมหลักทรัพย์</h2>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">หุ้น</span>
                </div>
                
                {/* Price และ Change */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">ราคาปิดปัจจุบัน</div>
                    <div className="text-2xl font-bold text-gray-800">฿{stockData.price}</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">ราคาเปลี่ยนแปลง(บาท)</div>
                    <div className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stockData.priceChange.replace('$', '฿')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex gap-2 mb-6">
                {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Chart with Y button */}
              <div className="relative h-96 bg-gray-50 rounded-xl overflow-hidden">
                <div ref={chartContainerRef} className="w-full h-full absolute inset-0 rounded-xl" />
                {!chartLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gray-400">
                      <RefreshCw className="animate-spin" size={20} />
                      <span>กำลังโหลดกราฟ...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Ratio Analysis */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">ข้อมูลของบริษัท</h3>
              </div>

              {/* Ratio Analysis Items */}
              <div className="space-y-4">
                {/* P/E Ratio */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">P/E</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-red-200 rounded relative">
                        <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-400 transform translate-y-2"></div>
                      </div>
                      <span className="ml-2 text-red-500 text-sm font-medium">{ratioData.pe}</span>
                    </div>
                  </div>
                </div>

                {/* P/BV Ratio */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">P/BV</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-red-200 rounded relative">
                      <div className="absolute right-2 top-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-400 transform translate-y-2"></div>
                    </div>
                    <span className="ml-2 text-red-500 text-sm font-medium">{ratioData.pb}</span>
                  </div>
                </div>

                {/* Dividend Yield */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Dividend Yield</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded relative">
                      <div className="absolute right-2 top-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-600 transform translate-y-2"></div>
                    </div>
                    <span className="ml-2 text-gray-600 text-sm font-medium">{ratioData.dividendYield}</span>
                  </div>
                </div>

                {/* Net Profit Margin */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Net Profit Margin</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-green-200 rounded relative">
                      <div className="absolute right-4 top-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-green-600 transform translate-y-2"></div>
                    </div>
                    <span className="ml-2 text-green-600 text-sm font-medium">{ratioData.netProfitMargin}</span>
                  </div>
                </div>

                {/* ROE */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">ROE</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-green-200 rounded relative">
                      <div className="absolute right-3 top-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-green-600 transform translate-y-2"></div>
                    </div>
                    <span className="ml-2 text-green-600 text-sm font-medium">{ratioData.roe}</span>
                  </div>
                </div>
              </div>
            </div>         
            {/* Basic Stock Info */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building size={20} />
                ข้อมูลพื้นฐาน
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">อุตสาหกรรม</span>
                  <span className="font-semibold">{stockData.sector}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">ประเภทหุ้น</span>
                  <span className="font-semibold">{stockData.stockType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">ดัชนี</span>
                  <span className="font-semibold">{stockData.index}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">มูลค่าตลาด</span>
                  <span className="font-semibold text-blue-600">{stockData.marketCap}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;