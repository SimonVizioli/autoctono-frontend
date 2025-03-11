# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder
WORKDIR /app

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Copiamos los archivos de configuración e instalamos dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiamos el resto del código
COPY . .

# Inyectamos variables de entorno al build de Vite
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Ejecutamos el build asegurándonos de que use la variable
RUN pnpm run build

# Etapa 2: Imagen de ejecución
FROM node:18-alpine AS runner
WORKDIR /app

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Copiamos los archivos de configuración e instalamos todas las dependencias (incluyendo devDependencies)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiamos los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/dist ./dist

# Exponemos el puerto que utiliza vite preview (por defecto 4173)
EXPOSE 4173

# Aseguramos que las variables sigan disponibles en el entorno de ejecución
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Ejecutamos el comando de preview para servir la aplicación
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0"]
