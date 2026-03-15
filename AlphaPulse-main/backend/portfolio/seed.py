from database.database import SessionLocal
from portfolio.models import Portfolio

db = SessionLocal()

sample_data = [
    Portfolio(user_id=1, symbol="AAPL", quantity=10, avg_price=180),
    Portfolio(user_id=1, symbol="GOOGL", quantity=5, avg_price=2500),
    Portfolio(user_id=1, symbol="MSFT", quantity=8, avg_price=310),
]

db.add_all(sample_data)
db.commit()
db.close()

print("Portfolio data seeded successfully")
