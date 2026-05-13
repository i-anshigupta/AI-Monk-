# 🌟 AI Monk - Professional Nested Tags Tree Editor

A premium, full-stack application designed for creating, editing, and managing deeply nested hierarchical structures. Built with a focus on clean "Soft Indigo" aesthetics and a seamless user experience.

![GitHub last commit](https://img.shields.io/github/last-commit/i-anshigupta/AI-Monk-)
![GitHub repo size](https://img.shields.io/github/repo-size/i-anshigupta/AI-Monk-)
![Technology](https://img.shields.io/badge/Tech-React%20%7C%20FastAPI%20%7C%20SQLite-blue)

---

## ✨ Key Features

### 🌲 Intelligent Tree Management
- **Recursive Rendering**: Infinite nesting support with a clean, indented visual hierarchy.
- **Smart Node Conversion**: Automatically transforms "Data" nodes into "Parent" nodes when a child is added.
- **Dynamic Editing**: In-place renaming of nodes with `Enter` to save and `Escape` to cancel.
- **Collapsible Branches**: Easily manage large trees by expanding or collapsing any node.

### 📑 Advanced Data Export
- **Live JSON Tab**: A dedicated side panel that shows your tree's structure in real-time.
- **Syntax Highlighting**: Custom-built highlighter for the JSON tab with professional color-coding for keys, strings, and numbers.
- **One-Click Copy**: Integrated copy-to-clipboard functionality with instant visual feedback.

### 🎨 Premium "Soft Indigo" UI
- **Cohesive Design**: A unified Indigo-based design system across both the editor and data panels.
- **Responsive Layout**: Optimized for all screen sizes with a sticky sidebar for data preview.
- **Micro-Animations**: Smooth transitions, hover effects, and active-click states for a high-end feel.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, Axios |
| **Backend** | FastAPI (Python), Uvicorn, Python-Dotenv |
| **Database** | SQLite, SQLAlchemy (ORM), Pydantic |
| **DevOps** | Git, Environment Variables (.env), .gitignore |

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Python**: 3.11+
- **Node.js**: 18+
- **npm**: 9+

### 🛠️ Setup & Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/i-anshigupta/AI-Monk-.git
cd AI-Monk-
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate # macOS/Linux

pip install -r requirements.txt
cp .env.example .env  # Configure your environment
python main.py
```
*Server runs at: `http://localhost:8000`*

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env  # Ensure VITE_API_URL is set correctly
npm run dev
```
*App runs at: `http://localhost:5173`*

---

## 📂 Project Structure

```text
AI-Monk-/
├── backend/
│   ├── main.py            # FastAPI application logic
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Backend environment variables
│   └── trees.db           # SQLite database (ignored by git)
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components (TagView)
│   │   ├── App.jsx        # Main application layout & logic
│   │   ├── index.css      # Global "Soft Indigo" design system
│   │   └── main.jsx       # Entry point
│   ├── .env               # Frontend environment variables
│   └── package.json       # Node dependencies & scripts
└── .gitignore             # Root git ignore rules
```

---

## 🔄 Workflow

1. **Initialize**: Start a new tree or load existing ones from the database.
2. **Build**: Add children, rename nodes, and edit leaf-node data.
3. **Persist**: Click **Export & Save** to sync the local state with the SQLite database.
4. **Utilize**: View the beautified JSON in the right-hand **Exported Data Tab** and copy it for use in other systems.

---

## 🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

**Developed with ❤️ by [Anshika Gupta](https://github.com/i-anshigupta)**
