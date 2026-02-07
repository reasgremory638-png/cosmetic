from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.cart import router as cart_router
from app.api.wishlist import router as wishlist_router
from app.api.orders import router as orders_router
from app.api.admin import router as admin_router

__all__ = [
    "auth_router",
    "products_router", 
    "cart_router",
    "wishlist_router",
    "orders_router",
    "admin_router",
]
