from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# Initialize FastAPI app
app = FastAPI(
    title="Cosmatic E-commerce API",
    description="Backend API for Cosmatic cosmetics e-commerce platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
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

# Include API routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products_router, prefix="/api/products", tags=["Products"])
app.include_router(cart_router, prefix="/api/cart", tags=["Cart"])
app.include_router(orders_router, prefix="/api/orders", tags=["Orders"])
app.include_router(wishlist_router, prefix="/api/wishlist", tags=["Wishlist"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
