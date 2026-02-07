# Import all models to ensure they are registered with SQLAlchemy
from app.models.user import User
from app.models.product import Product
from app.models.cart import CartItem
from app.models.wishlist import Wishlist
from app.models.order import Order, OrderItem, OrderStatus

__all__ = [
    "User",
    "Product",
    "CartItem",
    "Wishlist",
    "Order",
    "OrderItem",
    "OrderStatus",
]
