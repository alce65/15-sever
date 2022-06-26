# Http Server with Node

## Objetivo

-   Configurar un proyecto npm con [**Node**](https://nodejs.org/en/), [**Typescript**](https://www.typescriptlang.org/), [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/), [**EditorConfig**](https://editorconfig.org/) y [**Jest**](https://jestjs.io/)

    -   Para todos los casos se emplearán **módulos nativos de ES6**
        -   package.json define `type="module"`
    -   ESLint utiliza
        -   un plugin, eslint-plugin-import, para configurar ES Modules
        -   el conjunto de reglas "eslint:recommended"
        -   el plugin y las reglas para prettier
        -   el plugin con el parser de Typescript
    -   Typescript define en tsconfig
        -   `"target"` y `"module"`: `"ESNext"`
        -   `"moduleResolution"`: `"node"`
        -   `"rootDir"`: `"./src"` y `"outDir"`: `"./dist"`
    -   Jest
        -   Jest utiliza un plugin de Babel para configurar ES Modules
        -   Define el `roots`: `<rootDir>/dist/` para testear directamente el JS compilado
        -   En el `env` de ESLint se define `jest` como true

-   Definir los **comandos de npm** necesarios para

    -   compilar
    -   ejecutar, utilizando **Nodemon**
    -   testear. En este caso, la estrategia empleada es compilar primero y testear el resultado en JS

-   Crear un primer **servidor http** en Node utilizando httpCreateserver()

    -   Entender como se genera el **objeto server** con funcionalidades tanto a nivel de JS como de Node

        -   Node abre en el componente Network del SO un _socket_ con un determinado puerto a al escucha de peticiones (_request_) del protocolo http
        -   El _lisener_ ligado a este _socket_ recibe una función _callback_ con dos parámetros
        -   En respuesta a cada _request_, Node completa el _callback_, pasandole como argumentos los objetos
            -   _request_ (información de la petición ya procesada: url, method, headers...)
            -   _response_ (conjunto de métodos capaces de crear y enviar una respuesta)
        -   El callback pasa a la cola (_queue_) de I/O de JS hasta que puede ser procesada por el _even loop_ y ejecutada en el contexto de JS

    -   Inicialmente, la lógica del _callback_ del servidor es mínima, limitándose a enviar un "hola mundo" con un mínimo de HTML utilizando `res.end()`

-   Definir **variables de entorno** validas para la línea de comandos de cualquier sistema operativo, usando **cross-env**

    -   Acceder a esas variables en Node `process.env`

-   En una segunda versión del **servidor**, se recibe en la url el nombre de un fichero, se parsea para obtener el path utilizando _url.parse_, se lee su contenido utilizando el _fs/promises_ y se envía su contenido

    -   Se utilizan los métodos
        -   `res.setHeaders()`
        -   `res.end()`
        -   `res.send()` (combination of `res.write`, `res.setHeaders` and `res.end`). It set _ETag HTTP response header_, an identifier for a specific version of a resource that allows caches to be more efficient.

-   Gestionar los **errores del servidor** a dos niveles:

    -   En la lectura de ficheros, utilizando un **try / catch**. Para el caso de error
        -   se completa la información del `objeto error` (es necesario extender su interface)
        -   se genera un evento 'error' con `err` y `resp` como payload
    -   En el servidor, mediante el **método on**, se define la respuesta al evento 'error'
        -   se envia una respuesta http (`resp.end`) al usuario con la info extra
        -   se envia el `err.message` a la consola

-   Crear un test mínimo, que compruebe que se instancia el servidor, para comprobar que el **entorno de testing** está configurado correctamente

-   Instalar y presentar la librería de Node **inquirer** que permite gestionar la entrada de datos desde la línea de comandos

    -   el promp depende del type definido para cada objeto en el array de mensajes:
        -   input, number, confirm, password, list, checkbox
    -   `inquirer.prompt()` devuelve una Promise<iInquirerAnswers>
    -   se pueden crear funciones para el promp, volverlas a llamar si los daots no validan e incorporar estructuras condicionales para diferentes situaciones

-   Utilizar **inquirer** para crear scrips que permitan la entrada de datos para configurar el servidor http desde la línea de comandos

    -   La Promise<iInquirerAnswers> devuelta permite recoger los datos proporcionados por el usuario desde la aplicación Node

## Dependencias

-   _ESLint_
    -   `eslint`
    -   (eslint-config-airbnb-base)
    -   `eslint-plugin-import`
    -   `eslint-config-prettier`
-   _Jest_
    -   `jest` / `@types/jest`
    -   `@babel/plugin-transform-modules-commonjs`
-   _Typescript_
    -   `typescript`
    -   `@typescript-eslint/eslint-plugin`
    -   `@typescript-eslint/parser`
-   _Node_
    -   `@types/node`
    -   `nodemon`
    -   `cross-env`
    -   `inquirer` / `@types/inquirer`

## Instalación y uso

-   Clonar el repo y ejecutar `npm i`
-   Iniciar el compilador con `npm run start:ts`
-   Iniciar el servidor con `npm run start:build`
-   En su caso, lanzar los tests con `npm test`

> Pendiente: configurar en npm el uso de varios comandos en paralelo con npm-run-all o Concurrently
