import pandas as pd
import numpy as np
from ta.momentum import RSIIndicator
from ta.trend import MACD, SMAIndicator
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import classification_report
import joblib

# Load data
df = pd.read_csv("AAPL_data.csv")

# Create technical indicators
df["rsi"] = RSIIndicator(df["Close"]).rsi()
df["macd"] = MACD(df["Close"]).macd()
df["sma_20"] = SMAIndicator(df["Close"], window=20).sma_indicator()
df["sma_50"] = SMAIndicator(df["Close"], window=50).sma_indicator()

# Drop missing rows
df.dropna(inplace=True)

# Create labels
def label_trend(row):
    if row["Close"] > row["sma_20"] and row["macd"] > 0:
        return 2  # Bullish
    elif row["Close"] < row["sma_20"] and row["macd"] < 0:
        return 0  # Bearish
    else:
        return 1  # Neutral

df["trend"] = df.apply(label_trend, axis=1)

# Features and target
X = df[["rsi", "macd", "sma_20", "sma_50"]]
y = df["trend"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train XGBoost classifier
model = XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    eval_metric="mlogloss"
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(model, "xgb_trend_model.pkl")

print("XGBoost trend model trained and saved successfully")
