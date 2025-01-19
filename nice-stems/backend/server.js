import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { exec } from 'child_process';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/download', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  const command = `yt-dlp -x --audio-format mp3 -o temp.mp3 "${url}" && demucs temp.mp3`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Failed to process URL' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    console.log(`Stdout: ${stdout}`);
    res.status(200).json({ message: 'Download started', output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


