# 🎵 DHUN

> AI-powered music discovery and recommendation platform — find songs that match your mood, vibe, or context using intelligent LLM-driven recommendations.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![Groq](https://img.shields.io/badge/Groq-LLaMA-purple?style=flat-square)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=flat-square&logo=flask)

---

## 📌 Overview

DHUN (Hindi: *धुन* — melody/tune) is an AI music recommendation system that understands natural language mood descriptions and returns curated song suggestions. Instead of relying purely on metadata tags, DHUN uses an LLM to interpret context, emotion, and preference — delivering recommendations that feel human and intuitive.

---

## 🧠 Architecture

```
User Input (Mood / Context / Query)
e.g. "late night drive, melancholic but hopeful"
        │
        ▼
  Prompt Builder
  (Structures mood + preference context)
        │
        ▼
  Groq API (LLaMA-3)
  Interprets mood → maps to music attributes
  (tempo, genre, energy, era, language)
        │
        ▼
  Recommendation Engine
  (Generates song list with reasoning)
        │
        ▼
  Result Display
  (Song · Artist · Why it fits · Mood tag)
        │
        ▼
  Flask Dashboard
  (Dark-themed music UI)
```

---

## 🗂️ Project Structure

```
DHUN/
├── backend/
│   ├── app.py                    # Flask entry point
│   ├── recommender.py            # Groq API recommendation logic
│   ├── prompt_builder.py         # Mood-to-prompt construction
│   └── groq_client.py            # Shared Groq API wrapper
├── frontend/
│   ├── templates/
│   │   └── index.html            # Main dashboard
│   └── static/
│       ├── style.css             # Dark music UI
│       └── app.js
├── data/
│   └── seed_songs.json           # Optional: seed song database
├── .env
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Python 3.10+
- Groq API key ([Get one here](https://console.groq.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/LUNAR-ARC/DHUN.git
cd DHUN
```

### 2. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**Key dependencies:**

```
flask
groq
python-dotenv
flask-cors
```

### 4. Configure Environment Variables

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## 🚀 Running DHUN

```bash
python backend/app.py
```

Navigate to `http://localhost:5000`. Type a mood, emotion, or situation — DHUN returns a curated playlist with reasoning for each pick.

---

## 🎧 Example Queries

| Input | What DHUN Returns |
|---|---|
| `"melancholic late night drive"` | Phoebe Bridgers, Bon Iver, The National |
| `"pump up, gym session, heavy"` | Metallica, Eminem, NF |
| `"Sunday morning, chill, Indian"` | Arijit Singh, Prateek Kuhad, Lucky Ali |
| `"focus mode, no lyrics, study"` | Hans Zimmer, Ludovico Einaudi, Tycho |
| `"nostalgic 90s Bollywood"` | A.R. Rahman classics, Udit Narayan |

---

## 📡 API Reference

### `POST /recommend`

**Request:**
```json
{
  "mood": "late night drive, melancholic but hopeful",
  "language_preference": "any",
  "count": 8
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "song": "Motion Picture Soundtrack",
      "artist": "Radiohead",
      "reason": "Slow, ethereal, melancholic with an undercurrent of hope.",
      "mood_tags": ["melancholic", "atmospheric", "night"]
    }
  ]
}
```

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| AI Recommendations | Groq API (LLaMA-3) |
| Backend | Flask |
| Frontend | HTML/CSS/JS (Dark Theme) |

---

## 📄 License

MIT License. See `LICENSE` for details.
