# AlphaPulse

AlphaPulse is an AI-powered stock prediction platform that combines real-time market data with machine learning capabilities to forecast stock prices and trends. The application features a modern web interface, a fast API backend, and local predictive models.

## Project Structure

This repository is organized into three main components:

- **`frontend/`**: The web application built with React, Vite, Bootstrap, and Chart.js, providing an interactive dashboard for tracking stocks and viewing predictions.
- **`backend/`**: A robust REST API built with FastAPI and SQLAlchemy. It handles user authentication, portfolio management, database interactions, and serves the machine learning model predictions.
- **`ml_engine/`**: The core data science module. It includes scripts to fetch historical stock data (via `yfinance`), train deep learning models (LSTM in TensorFlow) for price forecasting, and train XGBoost models for trend analysis.

## Key Features

- **Real-Time Data**: Fetch and display current stock market prices.
- **Machine Learning Forecasts**: Predict the next day's closing price and analyze stock trends (Bullish/Bearish) using trained models.
- **Interactive UI**: View beautiful, responsive charts generated with Chart.js.
- **Portfolio Tracking**: Manage mocked stock portfolios, including tracking current holdings.
- **Secure Authentication**: Built-in user authentication using JWT and secure password hashing.

## Getting Started

### Prerequisites

- Node.js (for the frontend)
- Python 3.8+ (for the backend and ML engine)
- PostgreSQL or SQLite (depending on your `database` configuration)

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### ML Engine (Optional)

If you wish to retrain the models or fetch new dataset samples:
1. Navigate to the `ml_engine` directory.
2. Ensure you have installed the backend requirements (as `tensorflow`, `xgboost`, `scikit-learn`, `pandas`, `yfinance` are shared).
3. Run the scripts to fetch data and train:
   ```bash
   python fetch_stock_data.py
   python train_lstm.py
   python train_xgboost_trend.py
   ```

## API Documentation

When the backend server is running, you can view the interactive API documentation (Swagger UI) by navigating to `http://localhost:8000/docs` in your browser.

## Built With

* **[React](https://react.dev/)** & **[Vite](https://vitejs.dev/)**
* **[FastAPI](https://fastapi.tiangolo.com/)**
* **[TensorFlow / Keras](https://www.tensorflow.org/)**
* **[XGBoost](https://xgboost.readthedocs.io/)**
* **[Chart.js](https://www.chartjs.org/)**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
