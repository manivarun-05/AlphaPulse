from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import model_utils

app = FastAPI()

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return {} # Return empty JSON or 204 to silence browser requests

# Include Routers
from auth import routes as auth_routes
from portfolio import routes as portfolio_routes

app.include_router(auth_routes.router)
app.include_router(portfolio_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/predict")
def predict(symbol: str = "AAPL"):
    try:
        resultado = model_utils.get_prediction(symbol)
        return resultado
    except Exception as e:
        return {"error": str(e)}

@app.get("/stock/{symbol}/history")
def stock_history(symbol: str):
    try:
        return model_utils.get_stock_history(symbol)
    except Exception as e:
        return {"error": str(e)}

@app.get("/market/overview")
def market_overview():
    try:
        # Predefined list of popular stocks
        symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA", "NVDA", "NFLX"]
        results = []
        for sym in symbols:
            # We reuse get_prediction to get current price and trend
            # In a real app, we'd batch this or use a lighter fetch
            data = model_utils.get_prediction(sym)
            results.append({
                "symbol": sym,
                "name": sym, # Simplification
                "price": data.get("current_price", 0),
                "change": data.get("change_percent", 0),
                "trend": data.get("trend", "Neutral")
            })
        return results
    except Exception as e:
        return {"error": str(e)}
