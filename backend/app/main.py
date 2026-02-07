import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app FIRST
app = FastAPI(
    title="Cosmatic E-commerce API",
    description="Backend API for Cosmatic cosmetics e-commerce platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS - allow all for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints - MUST work first
@app.get("/")
def read_root():
    return {
        "message": "Cosmatic API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}


# Import and setup database/routes AFTER app is created
try:
    from app.config import settings
    from app.database import Base, engine
    from app.api.auth import router as auth_router
    from app.api.products import router as products_router
    from app.api.cart import router as cart_router
    from app.api.orders import router as orders_router
    from app.api.wishlist import router as wishlist_router
    from app.api.admin import router as admin_router

    # Create database tables
    Base.metadata.create_all(bind=engine)

    # Include API routers
    app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
    app.include_router(products_router, prefix="/api/products", tags=["Products"])
    app.include_router(cart_router, prefix="/api/cart", tags=["Cart"])
    app.include_router(orders_router, prefix="/api/orders", tags=["Orders"])
    app.include_router(wishlist_router, prefix="/api/wishlist", tags=["Wishlist"])
    app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
except Exception as e:
    print(f"Error loading modules: {e}")
    # App will still work with basic endpoints


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
