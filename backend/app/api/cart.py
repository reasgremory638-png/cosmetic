from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from decimal import Decimal
from app.database import get_db
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartItemCreate, CartItemUpdate, CartResponse
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=CartResponse)
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's cart with items."""
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    
    # Calculate total
    total = Decimal("0")
    for item in cart_items:
        total += item.product.price * item.quantity
    
    return CartResponse(
        items=cart_items,
        total=total,
        item_count=len(cart_items)
    )


@router.post("/items")
def add_to_cart(
    item_data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add item to cart."""
    # Check product exists
    product = db.query(Product).filter(Product.id == item_data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if already in cart
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == item_data.product_id,
        CartItem.variant_id == item_data.variant_id
    ).first()
    
    if existing_item:
        existing_item.quantity += item_data.quantity
    else:
        cart_item = CartItem(
            user_id=current_user.id,
            product_id=item_data.product_id,
            variant_id=item_data.variant_id,
            quantity=item_data.quantity
        )
        db.add(cart_item)
    
    db.commit()
    return {"message": "Item added to cart"}


@router.put("/items/{item_id}")
def update_cart_item(
    item_id: str,
    item_data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update cart item quantity."""
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.user_id == current_user.id
    ).first()
    
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    if item_data.quantity <= 0:
        db.delete(cart_item)
    else:
        cart_item.quantity = item_data.quantity
    
    db.commit()
    return {"message": "Cart updated"}


@router.delete("/items/{item_id}")
def remove_from_cart(
    item_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove item from cart."""
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.user_id == current_user.id
    ).first()
    
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}


@router.delete("/clear")
def clear_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Clear entire cart."""
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared"}
