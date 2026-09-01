# Guia para disenar nuevos elementos visuales

Este documento resume lo que necesita saber una persona de diseno para agregar o proponer nuevos componentes graficos dentro de `alestra-rails-ui`.

## Que es este proyecto

`alestra-rails-ui` es una gema Rails que entrega una capa visual reutilizable para aplicaciones Rails 8 con Hotwire. Incluye:

- tokens de diseno en CSS
- componentes base
- layouts de aplicacion, autenticacion, impresion y mailers
- ejemplos HTML copiables
- un controlador Stimulus para interacciones simples

## Archivos que debe revisar primero

- `app/assets/stylesheets/alestra_rails_ui/tokens.css`: colores, radios, sombras y valores visuales base.
- `app/assets/stylesheets/alestra_rails_ui/components.css`: clases CSS de los componentes actuales.
- `examples/components_snippets.html.erb`: HTML minimo de ejemplo para cada componente.
- `docs/component-authoring-guide.md`: reglas tecnicas para crear componentes nuevos.
- `README.md`: uso publico del gem desde una aplicacion Rails.

## Como pensar los tokens de diseno

Los tokens de diseno son variables CSS que centralizan decisiones visuales del sistema. Por ejemplo:

```css
--alestra-color-primary
--alestra-color-text
--alestra-color-muted
--alestra-radius-lg
--alestra-shadow-sm
```

Cuando se disene un componente nuevo, conviene usar esos tokens antes de inventar colores, sombras o radios nuevos. Si hace falta un nuevo valor, debe representar una decision visual estable y reutilizable, no un ajuste aislado.

## Componentes actuales

El gem ya incluye estilos para:

- titulos de pagina
- tarjetas
- botones primarios y secundarios
- badges informativos, de exito y aviso
- alertas de error y exito
- campos de formulario basicos
- avatar con gradiente
- estructura base de layout
- pantalla de login Devise

## Como agregar un componente nuevo

1. Definir el objetivo del componente y en que pantallas se usaria.
2. Revisar si ya existe un componente parecido.
3. Revisar `tokens.css` para reutilizar colores, radios y sombras.
4. Agregar las clases en `components.css`.
5. Agregar un ejemplo minimo en `examples/components_snippets.html.erb`.
6. Si el componente sera parte del uso comun del gem, documentarlo en `README.md`.

## Convenciones de nombres

Usar siempre el prefijo `alestra-`.

Ejemplos recomendados:

```text
alestra-card
alestra-card__header
alestra-card--compact
alestra-alert--success
```

Evitar nombres genericos como:

```text
card
button
box
container
```

## Criterios visuales importantes

- Mantener contraste legible.
- Incluir estados `hover`, `focus` y `disabled` cuando el componente sea interactivo.
- No depender solo del color para comunicar estados importantes.
- Evitar estilos inline en ejemplos, salvo cuando sean solo medidas demostrativas.
- Mantener el componente desacoplado de Tailwind u otros frameworks externos.
- Pensar cada componente como algo reutilizable en distintas aplicaciones Rails.

## Que entregar al terminar un componente

Para cada componente nuevo, entregar:

- CSS en `components.css`.
- HTML minimo en `examples/components_snippets.html.erb`.
- Nota breve de uso si requiere contexto.
- Tokens nuevos en `tokens.css` solo si realmente son reutilizables.
- Captura o referencia visual si hubo diseno previo en Figma, imagen o mockup.

## Que no modificar sin avisar

- No cambiar nombres de clases existentes sin coordinarlo, porque podria romper aplicaciones que ya usan el gem.
- No borrar tokens existentes aunque parezcan no usarse.
- No cambiar layouts Rails si solo se esta agregando un componente visual.
- No incluir assets pesados o imagenes finales sin confirmar el formato esperado.

## Entregable recomendado para colaboracion

Para colaborar, usar el codigo fuente comprimido, no el archivo `.gem`. El `.gem` sirve para instalar una version empaquetada; el codigo fuente sirve para editar componentes.

El paquete de trabajo recomendado excluye:

- `alestra-rails-ui-0.1.0.gem`
- `pkgcheck/`
- archivos temporales o de sistema

