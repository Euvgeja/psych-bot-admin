FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=
ARG VITE_ADMIN_USER=admin
ARG VITE_ADMIN_PASSWORD=changeme
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ADMIN_USER=$VITE_ADMIN_USER
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
