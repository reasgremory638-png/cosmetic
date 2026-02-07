from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductList
from app.core.deps import get_current_admin

router = APIRouter()


@router.get("/", response_model=ProductList)
def get_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    category: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = "created_at"
):
    """Get all products with pagination and filtering."""
    query = db.query(Product).filter(Product.is_active == True)
    
    # Category filter
    if category:
        query = query.filter(Product.category == category)
    
    # Search filter
    if search:
        query = query.filter(
            or_(
                Product.title_en.ilike(f"%{search}%"),
                Product.title_ar.ilike(f"%{search}%"),
                Product.description_en.ilike(f"%{search}%")
            )
        )
    
    # Sorting
    if sort == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Product.price.desc())
    else:
        query = query.order_by(Product.created_at.desc())
    
    # Count total
    total = query.count()
    
    # Paginate
    offset = (page - 1) * per_page
    products = query.offset(offset).limit(per_page).all()
    
    return ProductList(items=products, total=total, page=page, per_page=per_page)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str, db: Session = Depends(get_db)):
    """Get a single product by ID or slug."""
    product = db.query(Product).filter(
        or_(Product.id == product_id, Product.slug == product_id)
    ).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=ProductResponse)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Create a new product (Admin only)."""
    # Check slug uniqueness
    existing = db.query(Product).filter(Product.slug == product_data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    product = Product(**product_data.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: str,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Update a product (Admin only)."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Delete a product (Admin only)."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
