import uuid
from typing import List
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order, OrderItem, OrderStatus
from app.models.cart import CartItem
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate
from app.core.deps import get_current_user, get_current_admin

router = APIRouter()


def generate_order_number():
    """Generate unique order number."""
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


@router.get("/", response_model=List[OrderResponse])
def get_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's order history."""
    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).order_by(Order.created_at.desc()).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get single order details."""
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/checkout", response_model=OrderResponse)
def checkout(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create order from cart."""
    # Get cart items
    cart_items = db.query(CartItem).filter(
        CartItem.user_id == current_user.id
    ).all()
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total = Decimal("0")
    for item in cart_items:
        total += item.product.price * item.quantity
    
    # Create order
    order = Order(
        user_id=current_user.id,
        order_number=generate_order_number(),
        status=OrderStatus.PENDING,
        total_amount=total,
        shipping_address=order_data.shipping_address.model_dump()
    )
    db.add(order)
    db.flush()
    
    # Create order items
    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            variant_id=cart_item.variant_id,
            quantity=cart_item.quantity,
            price_at_purchase=cart_item.product.price
        )
        db.add(order_item)
    
    # Clear cart
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    
    db.commit()
    db.refresh(order)
    return order


@router.put("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: str,
    status_data: OrderStatusUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Update order status (Admin only)."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status_data.status
    db.commit()
    db.refresh(order)
    return order
