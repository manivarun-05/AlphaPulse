from fastapi import APIRouter

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"]
)

import model_utils

@router.get("/")
def get_portfolio():
    # Mock database of holdings
    # in a real app, this comes from the database
    holdings = [
        {"symbol": "AAPL", "quantity": 10, "avg_price": 150.00},
        {"symbol": "GOOGL", "quantity": 5, "avg_price": 130.00},
        {"symbol": "MSFT", "quantity": 8, "avg_price": 350.00},
        {"symbol": "AMZN", "quantity": 12, "avg_price": 140.00},
        {"symbol": "META", "quantity": 4, "avg_price": 400.00}
    ]

    total_value = 0
    total_cost = 0
    assets = []

    for item in holdings:
        # Fetch real-time price
        data = model_utils.get_prediction(item["symbol"])
        current_price = data.get("current_price", item["avg_price"]) # Fallback to avg if fail
        
        market_value = current_price * item["quantity"]
        cost_basis = item["avg_price"] * item["quantity"]
        
        profit = market_value - cost_basis
        profit_percent = (profit / cost_basis) * 100 if cost_basis > 0 else 0

        total_value += market_value
        total_cost += cost_basis

        assets.append({
            "symbol": item["symbol"],
            "quantity": item["quantity"],
            "avg_price": item["avg_price"],
            "current_price": current_price,
            "market_value": round(market_value, 2),
            "profit": round(profit, 2),
            "profit_percent": round(profit_percent, 2),
            "allocation": 0 # Will calc below
        })

    # Calculate allocation percentages
    for asset in assets:
        if total_value > 0:
            asset["allocation"] = round((asset["market_value"] / total_value) * 100, 1)

    total_profit = total_value - total_cost
    total_profit_percent = (total_profit / total_cost) * 100 if total_cost > 0 else 0

    return {
        "total_value": round(total_value, 2),
        "total_profit": round(total_profit, 2),
        "total_profit_percent": round(total_profit_percent, 2),
        "assets": assets
    }
