FROM node:18 AS build
WORKDIR /app

# 1. Copy package files và cài
COPY ./hire-link/package*.json ./
RUN npm install --legacy-peer-deps

# 2. Copy toàn bộ source code
COPY ./hire-link ./          

# 3. Copy file env production (nếu cần override lại)
COPY ./hire-link/.env.production .env.production

# 4. Build
RUN npm run build

# 5. Serve bằng nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
