from flask import Flask, request, jsonify
from flask_cors import CORS #type:ignore
import numpy as np
import joblib  # type:ignore

# ✅ CORRECT model loading
model = joblib.load("crop_recommendation_model.pkl")

application = Flask(__name__)
CORS(application)

@application.route('/')
def ok():
    return "Running!"

@application.route('/pred', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("📥 Received data:", data)

        # ✅ Convert inputs to float
        N = float(data.get('NitrogenN'))
        P = float(data.get('PhosphorusP'))
        K = float(data.get('PotassiumK'))
        temp = float(data.get('TemperatureOC'))
        humidity = float(data.get('Humidity'))
        ph = float(data.get('SoilPH'))
        rainfall = float(data.get('RainfallMM'))

        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        print("🔢 Features:", feature_list)

        single_pred = np.array(feature_list).reshape(1, -1)

        # ✅ Predict directly with the model
        prediction = model.predict(single_pred)

        return jsonify({'recommended_crop': prediction[0]})

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=5000, debug=True)
