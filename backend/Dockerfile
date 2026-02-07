FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Railway uses PORT environment variable
ENV PORT=8000

# Run the application - Railway sets $PORT automatically
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
