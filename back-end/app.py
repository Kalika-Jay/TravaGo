from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
import json
# from flask_cors import CORS  # Optional: enable cross-origin requests

# Initialize Flask app
app = Flask(__name__)

# Load model pipeline
with open('trip_predictor4.pkl', 'rb') as f:
    pipeline = pickle.load(f)

model = pipeline['model']
input_encoder = pipeline['input_encoder']
output_encoder = pipeline['output_encoder']
scaler = pipeline['scaler']
columns = pipeline['columns']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Convert JSON to DataFrame (with correct column order)
        input_df = pd.DataFrame([data])[columns]
        print(input_df)

        # Encode categorical inputs (e.g., 'Sinhala' → 0)
        input_encoded = input_encoder.transform(input_df)
        print(input_encoded)

        # Scale numerical input
        input_scaled = scaler.transform(input_encoded)

        # Predict destination class (as an index)
        pred = model.predict(input_scaled)

        # Decode index to original destination string
        decoded = output_encoder.inverse_transform(pred.astype(int).reshape(-1))

        return jsonify({'prediction': decoded[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)
