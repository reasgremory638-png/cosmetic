from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from decimal import Decimal
from datetime import datetime
from app.schemas.product import ProductResponse


class CartItemBase(BaseModel):
    product_id: UUID
    variant_id: Optional[str] = None
    quantity: int = 1


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    product: ProductResponse
    variant_id: Optional[str] = None
    quantity: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total: Decimal
    item_count: int
