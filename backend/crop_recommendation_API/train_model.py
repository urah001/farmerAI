import pandas as pd
from sklearn.ensemble import RandomForestClassifier #type: ignore
from sklearn.model_selection import train_test_split  #type: ignore
import joblib  #type: ignore

df = pd.read_csv("crop_recommendation.csv")
X = df.drop(columns=["label"])
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, "crop_recommendation_model.pkl")  # ✅ Correct
print("✅ Model saved correctly.")
