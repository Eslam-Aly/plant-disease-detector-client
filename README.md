# Plant Disease Detector Client

React + Vite frontend for a plant disease diagnosis prototype with:

- plant leaf image upload
- placeholder disease analysis output
- uncertainty-aware recommendation UI
- decision-support game
- study-ready interface structure

## Project overview

This project is part of a bachelor’s thesis workflow focused on:

- robust plant disease diagnosis under real-world conditions
- uncertainty-aware decision support
- Grad-CAM explanation support
- deployment-oriented prototype design

The frontend is being adapted from an earlier fake-face detector prototype into a plant-disease diagnosis system.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

By default, the app calls `/api/predict`, and Vite proxies `/api/*` to `http://localhost:8000` during local development.

## Environment variables

- `VITE_API_PROXY_TARGET`: backend URL for local development proxy (default `http://localhost:8000`)
- `VITE_API_BASE_URL`: optional absolute base URL for direct API calls
- `VITE_API_PREDICT_PATH`: path or absolute URL for prediction endpoint (default `/api/predict`)
- `VITE_WEB3FORMS_ACCESS_KEY`: Web3Forms public access key for contact form submission

## Current frontend status

The current UI includes:

- home page with plant-disease branding
- about page
- contact page
- decision-support game using curated PlantDoc images
- detector section with placeholder outputs for:
  - predicted disease
  - confidence
  - uncertainty
  - recommendation
  - explanation support

The detector is currently using placeholder results for UI development and will later be connected to the real plant-disease backend.

## Game dataset

The decision-support game reads curated cases from:

- `public/game/images/`
- `public/game/manifest.json`

Each case in the manifest includes:

- image path
- predicted disease label
- confidence
- uncertainty
- explanation support
- correct action
- explanation text

## Planned API contract

The intended frontend prediction flow is based on plant leaf image upload.

Expected request:

- `POST /predict`
- multipart form-data field: `image`

Planned response shape:

```json
{
  "label": "Tomato Early Blight",
  "confidence": 86,
  "uncertainty": 18,
  "recommendation": "ACCEPT",
  "explanation_support": "strong"
}
```

## Notes

- This repository currently focuses on frontend prototype development.
- Some sections still use placeholder logic while the plant-disease backend is being prepared.
- Deployment-oriented benchmarking and user-study functionality will be added later as part of the thesis workflow.
