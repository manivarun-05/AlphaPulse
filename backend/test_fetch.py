import sys
import os
sys.path.append(os.getcwd())
import model_utils

print("Testing Real Data Fetcher for GOOGL...")
result = model_utils.get_prediction('GOOGL')
print(result)

print("\nTesting Real Data Fetcher for NVDA (not in original list)...")
result_nvda = model_utils.get_prediction('NVDA')
print(result_nvda)
