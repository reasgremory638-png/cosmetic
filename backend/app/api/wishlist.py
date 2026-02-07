from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.wishlist import Wishlist
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductResponse
from app.core.deps import get_current_user
from typing import List

router = APIRouter()


@router.get("/", response_model=List[ProductResponse])
def get_wishlist(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's wishlist products."""
    wishlist_items = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id
    ).all()
    
    return [item.product for item in wishlist_items]


@router.post("/{product_id}")
def add_to_wishlist(
    product_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add product to wishlist."""
    # Check product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if already in wishlist
    existing = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).first()
    
    if existing:
        return {"message": "Product already in wishlist"}
    
    wishlist_item = Wishlist(user_id=current_user.id, product_id=product_id)
    db.add(wishlist_item)
    db.commit()
    return {"message": "Added to wishlist"}


@router.delete("/{product_id}")
def remove_from_wishlist(
    product_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove product from wishlist."""
    wishlist_item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).first()
    
    if not wishlist_item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")
    
    db.delete(wishlist_item)
    db.commit()
    return {"message": "Removed from wishlist"}
