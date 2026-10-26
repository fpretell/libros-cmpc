Frontend ReactJS + TypeScript - Proyecto Dockerizado

Este proyecto frontend está desarrollado con ReactJS y TypeScript. Forma parte de una arquitectura desplegada con Docker Compose, por lo que no es necesario instalar dependencias ni correr localmente dentro de la carpeta frontend.

Cómo ejecutar

Se levanta todo con Docker Compose desde la raíz del proyecto:

bash
Copiar
Editar
docker-compose up --build
Esto construirá la imagen del frontend y levantará el contenedor con el servidor de desarrollo configurado.

Scripts disponibles dentro del contenedor

bash
Copiar
Editar
npm start       # Levanta el servidor de desarrollo (hot reload)
npm run build   # Genera la versión de producción
npm run test    # Ejecuta los tests
Variables de entorno

El frontend utiliza variables de entorno definidas en un archivo .env (en la raíz o en la carpeta frontend):

Ejemplo básico:

ini
Copiar
Editar
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
REACT_APP_API_VERSION=v1
PORT=3000
REACT_APP_DEFAULT_EMAIL=admin@example.com
REACT_APP_DEFAULT_PASSWORD=TuPassword123
Puertos

Internamente el servidor React corre en el puerto 3000.

En Docker Compose se puede mapear a cualquier puerto externo, por ejemplo 3001.

Acceso

Luego de levantar el servicio, el frontend será accesible en:

arduino
Copiar
Editar
http://localhost:3001
(o el puerto que hayas configurado)

Notas

No se necesita correr npm install ni otros comandos dentro de la carpeta local frontend.

Todo el manejo de dependencias y build se realiza dentro del contenedor Docker.

Para ejecutar comandos específicos o depurar, podés abrir consola en el contenedor frontend:

bash
Copiar
Editar
docker exec -it <nombre_contenedor_frontend> sh
Autor
