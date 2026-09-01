# Alestra Rails UI

`alestra-rails-ui` es una gema para reutilizar una capa de UI en aplicaciones **Rails 8** con **Hotwire**. Incluye tokens CSS, componentes base, layouts listos para usar y un controlador Stimulus namespaced para interacciones sencillas.

## Requisitos

- Ruby `>= 3.2`
- Rails `~> 8.0`
- `importmap-rails`
- `stimulus-rails`
- `turbo-rails`

## Que incluye

- Estilos base en `app/assets/stylesheets/alestra_rails_ui/`
- Layouts para aplicacion, autenticacion, impresion y mailers
- Controlador Stimulus `alestra--ui`
- Generador de instalacion
- Tareas rake informativas para inspeccionar layouts y rutas del engine

## Instalacion

Agrega la gema al `Gemfile` de tu aplicacion:

```ruby
gem "alestra-rails-ui"
```

Instala dependencias:

```bash
bundle install
```

Opcionalmente ejecuta el generador para crear un inicializador de referencia:

```bash
bin/rails generate alestra_rails_ui:install
```

## Uso de layouts

La gema expone estos layouts:

- `alestra_rails_ui/application`
- `alestra_rails_ui/devise`
- `alestra_rails_ui/print`
- `alestra_rails_ui/mailer`

Ejemplo en `ApplicationController`:

```ruby
class ApplicationController < ActionController::Base
  layout "alestra_rails_ui/application"
end
```

Ejemplo para mailers:

```ruby
class ApplicationMailer < ActionMailer::Base
  layout "alestra_rails_ui/mailer"
end
```

## Carga de estilos

Los estilos del engine pueden cargarse con `stylesheet_link_tag`:

```erb
<%= stylesheet_link_tag \
  "alestra_rails_ui/tokens",
  "alestra_rails_ui/components",
  "alestra_rails_ui/print",
  "data-turbo-track": "reload" %>
```

## Hotwire e importmap

El engine agrega automaticamente su `config/importmap.rb` al host, por lo que los controladores Stimulus incluidos por la gema quedan disponibles junto con los de la aplicacion.

La integracion asume una aplicacion Rails 8 que usa **importmap + Stimulus**. Si tu proyecto usa otro pipeline JavaScript, debes cargar el controlador de forma equivalente en tu stack.

## Controlador Stimulus incluido

La gema incluye el controlador `alestra--ui`, pensado para interacciones simples como descartar alertas:

```erb
<div data-controller="alestra--ui">
  <div
    data-alestra--ui-target="dismissible"
    class="alestra-alert alestra-alert--success"
  >
    Cambios guardados correctamente.
    <button type="button" data-action="click->alestra--ui#dismiss">
      Cerrar
    </button>
  </div>
</div>
```

## Referencias de componentes

Si necesitas entender como usar los componentes incluidos, hay tres fuentes principales dentro del gem:

- `examples/components_snippets.html.erb`: ejemplos de marcado HTML listos para copiar y adaptar en vistas Rails
- `app/assets/stylesheets/alestra_rails_ui/components.css`: definicion de las clases CSS de cada componente
- `app/assets/stylesheets/alestra_rails_ui/tokens.css`: variables de color, radios, sombras y tokens base usados por todos los componentes

La forma recomendada de leerlos es esta:

1. Abre `examples/components_snippets.html.erb` para identificar el HTML minimo del componente que quieres usar.
2. Busca las clases de ese snippet en `components.css` para ver variantes, estados y reglas visuales.
3. Revisa `tokens.css` cuando necesites entender de donde salen colores, espaciados, bordes o sombras.

Ejemplos actuales disponibles en el archivo de snippets:

- tarjeta con `alestra-card`
- botones `alestra-btn-primary` y `alestra-btn-secondary`
- badges con modificadores como `alestra-badge--info`
- alertas con modificadores como `alestra-alert--error`
- formulario basico con `alestra-form-group`, `alestra-label` y `alestra-input`
- avatar con gradiente usando `alestra-avatar-gradient`

Los snippets estan pensados como referencia de uso y no como vistas que deban renderizarse directamente desde el engine.

## Slots disponibles en el layout principal

El layout `alestra_rails_ui/application` contempla estos bloques opcionales:

- `content_for :title`
- `content_for :head`
- `content_for :styles`
- `content_for :brand`
- `content_for :app_name`
- `content_for :nav`
- `content_for :footer`
- `content_for :scripts`

Tambien renderiza `alert` y `notice` cuando estan presentes.

## Tareas rake

Desde una aplicacion que tenga cargada la gema puedes ejecutar:

```bash
bin/rails alestra_rails_ui:info
bin/rails alestra_rails_ui:layouts
```

## Consideraciones de integracion

- La gema esta orientada a proyectos Rails 8 con Hotwire.
- Los assets CSS se distribuyen desde el engine y deben estar incluidos en el layout que use tu aplicacion.
- Los textos por defecto de algunos layouts estan en espanol y pueden sobrescribirse con `content_for`.

## Desarrollo y validacion

La estrategia de pruebas y los comandos locales estan documentados en [TESTING.md](TESTING.md).

Los componentes interactivos incluidos cubren navegación responsive, notificaciones, filtros, tabs accesibles, selección de planes/productos, modales, tooltips, acordeones y controles de formulario.

Para validar el empaquetado del gem:

```bash
gem build alestra-rails-ui.gemspec
```

Para validar integracion real, lo recomendable es usar una aplicacion dummy o una app Rails de prueba que consuma la gema e inspeccionar:

- carga del engine
- disponibilidad de layouts
- carga de assets
- funcionamiento del controlador Stimulus

## Extender el gem con nuevos componentes

Si vas a agregar mas HTML y CSS para nuevas versiones del gem, consulta la guia de autoria en `docs/component-authoring-guide.md`.

Esa guia cubre:

- como definir un componente nuevo siguiendo la convencion `alestra-*`
- donde agregar el HTML de referencia y donde escribir el CSS
- cuando reutilizar tokens existentes y cuando crear nuevos
- criterios de variantes, estados y accesibilidad
- checklist de validacion antes de publicar una nueva version

## Licencia

MIT. Consulta `MIT-LICENSE`.
