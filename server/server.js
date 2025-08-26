const express = require('express');
const cors = require('cors');
const axios = require('axios'); // ใช้ axios เพื่อความสะดวกในการเรียก HTTP requests

const app = express();
const port = 8000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzf_IAfh-5HCstopt7J1MLD2YZL_V5BxmekjAR3dOn1SDh2ge6L6NPUIXAaRbDmoCtg/exec';
const STOCK_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqA9l0fJheF20DIgr-o5uE9kRG-wiKmd5LsH7AVSU18fe4X2_SxFktCexRFRVb9Tf1/exec';

app.use(cors());
app.use(express.json());

app.post('/api/assessment', async (req, res) => {
  try {
    console.log('Receiving data from client:', req.body);

    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Response from Google Script:', response.data);
    res.status(200).json({ success: true, message: 'Data sent to Google Sheets successfully.' });

  } catch (error) {
    console.error('Error forwarding data to Google Sheets:', error);
    res.status(500).json({ success: false, message: 'Failed to send data.' });
  }
});

app.get('/api/stocks/test', async (req, res) => {
  try {
    console.log('🧪 Testing connection to Stock Apps Script...');
    console.log('🔗 URL:', STOCK_GOOGLE_SCRIPT_URL);
    
    if (!STOCK_GOOGLE_SCRIPT_URL || STOCK_GOOGLE_SCRIPT_URL.includes('YOUR_NEW_APPS_SCRIPT_URL_HERE')) {
      return res.status(400).json({
        success: false,
        message: '❌ Stock Apps Script URL is not configured',
        instruction: 'Please update STOCK_GOOGLE_SCRIPT_URL with your deployed Apps Script URL'
      });
    }
    
    const testUrl = `${STOCK_GOOGLE_SCRIPT_URL}?action=test`;
    const response = await axios.get(testUrl, { timeout: 10000 });
    
    console.log('✅ Connection test successful');
    console.log('Response:', response.data);
    
    res.status(200).json({
      success: true,
      message: 'Connection to Stock Apps Script successful',
      appsScriptResponse: response.data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: error.message,
      url: STOCK_GOOGLE_SCRIPT_URL,
      suggestions: [
        'Check if the Stock Apps Script URL is correct',
        'Make sure the script is deployed as a web app',
        'Verify the script has proper permissions'
      ]
    });
  }
});

