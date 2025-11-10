# --- ETAPA 1: "Build" (Construcción) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Asumo que tu carpeta de salida es 'dist' (común en Vite)
RUN npm run build

# --- ETAPA 2: "Serve" (Servidor final) ---
FROM nginx:1.25-alpine

# Copia los archivos estáticos de React/Vite (dist o build)
COPY --from=builder /app/dist /usr/share/nginx/html

# --- AÑADE ESTA LÍNEA ---
# Sobrescribe la configuración por defecto de Nginx con la nuestra
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]