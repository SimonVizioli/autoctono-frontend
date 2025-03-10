# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder
WORKDIR /app

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Copiamos los archivos de configuración e instalamos dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiamos el resto del código y construimos la aplicación
COPY . .
RUN pnpm run build

# Etapa 2: Imagen de ejecución
FROM node:18-alpine AS runner
WORKDIR /app

# Instalamos pnpm globalmente en la imagen final
RUN npm install -g pnpm

# Copiamos los archivos de configuración e instalamos solo las dependencias de producción
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copiamos los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/dist ./dist

# Exponemos el puerto que utiliza vite preview (por defecto 5173)
EXPOSE 5173

# Ejecutamos el comando de preview para servir la aplicación
CMD ["pnpm", "run", "preview"]
