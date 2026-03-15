from pydantic import BaseModel


class PortfolioOut(BaseModel):
    symbol: str
    quantity: int
    avg_price: float

    class Config:
        orm_mode = True
