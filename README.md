# Sri Lanka Used Bike Price Predictor

A full-stack machine learning web application that predicts the market price of used bikes in Sri Lanka and provides AI-powered explanations using SHAP. Built with **Flask** (backend), **React/Next.js** (frontend), and **CatBoost** (ML model).

 
<img width="1078" height="823" alt="image" src="https://github.com/user-attachments/assets/f8910297-0daf-4d31-b164-2175ff10aec4" />
<img width="995" height="725" alt="image" src="https://github.com/user-attachments/assets/05d6595c-d7a7-4f8f-a514-fca566a5fa14" />


---

## Features

-  **Price Prediction** – Enter bike details (brand, model, year, mileage, etc.) and get an instant estimated price.
-  **AI Explainability** – Understand why the model predicted a certain price with SHAP-based feature impact analysis.
- **User‑friendly Interface** – Clean, responsive design with dropdowns and input validation.
- **Real‑time Inference** – Flask backend serves predictions and explanations via REST API.

---

## Machine Learning & Explainability

- **Algorithm**: [CatBoost](https://catboost.ai/) – a gradient boosting library that handles categorical features natively.
- **Performance**: Trained on 5000+ real bike listings from Sri Lanka. 
- **Explainability**: [SHAP](https://shap.readthedocs.io/) (SHapley Additive exPlanations) – provides local feature contributions for each prediction.

---

## Tech Stack

| Frontend          | Backend         | ML / Data          |
| ----------------- | --------------- | ------------------- |
| Next.js (React)   | Flask           | CatBoost            |
| Tailwind CSS      | Flask-CORS      | SHAP                |
| Lucide Icons      | joblib          | Pandas / NumPy      |

---
### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bike-price-predictor-sri-lanka.git
cd bike-price-predictor-sri-lanka
```
### 2.Backend Setup (Flask)
```bash
cd backend
```
```bash
pip install Flask Flask-CORS pandas numpy joblib catboost shap scikit-learn
```
```bash
python app.py
```
The API will be available at http://127.0.0.1:5000.

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
```
```bash
npm run dev
```
Visit http://localhost:3000 in your browser.



