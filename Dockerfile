FROM node:22-bookworm-slim

# Chromium y fuentes para generar certificados; compilador para sqlite3.
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium fonts-liberation ca-certificates python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app
COPY package*.json ./
# El adaptador existente declara Cloudinary v1 como peer, pero el proyecto usa v2.
RUN npm install --omit=dev --legacy-peer-deps && npm cache clean --force
COPY --chown=node:node . .

ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["node", "app.js"]
