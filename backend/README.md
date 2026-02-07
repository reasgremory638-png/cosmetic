# Cosmatic E-commerce Backend API

FastAPI backend for the Cosmatic cosmetics e-commerce platform.

## Quick Start

### With Docker (Recommended)

```bash
cd backend
docker-compose up -d
```

API will be available at: http://localhost:8000
Swagger docs: http://localhost:8000/docs

### Without Docker

1. Install Python 3.11+
2. Create virtual environment:

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Setup PostgreSQL database and update `.env`

5. Run the server:

```bash
uvicorn app.main:app --reload
```

## API Endpoints

| Route           | Description     |
| --------------- | --------------- |
| `/api/auth`     | Authentication  |
| `/api/products` | Products CRUD   |
| `/api/cart`     | Cart management |
| `/api/orders`   | Orders/Checkout |
| `/api/wishlist` | Wishlist        |
| `/api/admin`    | Admin panel     |

## Environment Variables

Copy `.env.example` to `.env` and update values.
