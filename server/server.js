const express = require('express');
const cors = require('cors');
const axios = require('axios'); // ใช้ axios เพื่อความสะดวกในการเรียก HTTP requests

const app = express();
const port = 8000;

// URL ของ Google Apps Script ที่เราจะซ่อนไว้ที่นี่
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxanfvB4RGq3N2wVZkRwSB00aIrLeMtwNGAFpE6RoBqmdbtGZhguowuBUQpKf-VpnY7/exec';

// --- Middleware ---
// 1. เปิดใช้งาน CORS เพื่อให้ React App (ที่อยู่คนละ port) เรียกใช้งาน API นี้ได้
app.use(cors());
// 2. ทำให้ Express สามารถอ่านข้อมูล JSON จาก request body ได้
app.use(express.json());


// --- API Endpoints ---

// Endpoint สำหรับ "รับ" ผลการประเมินจาก React แล้ว "ส่งต่อ" ไปยัง Google Sheets
app.post('/api/assessment', async (req, res) => {
  try {
    // req.body คือข้อมูลที่ React ส่งมา
    console.log('Receiving data from client:', req.body);

    // ส่ง request ต่อไปยัง Google Apps Script ด้วยข้อมูลที่ได้รับมา
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Response from Google Script:', response.data);

    // ส่งสถานะสำเร็จกลับไปให้ React
    res.status(200).json({ success: true, message: 'Data sent to Google Sheets successfully.' });

  } catch (error) {
    console.error('Error forwarding data to Google Sheets:', error);
    // ส่งสถานะล้มเหลวกลับไปให้ React
    res.status(500).json({ success: false, message: 'Failed to send data.' });
  }
});

// Endpoint สำหรับ "ดึง" ข้อมูลประวัติจาก Google Sheets แล้ว "ส่งกลับ" ไปให้ React
app.get('/api/assessment/history', async (req, res) => {
  try {
    // ส่ง GET request ไปยัง Google Apps Script เพื่อขอข้อมูล
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    
    console.log('History data fetched from Google Script.');

    // ส่งข้อมูลที่ได้รับ (ซึ่งเป็น JSON array) กลับไปให้ React
    res.status(200).json(response.data);

  } catch (error) {
    console.error('Error fetching history from Google Sheets:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch history.' });
  }
});


// --- ส่วนของ API เดิม (เผื่อยังใช้งาน) ---
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});