# AI-Based Water Treatment Recommendation System

## 1. Project Overview
This project is a web-based AI system that helps users analyze water quality and receive treatment recommendations. The system takes water parameters such as pH, turbidity, hardness, TDS, and microbial risk, then predicts whether the water is safe and suggests suitable treatment steps.

## 2. What the Project Does
- Accepts water sample inputs from the user
- Sends the data to a backend API
- Uses a machine learning model to evaluate water quality
- Returns a result with:
  - quality score
  - quality status
  - confidence level
  - reasoning
  - recommended treatment plan

## 3. Frontend Technologies
- Language: JavaScript (JSX)
- Library: React
- Build Tool: Vite
- Styling: CSS
- Animation: Framer Motion
- Icons: Lucide React
- Routing: React Router DOM

### Frontend Main Pages
- Landing page
- Dashboard
- Water analysis form
- Results page
- History page
- About page

### Main Frontend Components
- App
- Sidebar
- TopNav
- GlassCard
- AnimatedButton

## 4. Backend Technologies
- Language: Python
- Framework: Flask
- API style: REST API
- Data handling: pandas, numpy
- Machine learning: scikit-learn
- Model serialization: joblib

### Backend Endpoints
- GET /health
  - Checks whether the API and model are available
- POST /predict
  - Accepts water parameters and returns a prediction result
- POST /train
  - Retrains the machine learning model

## 5. Database / Data Storage
The project does not currently use a traditional database like MySQL, PostgreSQL, or MongoDB.

### Current storage approach
- Dataset is stored locally as a CSV file in the backend dataset folder
- Trained model is stored as a joblib file
- History page currently uses mock data in the frontend

## 6. Dataset
Dataset file:
- backend/dataset/water_quality.csv

### Typical input columns used
- pH
- turbidity
- hardness
- TDS
- microbial risk
- quality or potability-related target values

The backend preprocessing step normalizes column names and fills missing numeric values before training.

## 7. Algorithm Used
The project uses a Random Forest Classifier from scikit-learn.

### Why it was chosen
- Works well for classification problems
- Handles non-linear relationships in water quality data
- Provides reliable prediction outputs for safe/moderate/unsafe categories

### Training flow
1. Load dataset from CSV
2. Clean and normalize columns
3. Fill missing values
4. Split data into training and testing sets
5. Train the Random Forest model
6. Save the trained model for inference

## 8. Main Backend Functions
### In backend/model.py
- get_dataset_path()
  - Finds the dataset file in the backend dataset folder
- train_model()
  - Trains the Random Forest model and saves it to the joblib file
- predict_water_treatment(ph, turbidity, hardness, tds, microbial_risk)
  - Accepts water parameters, evaluates them, and returns a prediction with score, status, confidence, reasoning, and treatment steps

### In backend/app.py
- health_check()
  - Returns API health status
- predict()
  - Handles incoming prediction requests from the frontend
- train()
  - Trigger model retraining

## 9. Main Frontend Functions / Logic
### In frontend/src/pages/WaterAnalysis.jsx
- handleChange()
  - Updates form input values
- handleAnalyze()
  - Sends the form data to the backend and navigates to the results page

### In frontend/src/pages/ResultsPage.jsx
- Computes display values for:
  - score
  - quality status
  - confidence
  - reasoning
  - treatment flow

## 10. Classes and Components Summary
This project mainly uses functional components rather than traditional class-based components.

### Frontend components
- App
- Sidebar
- TopNav
- GlassCard
- AnimatedButton
- LandingPage
- Dashboard
- WaterAnalysis
- ResultsPage
- HistoryPage
- AboutPage

### Backend logic
- No custom Python classes are used in the current implementation
- Logic is organized through functions and Flask routes

## 11. Project Flow
1. User opens the web app
2. User enters water quality parameters
3. Frontend sends the data to the Flask backend
4. Backend runs prediction logic using the trained model
5. Results page displays the recommendation and treatment plan

## 12. Summary
This project combines:
- React for the user interface
- Flask for the backend API
- Python and scikit-learn for machine learning
- CSV data for training and inference
- A simple AI-powered recommendation system for water treatment
