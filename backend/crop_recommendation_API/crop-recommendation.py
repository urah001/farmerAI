import pandas as pd
from sklearn.ensemble import RandomForestClassifier # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
import joblib # type: ignore


# df = pd.read_csv("crop_data.csv")  # <-- change to your actual filename
df = pd.read_csv("crop_recommendation.xls")  # <-- change to your actual filename

# Drop the S/N column (not useful for prediction)
# df = df.drop(columns=["S/N"])

# Ensure all columns are the correct dtype (convert if necessary)
df["Humidity"] = pd.to_numeric(df["Humidity"], errors='coerce')
df["RainfallMM"] = pd.to_numeric(df["RainfallMM"], errors='coerce')

# Drop any rows that still contain missing values after conversion
df = df.dropna()

# Separate features and labels
# X = df.drop(columns=["Recommended_Crop"])
X = df.drop(columns=["label"])
# y = df["Recommended_Crop"]
y = df["label"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
# joblib.dump(model, "crop_model.pkl")
joblib.dump(model, "crop_recommendation_model.pkl")

print("✅ Model trained and saved as crop_recommendation_model.pkl")
