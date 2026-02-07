import uuid
from decimal import Decimal
from sqlalchemy import Column, String, Numeric, Boolean, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database import Base


class Product(Base):
    __tablename__ = "products"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title_en = Column(String, nullable=False)
    title_ar = Column(String, nullable=False)
    description_en = Column(Text, nullable=True)
    description_ar = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    compare_at_price = Column(Numeric(10, 2), nullable=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=True)
    brand = Column(String, nullable=True)
    stock_quantity = Column(Numeric(10, 0), default=0)
    images = Column(JSON, nullable=True)
    variants = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    def __repr__(self):
        return f"<Product {self.title_en}>"
