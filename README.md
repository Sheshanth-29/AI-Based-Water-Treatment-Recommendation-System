# AI-Based Water Treatment Recommendation System

An intelligent web application that evaluates water quality metrics and delivers tailored water treatment recommendations using Machine Learning.

---

## 🌟 Key Features
- **Water Quality Prediction:** Evaluates parameters including pH, Turbidity, Hardness, TDS, and Microbial Risk.
- **ML Powered Engine:** Built with a Scikit-Learn Random Forest Classifier to assess potability and safety.
- **Interactive UI:** Modern React dashboard built with Vite, Framer Motion, and Lucide icons.
- **Actionable Recommendations:** Detailed treatment protocols, confidence metrics, and parameter-specific insights.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Framer Motion, Chart.js, Lucide React, CSS
- **Backend:** Python, Flask, Flask-CORS
- **Machine Learning:** Scikit-Learn (Random Forest), Pandas, NumPy, Joblib

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at `http://127.0.0.1:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## 📖 API Endpoints
- `GET /health` - API and model status check
- `POST /predict` - Accepts water sample parameters and returns recommendations
- `POST /train` - Retrains the Random Forest model on the dataset
