from pydantic import BaseModel
from typing import Optional, List, Any
from decimal import Decimal
from datetime import datetime
from enum import Enum


class OrderStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class ShippingAddress(BaseModel):
    full_name: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    country: str
    postal_code: Optional[str] = None
    phone: str


class OrderItemResponse(BaseModel):
    id: str
    product_id: str
    variant_id: Optional[str] = None
    quantity: int
    price_at_purchase: Decimal
    
    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    shipping_address: ShippingAddress


class OrderResponse(BaseModel):
    id: str
    order_number: str
    status: str
    total_amount: Decimal
    shipping_address: Any
    items: List[OrderItemResponse] = []
    payment_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str
