import uuid
from sqlalchemy import Column, ForeignKey, DateTime, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Wishlist(Base):
    __tablename__ = "wishlist"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="wishlist_items")
    product = relationship("Product", backref="wishlist_items")
    
    def __repr__(self):
        return f"<Wishlist user={self.user_id} product={self.product_id}>"
