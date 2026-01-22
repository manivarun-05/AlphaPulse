from database.database import SessionLocal
from database.models import Portfolio

db = SessionLocal()

portfolio_item = Portfolio(
    user_id=1,        # assumes user with ID = 1 exists
    symbol="AAPL",
    quantity=10,
    avg_price=180.0
)

db.add(portfolio_item)
db.commit()
db.close()

print("✅ Portfolio data inserted successfully")
