from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
from datetime import datetime


class CartItemBase(BaseModel):
    product_id: str
    variant_id: Optional[str] = None
    quantity: int = 1


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemResponse(BaseModel):
    id: str
    product_id: str
    variant_id: Optional[str] = None
    quantity: int
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total: Decimal
    item_count: int
