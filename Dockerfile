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

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Copiamos los archivos de configuración e instalamos todas las dependencias (incluyendo devDependencies)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiamos los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/dist ./dist

# Exponemos el puerto que utiliza vite preview (por defecto 4173)
EXPOSE 4173

# Ejecutamos el comando de preview para servir la aplicación
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0"]


