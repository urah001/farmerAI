from flask import Flask, request, jsonify
import joblib # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

# find the path and Load the trained model
model = joblib.load("crop_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
#features to recieve
    features = [
        data["SoilPH"],
        data["NitrogenN"],
        data["PhosphorusP"],
        data["PotassiumK"],
        data["TemperatureOC"],
        data["Humidity"],
        data["RainfallMM"]
    ]

    prediction = model.predict([features])[0] 
    return jsonify({"recommended_crop": prediction})

if __name__ == "__main__":
    app.run(debug=True)
