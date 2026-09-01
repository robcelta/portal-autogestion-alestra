# Guia de Autoria de Componentes

Esta guia sirve para crear y mantener nuevos componentes HTML y CSS dentro de `alestra-rails-ui` en futuras versiones del gem.

## Objetivo

Cada componente nuevo debe:

- reutilizar los tokens visuales existentes
- seguir una convencion de nombres estable
- ser facil de copiar a una vista Rails del proyecto consumidor
- convivir bien con los layouts actuales del engine
- ser suficientemente claro para mantenerse sin depender de utilidades externas

## Archivos involucrados

Al agregar un componente nuevo, normalmente trabajaremos en estos archivos:

- `app/assets/stylesheets/alestra_rails_ui/tokens.css`
- `app/assets/stylesheets/alestra_rails_ui/components.css`
- `examples/components_snippets.html.erb`
- `README.md` si el componente necesita documentacion de uso publico

## Flujo recomendado

1. Define el objetivo del componente.
2. Determina si es un componente nuevo o una variante de uno existente.
3. Revisa si los tokens actuales cubren el caso.
4. Agrega el CSS en `components.css`.
5. Agrega un snippet minimo y claro en `examples/components_snippets.html.erb`.
6. Documenta su uso si es parte de la API publica del gem.
7. Valida que el nombre, estados y variantes sean consistentes con lo existente.

## Convencion de nombres

Usa siempre el prefijo `alestra-`.

Patrones recomendados:

- bloque: `alestra-card`
- elemento interno: `alestra-card__header`
- modificador: `alestra-card--compact`
- estado visual: `alestra-alert--success`

Evita:

- nombres genericos sin prefijo como `.card` o `.button`
- clases acopladas a una pantalla concreta si el componente es reusable
- nombres ligados a tecnologia interna del host

## Como decidir si crear un token nuevo

Antes de introducir una variable nueva en `tokens.css`, revisa si puedes reutilizar:

- colores semanticos existentes
- escalas de grises e indigo ya definidas
- radios y sombras ya disponibles

Crea un token nuevo solo cuando:

- el valor se repetira en varios componentes
- el valor representa una decision visual estable del sistema
- no existe una variable equivalente que mantenga coherencia

Si el valor solo se usa una vez y no representa una decision de sistema, mantenlo en el componente.

## Estructura recomendada de un componente

Ejemplo de patron:

```css
.alestra-banner {
  padding: 1rem 1.25rem;
  border-radius: var(--alestra-radius-xl);
  background: #fff;
  border: 1px solid var(--alestra-gray-200);
}

.alestra-banner--info {
  background: var(--alestra-indigo-50);
  color: var(--alestra-indigo-900);
}
```

Y su snippet de referencia:

```erb
<section class="alestra-banner alestra-banner--info">
  <strong>Informacion:</strong>
  <span>Contenido del banner.</span>
</section>
```

## Reglas para HTML de ejemplo

Los snippets del archivo `examples/components_snippets.html.erb` deben ser:

- cortos
- faciles de copiar
- semanticamente correctos
- utiles como referencia visual minima

Evita:

- logica Ruby innecesaria
- dependencias a rutas del proyecto local
- contenido acoplado a una app especifica
- wrappers excesivos que oculten la estructura real del componente

## Reglas para CSS

Cada componente nuevo debe:

- usar variables de `tokens.css` siempre que sea razonable
- evitar estilos inline en la documentacion salvo casos demostrativos
- incluir estados `:hover`, `:focus` o `:disabled` cuando aplique
- mantenerse desacoplado de Tailwind u otros frameworks de utilidades
- respetar contraste y legibilidad

Cuando agregues variantes, mantenlas agrupadas debajo del bloque principal.

## Accesibilidad minima

Antes de considerar listo un componente, revisa:

- contraste legible entre texto y fondo
- foco visible en elementos interactivos
- uso correcto de etiquetas HTML
- `role`, `type`, `aria-*` solo cuando realmente aporten semantica
- que el componente no dependa unicamente del color para comunicar estado

## Criterios para variantes

Crea una variante solo si cambia una intencion clara, por ejemplo:

- exito
- error
- advertencia
- secundario
- compacto

No crees variantes para diferencias triviales que puedan resolverse con composicion o contexto.

## Checklist antes de cerrar un componente nuevo

- el nombre sigue la convencion `alestra-*`
- el HTML de ejemplo existe en `examples/components_snippets.html.erb`
- el CSS esta en `components.css`
- los tokens usados existen y son coherentes
- los estados interactivos estan cubiertos si aplican
- el componente funciona visualmente dentro de los layouts actuales
- el componente es entendible por otra persona leyendo solo snippet + CSS
- el `README` fue actualizado si el componente forma parte del uso esperado del gem

## Cuando actualizar el README

Actualiza `README.md` cuando:

- el componente sea parte del uso comun del gem
- introduzca una nueva capacidad importante
- cambie la forma recomendada de integrar estilos o layouts

Si el componente es experimental o muy especifico, puede bastar con dejarlo documentado en snippets y en esta guia de trabajo.
