FROM python:3.12-slim

# Prevent Python bytecode & buffering
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Create a directory for Gunicorn runtime files (prevents /app/gunicorn.ctl errors)
RUN mkdir -p /tmp/gunicorn

# Use Gunicorn without control server writing to bind-mounted folder
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--pid", "/tmp/gunicorn/gunicorn.pid"]