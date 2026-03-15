import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

# Load trained model
model = load_model("lstm_stock_model.h5")

# Load stock data
df = pd.read_csv("AAPL_data.csv")

# Use Close prices
close_prices = df["Close"].values.reshape(-1, 1)

# Normalize data (same scaler logic as training)
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(close_prices)

# Take last 60 days for prediction
last_60_days = scaled_data[-60:]

# Reshape for LSTM (1 sample, 60 timesteps, 1 feature)
X_input = last_60_days.reshape((1, 60, 1))

# Predict next day (scaled value)
predicted_scaled_price = model.predict(X_input)

# Convert back to real price
predicted_price = scaler.inverse_transform(predicted_scaled_price)

print("Predicted next-day closing price:")
print(f"${predicted_price[0][0]:.2f}")
