# AIMonk Nested Tags Tree Editor

A full-stack application built with FastAPI, React, and PostgreSQL (SQLite for local dev).

## Features
- **Recursive Tree Rendering**: View and edit deeply nested tags.
- **Dynamic Node Updates**: Rename nodes, edit data, and add children.
- **Smart Add Child**: Automatically converts data nodes to parent nodes when a child is added.
- **Collapsible Nodes**: Expand or collapse any part of the tree.
- **JSON Export**: Generate a clean JSON structure of the current tree state.
- **Persistence**: Save and load multiple tree structures from the database.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios.
- **Backend**: FastAPI, SQLAlchemy, Pydantic.
- **Database**: SQLite (SQLAlchemy).

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+

### Installation & Running

#### 1. Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy pydantic
python main.py
```
The backend will run at `http://localhost:8000`.

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`.

## Usage
1. Open the browser to `http://localhost:5173`.
2. Click on any node name to rename it (press Enter to save).
3. Modify the "Data" text field for leaf nodes.
4. Click "Add Child" to add a new child node.
5. Click "Export & Save" to save the tree to the database and view the JSON output in the right panel.
6. Use "Add New Tree" to start a fresh tree structure.
