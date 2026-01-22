import yfinance as yf
import pandas as pd

# Choose a stock symbol
symbol = "AAPL"   # Apple Inc.

# Create ticker object
ticker = yf.Ticker(symbol)

# Fetch historical data (1 year)
data = ticker.history(period="1y")

# Print first 5 rows
print(data.head())

# Save data to CSV for later ML use
data.to_csv(f"{symbol}_data.csv")

print("Data saved successfully!")

