FROM node:20-alpine

ENV CI=1
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /home/user

# Copy compile script
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# 1️⃣ Create project skeleton (small layer)
RUN npx create-next-app@latest myapp \
    --yes \
    --ts=false \
    --tailwind \
    --eslint \
    --app \
    --no-src-dir \
    --import-alias "@/*" \
    --use-npm \
    --no-git

WORKDIR /home/user/myapp

# 2️⃣ Clean heavy caches immediately
RUN npm cache clean --force \
 && rm -rf /root/.npm \
 && rm -rf /root/.npx

# 3️⃣ Remove unnecessary files
RUN find node_modules -name "*.md" -delete \
 && find node_modules -name "*.map" -delete \
 && find node_modules -type d -name "test" -exec rm -rf {} +

WORKDIR /home/user