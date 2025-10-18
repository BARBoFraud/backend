# Instalación y configuración inicial de api oFraud

## Prerequisitos

- MySQL >= 8.0 en tu servidor de base de datos.
- Nodejs >= 24.7.0 en tu servidor del api.

1. Clona el repositorio

```bash
git clone https://github.com/BARBoFraud/backend ./<tu-carpeta>

```

2. Entra a la carpeta

```bash
cd ./<tu-carpeta>

```

## Configuración inicial del ambiente de base de datos.

1. Asegurate de tener MySQL corriendo
2. Abre una terminal y ejecuta el siguiente comando

```bash
mysql -u <tu-usuario> -p < ./database/schema.sql
```

3. Ingresa tu contraseña cuando MySQL la pida.

## Creación de ambiente de ejecución

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_PORT=3306
DB_HOST=<ip_del_servidor_de_base_de_datos>
DB_USER=<usuario_de_base_de_datos>
DB_PASSWORD="<contraseña_del_usuario>"
DB_NAME=ofraud

# JWT Configuration
JWT_SECRET=<genera_con_openssl_rand_-base64_32>
JWT_EXPIRES_ACCESS=<número><s|m|h>     # Ejemplo: 15m
JWT_EXPIRES_REFRESH=<número><s|m|h>    # Ejemplo: 7d

# API Configuration
BASE_URL=http://localhost:4000

# Default Admin User
DEFAULT_USER=<nombre_de_usuario_admin>
DEFAULT_PASSWORD=<contraseña_admin>
```

Usa un gestor de paquetes para instalar las dependencias del proyecto.

```bash
npm install
yarn install
pnpm install
bun install
```
