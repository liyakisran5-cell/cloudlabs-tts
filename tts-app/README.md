# CloudLabs Text to Speech

AI Voice Cloning app powered by ElevenLabs. Users ko koi API key dalne ki zaroorat nahi!

## Features
- Browser TTS (free, no API)
- AI Voice Cloning via ElevenLabs
- Voice upload & clone
- MP3 download
- 20,000 character limit

## Vercel pe Deploy Karo (5 minute mein)

### Step 1 — GitHub pe Upload Karo
1. [github.com](https://github.com) pe new repository banao — naam: `cloudlabs-tts`
2. Saari files upload karo (drag & drop)
3. Commit karo

### Step 2 — Vercel se Connect Karo
1. [vercel.com](https://vercel.com) pe free account banao (GitHub se login karo)
2. **"Add New Project"** click karo
3. Apni `cloudlabs-tts` repo select karo
4. **Deploy** dabao

### Step 3 — API Key Add Karo (SECRET!)
1. Vercel Dashboard → Apna Project → **Settings**
2. **Environment Variables** tab kholو
3. Yeh add karo:
   - **Name:** `ELEVENLABS_API_KEY`
   - **Value:** apni ElevenLabs API key paste karo
4. **Save** karo
5. **Redeploy** karo (Deployments tab → tین dots → Redeploy)

### Done! 🎉
Ab aapki app live hai — users ko koi API key nahi dalni, aur aapki key safe rahegi!

## File Structure
```
cloudlabs-tts/
├── api/
│   ├── voices.js        ← ElevenLabs voices fetch
│   ├── tts.js           ← Text to speech generate
│   ├── clone.js         ← Voice cloning
│   └── delete-voice.js  ← Voice delete
├── public/
│   └── index.html       ← Frontend
├── package.json
├── vercel.json
└── README.md
```
