# 📚 Biblioteca - Sistema de Gestión

Proyecto fullstack para la gestión de libros. Incluye una API REST desarrollada con NestJS, un frontend en React y una base de datos PostgreSQL. Todo el entorno se puede levantar mediante Docker Compose.

## 🚀 Características principales

- Autenticación mediante JWT.
- Operaciones CRUD para libros, autores, editoriales, géneros e inventario.
- Exportación de datos en formato CSV.
- Soft delete (eliminación lógica).
- Logging y auditoría de operaciones.
- Arquitectura modular basada en principios **SOLID**.
- Transacciones para operaciones críticas.
- Gestión del esquema y de los cambios de base de datos mediante **Prisma Migrate**.
- Inicialización automática de la estructura y los datos iniciales mediante dos migraciones.
- Persistencia de datos mediante volúmenes de Docker.

## 🛠️ Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [React](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- JWT para autenticación.
- Bootstrap para la interfaz de usuario.

## 📂 Estructura del repositorio

```text
biblioteca-cmpc/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   │   ├── 0_init/
│   │   │   │   └── migration.sql
│   │   │   ├── 1_datos_iniciales/
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   ├── schema.prisma
│   │   ├── prisma.config.ts
│   │   └── prisma.config.docker.ts
│   ├── scripts/
│   └── src/
│       ├── libros/
│       ├── autores/
│       ├── editoriales/
│       ├── generos/
│       ├── inventario/
│       ├── auditoria/
│       └── auth/
├── frontend/
├── docker-compose.yml
└── README.md
```

## ⚙️ Instalación y ejecución

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- [Git](https://git-scm.com/)
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/) como complemento de Docker.

Comprueba que las herramientas estén disponibles:

```bash
git --version
docker --version
docker compose version
```

No necesitas instalar PostgreSQL ni Node.js en tu sistema para ejecutar la aplicación mediante Docker, siempre que todos los servicios estén configurados para ejecutarse dentro de sus contenedores.

### 1. Clonar el repositorio

```bash
git clone https://github.com/fpretell/biblioteca-cmpc.git
cd biblioteca-cmpc
```

Si ya tienes el repositorio clonado, entra en el directorio que contiene `docker-compose.yml`.

### 2. Configurar las variables de entorno del backend

Revisa si el repositorio contiene un archivo de ejemplo de variables de entorno. Si el proyecto requiere `backend/.env`, créalo con los valores correspondientes a tu configuración.

Ejemplo para desarrollo:

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=libros_user
DB_PASSWORD=libros_pass
DB_NAME=cmpc_libros

JWT_SECRET=libros_secret
JWT_EXPIRES_IN=2h

FRONTEND_URL=http://localhost:3001
```

**Importante:** estos valores son ejemplos. Deben coincidir con la configuración de `docker-compose.yml`, especialmente con las credenciales de PostgreSQL.

Dentro de la red de Docker, `db` es el nombre del servicio de PostgreSQL. Si ejecutas Prisma directamente desde Ubuntu, fuera de Docker, utiliza la configuración local correspondiente; en este proyecto, la conexión puede usar `localhost` y el puerto publicado `5434`.

No publiques archivos `.env` con credenciales reales ni secretos de producción.

### 3. Configurar las variables de entorno del frontend

Si el frontend necesita un archivo `frontend/.env`, créalo o adapta el archivo de ejemplo existente.

Ejemplo para desarrollo local:

```env
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
REACT_APP_API_VERSION=v1
PORT=3001
REACT_APP_DEFAULT_EMAIL=admin@example.com
REACT_APP_DEFAULT_PASSWORD=Libros2024@
```

La variable `REACT_APP_API_BASE_URL` debe apuntar a una dirección accesible desde el navegador. No uses `http://backend:3000` para las peticiones del navegador, porque `backend` es el nombre del servicio dentro de la red interna de Docker.

Las variables `REACT_APP_DEFAULT_EMAIL` y `REACT_APP_DEFAULT_PASSWORD` solo deben configurarse si la aplicación las utiliza. Las variables incluidas en el frontend pueden quedar expuestas al navegador; no almacenes secretos reales en ellas.

Verifica que los puertos y las variables coincidan con la configuración efectiva de `docker-compose.yml`.

### 4. Construir e iniciar los servicios

Desde la raíz del proyecto, donde se encuentra `docker-compose.yml`, ejecuta:

```bash
docker compose up --build -d
```

Este comando construye las imágenes necesarias e inicia los servicios definidos en Docker Compose.

Si el backend está configurado para ejecutar `prisma migrate deploy` antes de iniciar NestJS, las migraciones pendientes se aplicarán automáticamente.

### 5. Comprobar el estado de los servicios

Consulta el estado de los contenedores:

```bash
docker compose ps
```

Consulta los registros de todos los servicios:

```bash
docker compose logs -f
```

Para consultar únicamente los registros del backend:

```bash
docker compose logs -f backend
```

Espera a que PostgreSQL esté disponible, las migraciones finalicen correctamente y NestJS arranque sin errores.

### 6. Acceder a la aplicación

Si los puertos publicados coinciden con la configuración del proyecto, podrás acceder a:

- **Frontend:** http://localhost:3001
- **API REST:** http://localhost:3000/api/v1
- **Swagger:** http://localhost:3000/api/v1/docs

Si alguno de los servicios no responde, revisa `docker compose ps`, los registros y los puertos publicados en `docker-compose.yml`.

## 🗃️ Base de datos y migraciones

La estructura y los datos iniciales de PostgreSQL se gestionan mediante **Prisma Migrate**.

