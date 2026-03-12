import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const name = fields.name?.[0];
    const audioFile = files.audio?.[0];

    if (!name || !audioFile) {
      return res.status(400).json({ error: 'name and audio file required' });
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', 'Cloned via CloudLabs TTS');
    formData.append('files', fs.createReadStream(audioFile.filepath), {
      filename: audioFile.originalFilename || 'audio.mp3',
      contentType: audioFile.mimetype || 'audio/mpeg'
    });

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.detail?.message || 'Clone failed' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
