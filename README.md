# 🚀 DeepSeek OCR - React + FastAPI

Modern OCR web application powered by DeepSeek-OCR with a stunning React frontend and FastAPI backend.

> **Note**: This was a quickly vibe-coded project to test out DeepSeek-OCR! It basically works quite nice on an RTX 5090. The "Find" mode grounding boxes aren't quite working yet - probably my fault in not interpreting the dimensions correctly, but the core OCR functionality is pretty nice so far.

## Quick Start

```bash
docker compose up --build
```

Then open:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Features

### 4 OCR Modes
- **Plain OCR** - Raw text extraction
- **Describe** - Generate image descriptions
- **Find** - Locate specific terms (grounding boxes WIP)
- **Freeform** - Custom prompts for anything

### UI Features
- 🎨 Glass morphism design with animated gradients
- 🎯 Drag & drop file upload
- 📦 Grounding box visualization (WIP - dimensions need fixing)
- ✨ Smooth animations (Framer Motion)
- 📋 Copy/Download results
- 🎛️ Advanced settings dropdown
- 📝 Markdown rendering for formatted output

## Tech Stack

- **Frontend**: React 18 + Vite 5 + TailwindCSS 3 + Framer Motion 11
- **Backend**: FastAPI + PyTorch + Transformers 4.46 + DeepSeek-OCR
- **Server**: Nginx (reverse proxy)
- **Container**: Docker + Docker Compose with multi-stage builds
- **GPU**: NVIDIA CUDA support (tested on RTX 5090)

## Project Structure

```
deepseek-ocr/
├── backend/           # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── models/            # Model cache
└── docker-compose.yml
```

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Requirements

- Docker & Docker Compose
- NVIDIA GPU with CUDA support (tested on RTX 5090)
- nvidia-docker runtime
- ~8-12GB VRAM for model

## Known Issues

- 📦 **Find mode grounding boxes**: Not rendering correctly - likely dimension scaling issue in the canvas overlay logic. Boxes are detected and returned by the backend, but the frontend visualization needs work.

## API Usage

### POST /api/ocr

**Parameters:**
- `image` (file, required)
- `mode` (string): plain_ocr | describe | find_ref | freeform
- `prompt` (string): Custom prompt for freeform mode
- `grounding` (bool): Enable bounding boxes (auto-enabled for find_ref)
- `find_term` (string): Term to locate in find_ref mode
- `base_size` (int): Base processing size (default: 1024)
- `image_size` (int): Image size (default: 640)
- `crop_mode` (bool): Enable crop mode (default: true)

**Response:**
```json
{
  "success": true,
  "text": "Extracted text...",
  "boxes": [{"label": "field", "box": [x1, y1, x2, y2]}],
  "image_dims": {"w": 1920, "h": 1080},
  "metadata": {...}
}
```

## Troubleshooting

### GPU not detected
```bash
nvidia-smi
docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
```

### Port conflicts
```bash
sudo lsof -i :3000
sudo lsof -i :8000
```

### Frontend build issues
```bash
cd frontend
rm -rf node_modules package-lock.json
docker-compose build frontend
```

## License

This project uses the DeepSeek-OCR model. Refer to the model's license terms.