El proyecto utiliza dos migraciones:

| Migración | Responsabilidad |
|---|---|
| `0_init` | Crea las tablas, claves primarias, claves foráneas e índices definidos en el SQL de la migración. |
| `1_datos_iniciales` | Inserta los datos iniciales definidos en la migración, como usuarios, autores, editoriales, géneros, libros e inventario, según su contenido. |

El backend ejecuta `prisma migrate deploy` antes de iniciar NestJS, de acuerdo con la configuración de Docker Compose. Prisma aplica las migraciones pendientes registradas en el proyecto.

No es necesario disponer de `db/init.sql` para inicializar una instalación nueva si las migraciones contienen toda la estructura y los datos necesarios.

La carpeta `backend/prisma/migrations/` debe conservarse en el repositorio para que la base de datos pueda reconstruirse de forma reproducible.

### Diferencia entre Prisma ORM y Prisma Migrate

- **Prisma ORM:** permite consultar y modificar los datos desde el código TypeScript mediante el cliente de Prisma.
- **Prisma Migrate:** administra los cambios de estructura de la base de datos mediante migraciones SQL versionadas.

### Comandos de Prisma

Si necesitas ejecutar comandos manualmente, entra en el directorio del backend:

```bash
cd backend
```

Comprueba el estado de las migraciones:

```bash
npx prisma migrate status
```

Valida el esquema:

```bash
npx prisma validate
```

Aplica las migraciones pendientes:

```bash
npx prisma migrate deploy
```

Estos comandos requieren que las dependencias estén instaladas y que la configuración de Prisma apunte a una base de datos accesible.

Cuando ejecutes Prisma desde Ubuntu, utiliza la configuración local correspondiente. Dentro de Docker, el backend utiliza `prisma.config.docker.ts` si así está establecido en el comando de arranque.

### Reiniciar la base de datos desde cero

**⚠️ Advertencia:** este procedimiento elimina los volúmenes del proyecto y puede borrar permanentemente los datos persistidos de PostgreSQL. Úsalo solo si deseas reconstruir la base de datos desde cero y no necesitas conservar los datos existentes. Haz una copia de seguridad antes de continuar si existe información importante.

Desde la raíz del proyecto:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

Este procedimiento elimina los volúmenes asociados al proyecto, reconstruye las imágenes y vuelve a iniciar los servicios. Si las migraciones están correctamente configuradas, se aplicarán sobre la base de datos recién creada.

**Para reiniciar los contenedores sin eliminar los datos de PostgreSQL:**

```bash
docker compose down
docker compose up -d
```

No uses `down -v` como procedimiento habitual de reinicio.

## 🔗 Accesos principales

- **API Backend:** http://localhost:3000/api/v1
- **Swagger:** http://localhost:3000/api/v1/docs
- **Frontend:** http://localhost:3001

Estas direcciones corresponden al entorno local esperado. Si cambias los puertos publicados en Docker Compose, actualiza también las direcciones utilizadas por el frontend.

## 👤 Usuario de prueba

Si la migración `1_datos_iniciales` crea el siguiente usuario y las credenciales coinciden con la configuración de autenticación, podrás utilizarlas para probar el inicio de sesión:

```json
{
  "email": "admin@example.com",
  "password": "Libros2024@"
}
```

Si no funcionan, revisa los registros de `backend/prisma/migrations/1_datos_iniciales/migration.sql` y verifica cómo el backend valida las contraseñas.

## 🧩 Frontend

### Tecnologías

- React y TypeScript.
- React Router.
- React Hook Form.
- Bootstrap.

### Scripts disponibles

Ejecuta los siguientes comandos desde `frontend/`:

```bash
npm start       # Inicia el servidor de desarrollo
npm run build   # Genera la compilación de producción
npm test        # Ejecuta los tests
```

### Docker Compose

El servicio frontend se construye a partir de `./frontend`. La configuración de puertos, volúmenes, variables de entorno y dependencias se define en el archivo raíz `docker-compose.yml`.

## 🔧 Scripts del backend

Ejecuta los siguientes comandos desde `backend/`:

```bash
npm run start:dev   # Inicia NestJS en modo desarrollo
npm run build       # Compila el backend
npm run test        # Ejecuta los tests
```

Estos comandos requieren que las dependencias del backend estén instaladas. Si trabajas desde Docker, puedes consultar los registros del contenedor para verificar el arranque de la aplicación.

## 🔐 Autenticación

La autenticación utiliza JWT. Después de iniciar sesión, el backend devuelve un token que debe enviarse en las peticiones protegidas mediante el encabezado HTTP:

```http
Authorization: Bearer <token>
```

El token debe incluirse en las solicitudes a los endpoints que requieren autenticación.

## 🔍 Endpoints principales

La documentación interactiva de Swagger está disponible en:

http://localhost:3000/api/v1/docs

La API incluye endpoints para:

- Libros.
- Autores.
- Editoriales.
- Géneros.
- Inventario.
- Auditoría.
- Autenticación (`login`, `register`).

Los endpoints, sus métodos HTTP y sus requisitos de autenticación están definidos en la implementación de la API y documentados en Swagger.

## 🧭 Próximas mejoras

- Roles de usuario y permisos.
- CI/CD con GitHub Actions.
- Mejoras de cobertura de pruebas.
- Despliegue automatizado en un entorno de producción.

## 🌐 Autor

**Félix Pretell**

[LinkedIn](https://www.linkedin.com/in/felix-pretell/)

## ❤️ Licencia

Este proyecto está bajo la licencia MIT.