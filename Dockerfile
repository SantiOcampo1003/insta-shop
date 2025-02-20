# Usa Node.js con Alpine para menor tamaño
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos esenciales del proyecto
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY .env ./
COPY config ./config


# Define el entorno de producción
ENV NODE_ENV=production

# Instala dependencias de producción
RUN npm install --production --quiet

# Instala TypeScript y dependencias necesarias
RUN npm install typescript ts-node @strapi/typescript-utils --quiet

# Copia el resto del código fuente
COPY . .

# Asegurar permisos adecuados para carpetas que Strapi necesita modificar
RUN chmod 777 /usr/src/app/node_modules
RUN chmod 777 /usr/src/app/public/uploads
RUN chmod 777 /usr/src/app

# Compila el código TypeScript a JavaScript
RUN npm run build

# Configurar la aplicación para escuchar en el puerto correcto
ENV HOST=0.0.0.0
ENV PORT=8080

# Expone los puertos necesarios
EXPOSE 8080
EXPOSE 5432

# Cambia de usuario para mayor seguridad
USER 1000

# Comando para arrancar la aplicación en producción
CMD ["npm", "start"]
