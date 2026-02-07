from pydantic import BaseModel
from typing import Optional, List, Any
from uuid import UUID
from decimal import Decimal
from datetime import datetime


class ProductBase(BaseModel):
    title_en: str
    title_ar: str
    description_en: Optional[str] = None
    description_ar: Optional[str] = None
    price: Decimal
    compare_at_price: Optional[Decimal] = None
    slug: str
    category: Optional[str] = None
    brand: Optional[str] = None
    stock_quantity: int = 0
    images: Optional[List[str]] = []
    variants: Optional[List[Any]] = []
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    title_en: Optional[str] = None
    title_ar: Optional[str] = None
    description_en: Optional[str] = None
    description_ar: Optional[str] = None
    price: Optional[Decimal] = None
    compare_at_price: Optional[Decimal] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    stock_quantity: Optional[int] = None
    images: Optional[List[str]] = None
    variants: Optional[List[Any]] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ProductList(BaseModel):
    items: List[ProductResponse]
    total: int
    page: int
    per_page: int
