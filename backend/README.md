Backend NestJS - Proyecto Dockerizado

Este proyecto es el backend desarrollado con NestJS. Forma parte de una arquitectura desplegada mediante Docker Compose, por lo que no requiere instalación local manual de dependencias ni compilación desde la carpeta backend.

Cómo ejecutar

Todo se maneja a través de Docker Compose desde la raíz del proyecto:

docker-compose up --build

Esto hará:

Construir la imagen del backend.

Levantar el contenedor con todas las dependencias instaladas.

Ejecutar el backend en modo desarrollo (hot reload activado).

Scripts disponibles

Dentro del contenedor (si necesitás ejecutar comandos):

npm run start:dev # Levanta el servidor en modo desarrollo
npm run build # Compila el proyecto
npm run start:prod # Ejecuta la versión compilada en producción
npm run test # Ejecuta tests

Variables de entorno

Se gestionan desde un archivo .env en la raíz o en la configuración de Docker Compose.

Ejemplo básico:

DB_HOST=db
DB_PORT=5432
DB_USERNAME=usuario
DB_PASSWORD=contraseña
DB_NAME=nombre_db
JWT_SECRET=secreto_jwt
JWT_EXPIRES_IN=2h

Documentación

Si está configurado Swagger, se podrá acceder vía:

http://localhost:3000/api/v1/docs

Autenticación

Autenticación con JWT. Los tokens deben enviarse en los headers:

Authorization: Bearer <token>

Notas

No es necesario instalar dependencias manualmente en backend/.

Toda la instalación y compilación se realiza dentro del contenedor.

Para depurar o ejecutar comandos específicos, podés abrir una consola en el contenedor backend:

docker exec -it <nombre_contenedor_backend> bash