// ดึงข้อมูลหุ้น
app.get('/api/stocks', async (req, res) => {
  try {
    console.log('📊 Fetching stock data from Apps Script...');
    console.log('🔗 URL:', STOCK_GOOGLE_SCRIPT_URL);
    
    if (!STOCK_GOOGLE_SCRIPT_URL || STOCK_GOOGLE_SCRIPT_URL.includes('YOUR_NEW_APPS_SCRIPT_URL_HERE')) {
      return res.status(400).json({
        success: false,
        message: '❌ Stock Apps Script URL is not configured',
        instruction: 'Please update STOCK_GOOGLE_SCRIPT_URL with your deployed Apps Script URL'
      });
    }
    
    const response = await axios.get(STOCK_GOOGLE_SCRIPT_URL, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📦 Data type:', typeof response.data);
    
    let data;
    if (typeof response.data === 'string') {
      try {
        data = JSON.parse(response.data);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError.message);
        throw new Error('Invalid JSON response from Apps Script');
      }
    } else {
      data = response.data;
    }
    
    if (!data.success) {
      console.error('❌ Apps Script error:', data.error);
      throw new Error(data.error || 'Apps Script returned success: false');
    }
    
    if (!Array.isArray(data.data)) {
      console.error('❌ Invalid data structure');
      throw new Error('Apps Script did not return valid data array');
    }
    
    const stockData = data.data;
    console.log(`📈 Received ${stockData.length} stocks from Apps Script`);
    
    // ตรวจสอบโครงสร้างข้อมูล
    if (stockData.length > 0) {
      const sample = stockData[0];
      console.log('🔍 Sample stock:', {
        symbol: sample.symbol,
        name: sample.name,
        price: sample.price,
        hasFinancialData: !!sample.financialData,
        hasScores: !!sample.scores
      });
    }
    
    // กรองข้อมูลที่ไม่ครบ
    const validStocks = stockData.filter(stock => {
      const isValid = stock.symbol && 
                     stock.name && 
                     stock.rawData && 
                     stock.rawData.currentPrice > 0;
      
      if (!isValid) {
        console.log(`❌ Filtered out: ${stock.symbol || 'NO_SYMBOL'}`);
      }
      
      return isValid;
    });
    
    console.log(`✅ Valid stocks: ${validStocks.length}`);
    
    // แสดง Top 3 stocks
    if (validStocks.length > 0) {
      console.log('🏆 Top 3 stocks:');
      validStocks.slice(0, 3).forEach((stock, i) => {
        console.log(`${i + 1}. ${stock.symbol} - ${stock.name} - ${stock.marketCap}`);
      });
    }
    
    res.status(200).json({
      success: true,
      count: validStocks.length,
      lastUpdated: new Date().toISOString(),
      data: validStocks,
      debug: {
        rawCount: stockData.length,
        validCount: validStocks.length,
        appsScriptDebug: data.debug,
        url: STOCK_GOOGLE_SCRIPT_URL
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching stock data:', error.message);
    
    // Sample data สำหรับ fallback
    const sampleData = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        code: "AAPL",
        price: "219.16",
        priceChange: "+$2.48",
        marketCap: "$3.43T",
        sector: "เทคโนโลยี",
        stockType: "หุ้นคุณค่า",
        index: "S&P500",
        Currency: "USD",
        financialData: { peRatio: 28.11, dividendYield: 0.87 },
        scores: {},
        technical: {},
        rawData: { currentPrice: 219.16, marketCapRaw: 3430000000000 }
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation", 
        code: "MSFT",
        price: "496.78",
        priceChange: "+$3.94",
        marketCap: "$3.72T",
        sector: "เทคโนโลยี",
        stockType: "หุ้นปันผล",
        index: "S&P500",
        Currency: "USD",
        financialData: { peRatio: 32.45, dividendYield: 0.72 },
        scores: {},
        technical: {},
        rawData: { currentPrice: 496.78, marketCapRaw: 3720000000000 }
      }
    ];
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch from Apps Script, returning sample data',
      error: error.message,
      count: sampleData.length,
      data: sampleData,
      debug: {
        url: STOCK_GOOGLE_SCRIPT_URL,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Refresh stock data
app.post('/api/stocks/refresh', async (req, res) => {
  try {
    console.log('🔄 Refreshing stock data...');
    
    if (!STOCK_GOOGLE_SCRIPT_URL || STOCK_GOOGLE_SCRIPT_URL.includes('YOUR_NEW_APPS_SCRIPT_URL_HERE')) {
      return res.status(400).json({
        success: false,
        message: 'Stock Apps Script URL is not configured'
      });
    }
    
    const refreshUrl = `${STOCK_GOOGLE_SCRIPT_URL}?action=refresh`;
    const response = await axios.get(refreshUrl, { timeout: 15000 });
    
    console.log('✅ Refresh completed');
    
    res.status(200).json({
      success: true,
      message: 'Stock data refresh completed',
      appsScriptResponse: response.data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Refresh failed:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Refresh failed',
      error: error.message
    });
  }
});

// ==================== Server Start ====================
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log('');
  console.log('📋 Assessment API (เดิม):');
  console.log('   POST /api/assessment');
  console.log('   GET  /api/assessment/history');
  console.log('');
  console.log('📊 Stock API (ใหม่):');
  console.log('   GET  /api/stocks/test        - ทดสอบการเชื่อมต่อ');
  console.log('   GET  /api/stocks            - ดึงข้อมูลหุ้น');
  console.log('   POST /api/stocks/refresh    - รีเฟรชข้อมูล');
  console.log('');
  console.log('🔗 Stock Apps Script URL:', STOCK_GOOGLE_SCRIPT_URL);
  
  if (STOCK_GOOGLE_SCRIPT_URL.includes('YOUR_NEW_APPS_SCRIPT_URL_HERE')) {
    console.log('⚠️  Please update STOCK_GOOGLE_SCRIPT_URL with your deployed Apps Script URL');
  }
});
