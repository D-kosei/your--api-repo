const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/transcript', async (req, res) => {
  const { url } = req.body;
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const text = transcript.map(item => item.text).join(' ');
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: '取得できませんでした' });
  }
});

app.listen(3001, () => {
  console.log('API listening on 3001');
});

const path = require('path');
// 既存コードの上のほうで
app.use(express.static(path.join(__dirname, 'frontend/build')));

// APIより下に↓この記述を追加
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
