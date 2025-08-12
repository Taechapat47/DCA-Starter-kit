import React, { useEffect, useRef, useState } from "react";
import { Star, Calendar, ChevronDown } from "lucide-react";

const StockCard = ({ rank, stockData, bgColor }) => {
  const chartContainerRef = useRef();
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    let chart = null;

    const initChart = async () => {
      try {
        console.log("Initializing chart for:", stockData.name);

        // ตรวจสอบ container
        if (!chartContainerRef.current) {
          console.log("Container not ready");
          return;
        }

        const containerWidth = chartContainerRef.current.clientWidth;
        console.log("Container width:", containerWidth);

        if (containerWidth === 0) {
          // ลอง delay และลองใหม่
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

        // Generate realistic data ตามราคาจริงของหุ้นแต่ละตัว
        const currentPrice = parseFloat(stockData.price);

        // สร้างข้อมูลกราฟที่สมจริงตามราคาและความผันผวนของหุ้นแต่ละตัว
        const data = Array.from({ length: 30 }, (_, i) => {
          const date = new Date("2025-08-01");
          date.setDate(date.getDate() - (29 - i));

          const progress = i / 29; // 0 to 1

          // คำนวณ volatility ตาม sector และราคา
          let volatilityMultiplier = 0.02; // default 2%
          if (stockData.sector === "เทคโนโลยี") volatilityMultiplier = 0.035; // Tech ผันผวนมากกว่า
          if (stockData.sector === "บริการ") volatilityMultiplier = 0.015; // Healthcare เสถียรกว่า
          if (stockData.sector === "ธุรกิจการเงิน")
            volatilityMultiplier = 0.025;
          if (stockData.code === "TSLA") volatilityMultiplier = 0.05; // Tesla ผันผวนมากที่สุด
          if (stockData.code === "NVDA") volatilityMultiplier = 0.04; // NVIDIA ผันผวนสูง

          // สร้าง trend ตาม performance ของหุ้น
          let trendMultiplier = 0.85; // เริ่มที่ 85% ของราคาปัจจุบัน
          const changeValue = parseFloat(
            stockData.priceChange.replace(/[+$-]/g, "")
          );
          const changePercent = (changeValue / currentPrice) * 100;

          // ปรับ trend ตาม performance
          if (changePercent > 2) trendMultiplier = 0.82; // หุ้นที่ขึ้นมาก เริ่มต่ำกว่า
          if (changePercent < 0) trendMultiplier = 0.88; // หุ้นที่ลง เริ่มสูงกว่า

          const startPrice = currentPrice * trendMultiplier;
          const trend = (currentPrice - startPrice) * progress;

          // เพิ่ม pattern ตาม market behavior
          const marketCycle = Math.sin(i * 0.3) * (currentPrice * 0.015); // market cycle
          const volatility =
            (Math.random() - 0.5) * (currentPrice * volatilityMultiplier);
          const momentum =
            Math.sin(i * 0.5 + progress * 2) * (currentPrice * 0.01); // momentum

          let value = startPrice + trend + marketCycle + volatility + momentum;

          // ให้จุดสุดท้าย (1 ส.ค. 2025) เป็นราคาจริงพอดี
          if (i === 29) {
            value = currentPrice;
          }

          // จำกัดไม่ให้ราคาผิดปกติ
          const minPrice = currentPrice * 0.75;
          const maxPrice = currentPrice * 1.15;
          value = Math.max(minPrice, Math.min(maxPrice, value));

          return {
            time: date.toISOString().split("T")[0],
            value: value,
          };
        });

        console.log("Generated data points:", data.length);
        console.log(
          "Price range:",
          Math.min(...data.map((d) => d.value)),
          "to",
          Math.max(...data.map((d) => d.value))
        );

        // สร้าง color ตาม performance ของหุ้น
        const changeValue = parseFloat(
          stockData.priceChange.replace(/[+$-]/g, "")
        );
        const isPositive = stockData.priceChange.includes("+");
        const performanceStrength = Math.abs(changeValue / currentPrice) * 100; // % change

        // เลือกสีตาม performance
        let topColor, bottomColor, lineColor;
        if (isPositive) {
          if (performanceStrength > 3) {
            // Performance สูง - เขียวเข้ม
            topColor = "rgba(34, 197, 94, 0.6)";
            bottomColor = "rgba(34, 197, 94, 0.15)";
            lineColor = "#16a34a";
          } else {
            // Performance ปานกลาง - เขียวอ่อน
            topColor = "rgba(34, 197, 94, 0.4)";
            bottomColor = "rgba(34, 197, 94, 0.1)";
            lineColor = "#22c55e";
          }
        } else {
          // Performance ติดลบ - แดง
          topColor = "rgba(239, 68, 68, 0.4)";
          bottomColor = "rgba(239, 68, 68, 0.1)";
          lineColor = "#ef4444";
        }

        // Add area series (กราฟหลัก) พร้อมสีตาม performance
        const areaSeries = chart.addAreaSeries({
          topColor: topColor,
          bottomColor: bottomColor,
          lineColor: lineColor,
          lineWidth: 2,
          priceLineVisible: false,
          lastValueVisible: false,
        });

        areaSeries.setData(data);

        // บังคับให้กราฟเต็มพื้นที่
        chart.timeScale().fitContent();
        chart.priceScale("right").applyOptions({
          autoScale: true,
        });

        console.log("Chart data set successfully");
        setChartLoaded(true);

        // Resize handler
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

        // Enhanced Fallback: CSS chart ที่สมจริงตามข้อมูลหุ้น
        if (chartContainerRef.current) {
          const currentPrice = parseFloat(stockData.price);
          const changeValue = parseFloat(
            stockData.priceChange.replace(/[+$-]/g, "")
          );
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

                // สร้างความสูงที่สอดคล้องกับราคา
                let baseHeight;
                if (isPositive) {
                  baseHeight = 25 + progress * 40; // เริ่มต่ำแล้วขึ้น
                } else {
                  baseHeight = 50 - progress * 15; // เริ่มสูงแล้วลง
                }

                // เพิ่ม volatility ตาม sector
                let volatility = 5;
                if (stockData.sector === "เทคโนโลยี") volatility = 8;
                if (stockData.code === "TSLA") volatility = 12;

                const noise = (Math.random() - 0.5) * volatility;
                const finalHeight = Math.max(
                  8,
                  Math.min(70, baseHeight + noise)
                );

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

    // เริ่ม init หลังจาก component mount
    const timer = setTimeout(initChart, 100);

    return () => {
      clearTimeout(timer);
      if (chart) {
        chart.remove();
      }
    };
  }, [stockData.price, stockData.name]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-shadow relative overflow-hidden">
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
            ${stockData.Currency}
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
    </div>
  );
};

export const BottomSection = () => {
  const [selectedIndex, setSelectedIndex] = useState("ทั้งหมด");
  const [selectedStockType, setSelectedStockType] = useState("ทั้งหมด");
  const [selectedSector, setSelectedSector] = useState("ทั้งหมด");

  const stockData = [
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
      stockType: "หุ้นคุ้มค่า",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Alphabet Inc. Class A",
      code: "GOOGL",
      price: "174.29",
      priceChange: "+$1.92",
      marketCap: "$2.31T",
      sector: "บริการ",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Amazon.com Inc.",
      code: "AMZN",
      price: "168.74",
      priceChange: "-$4.13",
      marketCap: "$2.01T",
      sector: "สินค้าอุปโภคบริโภค",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Meta Platforms Inc.",
      code: "META",
      price: "728.65",
      priceChange: "+$18.29",
      marketCap: "$1.87T",
      sector: "บริการ",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Taiwan Semiconductor",
      code: "TSM",
      price: "157.92",
      priceChange: "-$1.25",
      marketCap: "$1.09T",
      sector: "เทคโนโลยี",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Broadcom Inc.",
      code: "AVGO",
      price: "1,412.45",
      priceChange: "+$23.67",
      marketCap: "$1.05T",
      sector: "เทคโนโลยี",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Tesla Inc.",
      code: "TSLA",
      price: "294.18",
      priceChange: "-$8.45",
      marketCap: "$978.6B",
      sector: "สินค้าอุตสาหกรรม",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Berkshire Hathaway Inc. Class B",
      code: "BRK.B",
      price: "441.23",
      priceChange: "+$6.78",
      marketCap: "$992.1B",
      sector: "ธุรกิจการเงิน",
      stockType: "หุ้นคุ้มค่า",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Eli Lilly and Company",
      code: "LLY",
      price: "789.34",
      priceChange: "-$12.45",
      marketCap: "$743.2B",
      sector: "บริการ",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "JPMorgan Chase & Co.",
      code: "JPM",
      price: "204.78",
      priceChange: "+$2.94",
      marketCap: "$594.8B",
      sector: "ธุรกิจการเงิน",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Visa Inc. Class A",
      code: "V",
      price: "276.43",
      priceChange: "+$3.67",
      marketCap: "$581.2B",
      sector: "ธุรกิจการเงิน",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "UnitedHealth Group Inc.",
      code: "UNH",
      price: "572.84",
      priceChange: "-$6.78",
      marketCap: "$533.4B",
      sector: "บริการ",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Mastercard Inc. Class A",
      code: "MA",
      price: "478.92",
      priceChange: "+$7.23",
      marketCap: "$451.3B",
      sector: "ธุรกิจการเงิน",
      stockType: "หุ้นเติบโต",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Walmart Inc.",
      code: "WMT",
      price: "77.25",
      priceChange: "-$1.48",
      marketCap: "$639.7B",
      sector: "สินค้าอุปโภคบริโภค",
      stockType: "หุ้นคุ้มค่า",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "The Home Depot Inc.",
      code: "HD",
      price: "384.67",
      priceChange: "+$5.92",
      marketCap: "$386.1B",
      sector: "สินค้าอุปโภคบริโภค",
      stockType: "หุ้นคุ้มค่า",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Procter & Gamble Co.",
      code: "PG",
      price: "164.78",
      priceChange: "-$2.13",
      marketCap: "$392.4B",
      sector: "สินค้าอุปโภคบริโภค",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "Johnson & Johnson",
      code: "JNJ",
      price: "153.42",
      priceChange: "+$1.89",
      marketCap: "$370.8B",
      sector: "บริการ",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "AbbVie Inc.",
      code: "ABBV",
      price: "182.67",
      priceChange: "-$3.78",
      marketCap: "$322.9B",
      sector: "บริการ",
      stockType: "หุ้นปันผล",
      index: "S&P500",
      Currency: "USD",
    },
    {
      name: "PTT Public Company Limited",
      code: "PTT",
      price: "38.75",
      priceChange: "+$0.50",
      marketCap: "$312.4B",
      sector: "ทรัพยากร",
      stockType: "หุ้นปันผล",
      index: "SET100",
      Currency: "THB",
    },
    {
      name: "CP All Public Company Limited",
      code: "CPALL",
      price: "65.25",
      priceChange: "+$1.25",
      marketCap: "$285.7B",
      sector: "สินค้าอุปโภคบริโภค",
      stockType: "หุ้นคุ้มค่า",
      index: "SET100",
      Currency: "THB",
    },
    {
      name: "Bangkok Bank Public Company Limited",
      code: "BBL",
      price: "142.50",
      priceChange: "-$2.75",
      marketCap: "$267.8B",
      sector: "ธุรกิจการเงิน",
      stockType: "หุ้นปันผล",
      index: "SET100",
      Currency: "THB",
    },
    {
      name: "Advanced Info Service Public Company Limited",
      code: "ADVANC",
      price: "185.00",
      priceChange: "+$3.50",
      marketCap: "$234.9B",
      sector: "บริการ",
      stockType: "หุ้นปันผล",
      index: "SET100",
      Currency: "THB",
    },
    {
      name: "Charoen Pokphand Foods Public Company Limited",
      code: "CPF",
      price: "24.75",
      priceChange: "-$0.75",
      marketCap: "$198.3B",
      sector: "เกษตรและอุตสาหกรรมอาหาร",
      stockType: "หุ้นคุ้มค่า",
      index: "SET100",
      Currency: "THB",
    },
  ];

  // Filter stocks based on selected options
  const filteredStocks = stockData.filter((stock) => {
    const indexMatch =
      selectedIndex === "ทั้งหมด" || stock.index === selectedIndex;

    const stockTypeMatch =
      selectedStockType === "ทั้งหมด" || stock.stockType === selectedStockType;

    const sectorMatch =
      selectedSector === "ทั้งหมด" || stock.sector === selectedSector;

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
              {filteredStocks.length} stocks {" "}
              <span className="text-sm font-normal text-gray-500">
                Guide line by DCA Starter Kit. 
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>Data as of August 1, 2025</span>
          </div>
        </div>
      </div>

      {/* Stock Cards Grid */}
      {filteredStocks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock, index) => (
            <StockCard
              key={stock.code}
              rank={index + 1}
              stockData={stock}
              bgColor="bg-teal-400"
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
