# cryptocurrencies-monitor

## Caracteristicas

cryptocurrencies-monitor es una API Rest para obtener informacion sobre criptomonedas,
funcionando como wrapper de CoinGecko.

Incluye servicios de creación y autenticación de usuarios.

## Tecnologías

Para el desarrollo de la API se utilizó:

- Javascript
- NodeJS
- Express
- MongoDB
- API CoinGecko
- Algunas dependencias de npm

## Clonando el proyecto en tu local

      git clone

## Levantar el proyecto

- Acceder a la carpeta del proyecto


    cd cryptocurrencies-monitor

- Instalar las dependencias


    npm install


- Configuración de variables de entorno

  - Renombrar el archivo .env.example a .env 
  - Modificar los valores de ejemplo por los de su ambiente local.
  - Listado de variables de entorno:

Nombre  | Descripcion| Config de ejemplo |
------- | -------------| --------------|
NODE_ENV  | Entorno en NodeJS | development|
API_PORT  | Puerto de la API  | 3000 |
API_HOST |  Host donde está alojada la API |http://localhost:3000 |
MONGO_URI  | Usada para la conexion a MongoDB | mongodb://127.0.0.1:27017/cryptocurrencies |
JWT_SECRET | Palabra secreta para generar el JWT   |qweerytuytuytutu |
JWT_LOGIN_EXPIRED_IN  | Tiempo de expiracion de JWT | 1d|
COINGECKO_URL  | API de CoinGecko | https://api.coingecko.com/api/v3 |


- Correr el proyecto


    npm start

## Correr los test

    npm run test

## Documentacion

- Documentación desarrollada con Postman.

Para acceder: 

https://documenter.getpostman.com/view/9263444/UUxtEqW9#007d3a9f-68e8-4d7f-9ba6-29cb74b4503e

Collection para importar desde Postman:

https://www.getpostman.com/collections/601e9f5a4857465f8768



