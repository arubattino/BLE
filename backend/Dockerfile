FROM python:3.12-slim
WORKDIR /app

# libs bluetooth
RUN apt-get update && apt-get install -y --no-install-recommends \
        bluez dbus libglib2.0-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
CMD ["sh", "-c", "gunicorn -k uvicorn.workers.UvicornWorker --workers 3 --bind 0.0.0.0:${BACKEND_PORT:-5000} app:app"]