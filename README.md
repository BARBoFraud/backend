# Instalación y configuración inicial de api oFraud

## Prerequisitos

- MySQL >= 8.0 en tu servidor de base de datos.
- Nodejs >= 18.0.0 en tu servidor del api.

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/BARBoFraud/backend ./<tu-carpeta>

```

2. Entra a la carpeta

```bash
cd <tu-carpeta>

```

## Configuración inicial del ambiente de base de datos.

1. Asegurate de tener MySQL corriendo
2. Abre una terminal y ejecuta el siguiente comando

```bash
 mysql -h <ip-del-servidor-db> -P 3306 -u <usuario> -p < ./database/schema.sql
```

> [!NOTE]
> El archivo de schema.sql se encuentra en el repositorio, no tienes que descargarlo de ningún otro lado.

3. Ingresa tu contraseña cuando MySQL la pida.

## Creación de ambiente de ejecución

Copia y configura el archivo `.env.example` usando los siguientes comandos:

```bash
cp .env.example .env
vi .env
```

Instala las dependencias del proyecto.

```bash
# Instala las dependencias con tu gestor preferido
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

Asegurate de agregar la ip de tu servidor web en los cors del archivo main.ts

```typescript
app.enableCors({
    origin: ['http://<ip-del-servidor-web>:3000']
});
```

## Ejecución del codigo

Para iniciar la ejecución del codigo sigue los siguientes pasos:

Ejecuta estos comandos en tu terminal

```bash
# Usa tu gestor preferido
npm run build
# o
yarn run build
# o
pnpm run build
# o
bun run build
```

```bash
# Inicia la api
node dist/main.js
```

## Verificación de la Instalación

Para probar el estado del servidor, puedes ejecutar el siguiente comando:

```bash
curl http://<ip-del-servidor-api>:4000/v1/status/list
```

Y deberias de ver un output parecido a este:

```json
[
    { "id": 2, "name": "Aceptado" },
    { "id": 1, "name": "Pendiente" },
    { "id": 3, "name": "Rechazado" }
]
```

## Problemas de conexion a servidor SQL remoto.

- Asegurate de que tu usuario de MySQL pueda aceptar conexiones de IP's externas.

```sql
CREATE USER 'tu_usuario'@'%' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'tu_usuario'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

En el archivo mysqld.cnf (por lo general en /etc/mysql/mysql.conf.d/)
Cambia la linea

```bash
bind-address = 127.0.0.1
```

Por

```bash
bind-address = 0.0.0.0
```

Y reinicia tu servicio de mysql

- Abre el puerto de mysql en tu host.

```bash
sudo ufw allow 3306/tcp
```

## Recomendaciones finales

1. No subas el archivo .env a tu repositorio remoto.
2. No uses el usuario root para manejar la base de datos.
3. Usa contraseñas seguras, puedes generarlas con keepass o algun otro gestor de contraseñas.
