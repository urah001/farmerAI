from flask import Flask, request, jsonify
from flask_cors import CORS  # type: ignore # Add this
import numpy as np
import pickle

model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
ms = pickle.load(open('minmaxscaler.pkl', 'rb'))
application = Flask(__name__)
CORS(application)  # Allow requests from Next.js

@application.route('/')
def ok():
    return "Running!"

@application.route('/pred', methods=['POST'])
def predict():
    data = request.get_json()  # Receive JSON
    N = data.get('Nitrogen')
    P = data.get('Phosphorus')
    K = data.get('Potassium')
    temp = data.get('Temperature')
    humidity = data.get('Humidity')
    ph = data.get('Ph')
    rainfall = data.get('Rainfall')

    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    prediction = model.predict(final_features)

    crop_dict = {
        1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
        8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
        14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
        19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
    }

    crop = crop_dict.get(prediction[0], 'NOT able to recommend')
    return jsonify({'recommended_crop': crop})

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=5000, debug=True)
