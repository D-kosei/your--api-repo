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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
