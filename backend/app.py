from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import shap
import os
from catboost import CatBoostRegressor
from datetime import datetime

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load model and metadata
# -----------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model_files')

model = CatBoostRegressor()
model.load_model(os.path.join(MODEL_PATH, "bike_price_model.cbm"))

features = joblib.load(os.path.join(MODEL_PATH, "features.pkl"))
categorical_features = joblib.load(os.path.join(MODEL_PATH, "categorical_features.pkl"))

# Initialize SHAP explainer (do this once when server starts)
explainer = shap.TreeExplainer(model)

# -----------------------------
# Feature engineering function (reusable)
# -----------------------------
def engineer_features(df):
    current_year = datetime.now().year
    
    # Bike age
    df['Bike_Age'] = current_year - df['Year']
    
    # Price per year (dummy, since we don't know price yet)
    df['Price_per_Year'] = 0
    
    # Log transforms
    df['Log_Mileage'] = np.log1p(df['Mileage'])
    df['Log_Capacity'] = np.log1p(df['Capacity'])
    
    # Mileage per year, capacity per year
    df['Mileage_per_Year'] = df['Mileage'] / (df['Bike_Age'] + 1)
    df['Capacity_per_Year'] = df['Capacity'] / (df['Bike_Age'] + 1)
    
    # Price segment placeholder
    df['Price_Segment'] = "Mid-Range"
    
    # Age group
    df['Age_Group'] = df['Bike_Age'].apply(lambda age: 
        "New" if age <= 3 else
        "Recent" if age <= 7 else
        "Old" if age <= 15 else "Vintage"
    )
    
    # Mileage category
    df['Mileage_Category'] = df['Mileage'].apply(lambda m:
        "Very Low" if m <= 10000 else
        "Low" if m <= 30000 else
        "Medium" if m <= 60000 else "High"
    )
    
    # Brand popularity (dummy)
    df['Brand_Popularity'] = 0.05
    
    # Model name length
    df['Model_Name_Length'] = df['Model'].str.len()
    
    return df

# -----------------------------
# Prediction endpoint
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Convert input to DataFrame
        input_df = pd.DataFrame([data])
        
        # Apply feature engineering
        input_df = engineer_features(input_df)
        
        # Ensure column order for model
        input_df = input_df[features]
        
        # Predict
        prediction = model.predict(input_df)[0]
        
        return jsonify({
            "predicted_price": float(prediction)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)})

# -----------------------------
# NEW: SHAP Explanation endpoint
# -----------------------------
@app.route("/explain", methods=["POST"])
def explain():
    try:
        data = request.json
        
        # Convert input to DataFrame
        input_df = pd.DataFrame([data])
        
        # Apply feature engineering
        input_df = engineer_features(input_df)
        
        # Ensure column order for model
        input_df = input_df[features]
        
        # Calculate SHAP values
        shap_values = explainer.shap_values(input_df)
        
        # Get feature names and their SHAP values for this prediction
        feature_importance = []
        for i, feature in enumerate(features):
            feature_importance.append({
                "feature": feature,
                "shap_value": float(shap_values[0][i]),
                "feature_value": float(input_df[feature].iloc[0]) if input_df[feature].dtype in ['int64', 'float64'] else str(input_df[feature].iloc[0])
            })
        
        # Sort by absolute SHAP value
        feature_importance.sort(key=lambda x: abs(x['shap_value']), reverse=True)
        
        return jsonify({
            "expected_value": float(explainer.expected_value),
            "feature_importance": feature_importance[:10],  # Top 10 features
            "prediction": float(model.predict(input_df)[0])
        })
        
    except Exception as e:
        return jsonify({"error": str(e)})

# -----------------------------
# Run Flask server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)