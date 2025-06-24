# TriviaApp 🎮

Aplicación de trivia desarrollada con [Angular CLI](https://github.com/angular/angular-cli) versión 20.0.0.

## 📖 Descripción

Esta aplicación permite seleccionar categorías de preguntas, configurar la trivia según preferencias personales y jugar contra reloj. Al finalizar, presenta resultados y estadísticas claras para evaluar tu desempeño.

## 📦 Estructura del Proyecto

El proyecto está compuesto por los siguientes componentes principales:

- `CategorySelectorComponent`: selección de categoría de preguntas.
- `GameSetupComponent`: configuración previa al juego (sonido, temporizador, dificultad, tipo de preguntas).
- `TriviaGameComponent`: ejecución del juego, muestra preguntas y controla lógica.
- `GameResultsComponent`: muestra resultados del juego una vez finalizado.

## 📌 Requisitos previos

- Node.js (versión recomendada: 20.19 o superior)
- Angular CLI versión 20

## ⚙️ Instalación del proyecto

Cloná el repositorio e instalá las dependencias con los siguientes comandos:

```bash
git clone [URL_REPO]
cd trivia-app-RIA2025
npm install
```

## 🚀 Desarrollo y ejecución

1. Iniciá un servidor de desarrollo local:

   ```bash
   ng serve
   ```

2. Abrí tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al guardar cambios en los archivos fuente.

## 🛠️ Construcción para despliegue

Para compilar el proyecto en modo producción:

```bash
ng build
```

Los artefactos generados se almacenan en `dist/`. Este build está optimizado para rendimiento.

## 🔧 Scaffolding de componentes

Podés generar nuevos componentes utilizando Angular CLI:

```bash
ng generate component NombreDelComponente
```

Para ver todas las opciones disponibles:

```bash
ng generate --help
```

## 🧪 Testing

### Tests unitarios

Para ejecutar los tests unitarios con [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Tests end-to-end (E2E)

Para pruebas de extremo a extremo:

```bash
ng e2e
```

ℹ️ Angular CLI no incluye framework E2E por defecto. Podés integrar herramientas como Cypress o Playwright si lo necesitás.

## 🧭 Flujo de la Aplicación

A continuación, se muestran imágenes del flujo típico dentro de la aplicación:

1. **Pantalla de selección de categoría**
   ![Selección de Categoría](./mockup/ss/category-selector.png)

2. **Configuración de trivia**
   ![Configuración de Juego](./mockup/ss/game-setting.png)

3. **Juego de trivia en ejecución**
   ![Juego en curso](./mockup/ss/trivia-game.png)

4. **Pantalla de resultados**
   ![Resultados del juego](./mockup/ss/game-results.png)

## 📂 Estructura detallada

```
├── src/
│   └── app/
│       ├── core/              # Lógica y modelos
│       ├── features/trivia/   # Pantallas principales
│       └── shared/components/ # Componentes UI reutilizables
└── mockup/                    # Referencias visuales
```

## 📚 Recursos adicionales

- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Angular Component Interaction](https://angular.io/guide/component-interaction)
- [Angular Routing & Navigation](https://angular.io/guide/router)

## 🧩 API de Trivia

Esta aplicación consume la [Open Trivia Database (OpenTDB)](https://opentdb.com/), que provee preguntas de trivia gratuitas clasificadas por categoría, dificultad y tipo. La comunicación con la API se realiza desde el servicio `TriviaService` a través de peticiones HTTP para obtener tokens de sesión y preguntas dinámicas.

### 📡 Servicios REST Utilizados

La aplicación consume los siguientes endpoints de la API de [OpenTDB](https://opentdb.com/):

| Endpoint                                 | Método | Descripción                                                                                         |
|------------------------------------------|--------|-----------------------------------------------------------------------------------------------------|
| `/api_category.php`                      | GET    | Recupera la lista de categorías disponibles.                                                        |
| `/api_token.php?command=request`         | GET    | Solicita un token de sesión para evitar repeticiones de preguntas.                                  |
| `/api.php?amount={n}`                    | GET    | Obtiene `{n}` preguntas aleatorias.                                                                 |
| `/api.php?amount={n}&category={id}`      | GET    | Obtiene `{n}` preguntas de la categoría con el identificador `{id}`.                                |
| `/api.php?amount={n}&difficulty={lvl}`   | GET    | Obtiene `{n}` preguntas de dificultad `easy` \| `medium` \| `hard`.                                 |
| `/api.php?amount={n}&type={type}`        | GET    | Obtiene `{n}` preguntas de tipo `multiple` \| `boolean`.                                            |
| `/api.php?...&token={token}`             | GET    | Incluye el token obtenido para sesiones sin repetir preguntas (`token` opcional pero recomendado). |

## 🖥️ Servidor de Desarrollo

Durante el desarrollo la aplicación se sirve con el **Live Development Server** de Angular, que corre sobre Node.js y utiliza `webpack-dev-server` para:

- Servir los ficheros en `http://localhost:4200/`
- Reconstruir y recargar automáticamente al detectar cambios
- Proporcionar HMR (Hot Module Replacement) para CSS y templates

Para producción, un `ng build` genera la carpeta `dist/trivia-app/` con archivos estáticos, lista para servir desde cualquier servidor web (por ejemplo, Node/Express, Nginx, Apache, Vercel, Firebase Hosting, etc.).

## Uso de `async` en `CategorySelectorComponent`

En el componente Angular `CategorySelectorComponent`, marcamos el método del ciclo de vida `ngOnInit` como `async` para poder utilizar `await` dentro de él y simplificar la gestión de respuestas asíncronas y errores. A continuación se explica paso a paso qué hace y por qué:

```ts
async ngOnInit(): Promise<void> {
  this.loading = true;
  this.errorMessage = null;

  try {
    // 1. lastValueFrom convierte el Observable en una Promise
    //    para poder usar await de forma nativa.
    const response = await lastValueFrom(this.triviaService.getCategories());

    // 2. Una vez resuelta la promesa, transformamos los datos
    this.categories = response.trivia_categories
      .map(c => ({ id: c.id, name: c.name }));
  } catch (err) {
    // 3. Cualquier error en la petición HTTP queda atrapado aquí
    console.error(err);
    this.errorMessage = 'No se pudieron cargar las categorías.';
  } finally {
    // 4. Se ejecuta siempre, haya éxito o fallo, para ocultar el spinner
    this.loading = false;
  }
}
```


---

## 🧪 Pruebas Unitarias Implementadas

1. **TimerComponent**  
   - Verifica emisión de ticks inicial (`tick.emit(duration)`).  
   - Comprueba decremento cada segundo y emisión de `finished` al llegar a 0.  
   - Asegura limpieza de intervalos en `ngOnDestroy()` con `clearInterval()`.

2. **TriviaGameComponent**  
   - Simulación de `TriviaService` (`getToken()`, `getQuestions()`) con `jasmine.createSpyObj`.  
   - Control de estados: `loading`, `errorMessage` y renderizado de spinner o mensajes de error.  
   - Envío de eventos `answer()` y `timerEnd()` al `GameControllerService` y reinicio del temporizador.

3. **CategorySelectorComponent**  
   - Conversión de `Observable` a `Promise` con `lastValueFrom()` y uso de `async/await` en `ngOnInit()`.  
   - Gestión de carga (`loading`), captura de errores (`errorMessage`) y parada del spinner en `finally`.  
   - Verificación de navegación y actualización de `SettingsService` al seleccionar categoría.

4. **GameSetupComponent**  
   - Pruebas de validación de formulario reactivo: marcas de campo obligatorio y estado de botón “Comenzar”.  
   - Simulación de selección de cantidad de preguntas y dificultad.

5. **GameResultsComponent**  
   - Cálculo de estadísticas: número de aciertos, fallos y porcentaje.  
   - Renderizado de resultados en la plantilla y prueba de formatos de salida.

---

### Herramientas Utilizadas

- **Angular TestBed**: configuración de módulo de pruebas.  
- **ComponentFixture**: manipulación del fixture para detección de cambios.  
- **fakeAsync / tick**: simulación de paso de tiempo en pruebas asíncronas.  
- **async / await**: pruebas de métodos marcados como `async`.  
- **jasmine.createSpyObj**: creación de stubs y espías para servicios.  
- **spyOn**: verificación de llamadas a métodos de servicios y router.  
- **lastValueFrom**: conversión de `Observable` a `Promise` para usar `await`.  
- **try/catch/finally**: manejo centralizado de errores y estados de carga.  
- **Jasmine**: framework de pruebas unitarias para definir y ejecutar specs.  
- **Karma**: test runner para ejecutar pruebas en navegadores.  
- **Angular CLI**: comandos `ng test` para compilar y correr tests automáticamente.  
- **Chrome Headless**: entorno de ejecución de pruebas en modo sin interfaz gráfica.  

---

## 🎲 Cómo jugar

Consulta el archivo [README-gameplay.md](README-gameplay.md) para obtener información detallada sobre cómo disfrutar al máximo del juego, reglas, y detalles para usuarios finales.
