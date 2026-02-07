from pydantic import BaseModel, ConfigDict
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
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    product_id: str
    variant_id: Optional[str] = None
    quantity: int
    created_at: Optional[datetime] = None


class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total: Decimal
    item_count: int
