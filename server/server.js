const express = require('express');
const cors = require('cors');
const axios = require('axios'); // ใช้ axios เพื่อความสะดวกในการเรียก HTTP requests

const app = express();
const port = 8000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxanfvB4RGq3N2wVZkRwSB00aIrLeMtwNGAFpE6RoBqmdbtGZhguowuBUQpKf-VpnY7/exec';

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

app.get('/api/assessment/history', async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);

    console.log('History data fetched from Google Script.');
    res.status(200).json(response.data);

  } catch (error) {
    console.error('Error fetching history from Google Sheets:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch history.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});