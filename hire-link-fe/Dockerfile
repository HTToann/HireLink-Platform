FROM node:18 AS build
WORKDIR /app

COPY ./hire-link/package*.json ./
RUN npm install --legacy-peer-deps

COPY ./hire-link ./          
COPY ./hire-link/.env.production .env.production

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# copy file nginx.conf vào container
COPY ./hire-link/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]