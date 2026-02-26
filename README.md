# Fake Face Detector Client

React + Vite frontend for uploading an image and calling the detection API.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

By default, the app calls `/api/predict`, and Vite proxies `/api/*` to `http://localhost:8000`.

## Environment variables

- `VITE_API_PROXY_TARGET`: backend URL for local development proxy (default `http://localhost:8000`)
- `VITE_API_BASE_URL`: optional absolute base URL for direct API calls (useful in production)
- `VITE_API_PREDICT_PATH`: path or absolute URL for prediction endpoint (default `/api/predict`)

## Guess game dataset

The game reads random images from:

- `public/dataset/real`
- `public/dataset/fake`

It loads file names from `public/dataset/manifest.json` and then picks one random image from each class every round.

If you add/remove images, regenerate the manifest:

```bash
node -e "const fs=require('fs'); const path=require('path'); const base=path.join(process.cwd(),'public','dataset'); const read=(d)=>fs.readdirSync(path.join(base,d)).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort(); const manifest={real:read('real'), fake:read('fake')}; fs.writeFileSync(path.join(base,'manifest.json'), JSON.stringify(manifest,null,2)+'\n'); console.log('manifest updated', manifest.real.length, manifest.fake.length);"
```

Note: folder name is `dataset`.

## Vercel (frontend)

Set these env vars in Vercel Project Settings:

- `VITE_API_BASE_URL=https://eslamaly-fake-face-detector-api.hf.space`
- `VITE_API_PREDICT_PATH=/predict`

## API contract expected by client

`POST /predict` with multipart form-data field: `image`

Response:

```json
{
  "label": "REAL",
  "confidence": 99.96,
  "probability_real": 99.96
}
```
