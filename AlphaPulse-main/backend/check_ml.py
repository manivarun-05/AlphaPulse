import sys
import os

# Add current directory to path so we can import model_utils
sys.path.append(os.getcwd())

try:
    print("1. Importing model_utils...")
    import model_utils
    
    print("2. Attempting to load models (LSTM + XGBoost)...")
    model_utils.load_models()
    print("   [SUCCESS] Models loaded.")

    print("3. Testing predict_next_price()...")
    # Note: model_utils.predict_next_price() currently reads AAPL_data.csv locally
    price = model_utils.predict_next_price()
    print(f"   [SUCCESS] Predicted Price: {price}")
    
    print("4. Testing predict_trend()...")
    trend = model_utils.predict_trend()
    print(f"   [SUCCESS] Predicted Trend: {trend}")

    print("\n✅ ML Engine is working correctly!")

except Exception as e:
    print(f"\n❌ ML Engine Failed: {e}")
    import traceback
    traceback.print_exc()
