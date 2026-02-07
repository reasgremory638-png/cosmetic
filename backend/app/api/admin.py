from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.user import User
from app.models.product import Product
from app.models.order import Order, OrderStatus
from app.schemas.user import UserResponse
from app.schemas.order import OrderResponse
from app.core.deps import get_current_admin
from typing import List

router = APIRouter()


@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Get admin dashboard statistics."""
    total_users = db.query(func.count(User.id)).scalar()
    total_products = db.query(func.count(Product.id)).scalar()
    total_orders = db.query(func.count(Order.id)).scalar()
    pending_orders = db.query(func.count(Order.id)).filter(
        Order.status == OrderStatus.PENDING
    ).scalar()
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.status.in_([OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED])
    ).scalar() or 0
    
    return {
        "total_users": total_users,
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "total_revenue": float(total_revenue)
    }


@router.get("/orders", response_model=List[OrderResponse])
def get_all_orders(
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: str = None
):
    """Get all orders (Admin only)."""
    query = db.query(Order)
    
    if status:
        query = query.filter(Order.status == status)
    
    offset = (page - 1) * per_page
    orders = query.order_by(Order.created_at.desc()).offset(offset).limit(per_page).all()
    return orders


@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100)
):
    """Get all users (Admin only)."""
    offset = (page - 1) * per_page
    users = db.query(User).offset(offset).limit(per_page).all()
    return users


@router.put("/users/{user_id}/admin")
def toggle_admin(
    user_id: str,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Toggle user admin status (Admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = not user.is_admin
    db.commit()
    return {"message": f"Admin status set to {user.is_admin}"}
