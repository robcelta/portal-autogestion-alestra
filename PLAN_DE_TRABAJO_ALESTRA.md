# Plan de Trabajo: Replicación del Sistema de Diseño Alestra

Este documento detalla el plan estratégico para replicar los componentes de diseño desde Figma al sistema de diseño Alestra (HTML, CSS y JS), siguiendo las guías de autoría establecidas.

## 1. Análisis y Preparación
- **Auditoría de Figma:** Identificar todos los componentes únicos, estados (hover, active, disabled) y variantes en la biblioteca de componentes.
- **Mapeo de Tokens:** Comparar los colores, tipografías y espaciados de Figma con los tokens existentes en `tokens.css`.
- **Inventario de Iconografía:** Extraer y preparar los nuevos iconos (Notificaciones, Excel, PDF, etc.) en formato SVG.

## 2. Implementación de Tokens (`tokens.css`)
- **Variables de Color:** Actualizar y añadir variables CSS para las nuevas paletas de Indigo, Purple y Cyan identificadas en Figma.
- **Variables de Elevación:** Definir nuevos tokens de `box-shadow` si los componentes de Figma requieren sombras más complejas que el estándar actual.
- **Tipografía:** Asegurar que las escalas de tamaño de fuente (`font-size`) coincidan con las especificaciones de diseño.

## 3. Componentes Base (`components.css`)
- **Botones (`alestra-btn-*`):**
    - Implementar variantes: Primary, Secondary, Tabs.
    - Definir estados: Rested, Hover, Selected, Disabled.
- **Formularios (`alestra-input`, `alestra-checkbox`, etc.):**
    - Crear estilos para inputs de búsqueda, contraseña y email.
    - Implementar el diseño de `Switch`, `Checkbox` y `Radio Buttons` con estados de hover y selección.
- **Badges e Indicadores:**
    - Replicar los estados de color: Verde (Success), Gris (Neutral), Celeste/Azul (Info), Rojo (Error).

## 4. Componentes de Datos y Tablas
- **Estructura de Tabla:** Implementar el encabezado de tabla (`Table header`) con alineación y tipografía premium.
- **Acordeones de Tabla (`alestra-table-accordion`):**
    - Maquetar las variantes: Regular, Sobreconsumo (Amarillo/Rojo), Bloqueado (Gris).
    - Implementar estados Colapsado y Expandido.
- **Sistema de Filtros:**
    - Crear el contenedor de búsqueda y el dropdown de filtros.
    - Estilizar los tags de "filtros aplicados".

## 5. Componentes de Feedback y Capas
- **Modales y Pop-ups (`alestra-popup`):**
    - Crear la estructura base para los diferentes tipos de pop-ups (Desbloqueo, Mejora de plan, Reportar robo).
    - Implementar el `Overlay` semitransparente para el fondo.
- **Tooltips y Notificaciones:**
    - Replicar los globos de información (Tooltips) con sus respectivas flechas ("Tips").
    - Diseñar el menú desplegable de notificaciones y el contador de notificaciones pendientes.

## 6. Lógica Interactiva (JavaScript)
Aunque el sistema es principalmente CSS, se desarrollará un JS ligero (`alestra.js`) para:
- **Gestión de Acordeones:** Alternar la clase `--expanded` y manejar atributos `aria-expanded`.
- **Control de Modales:** Funciones para abrir y cerrar pop-ups mediante triggers.
- **Interacción de Dropdowns:** Manejar la visibilidad de menús de filtrado y selección.

## 7. Documentación y Control de Calidad
- **Snippets de Ejemplo:** Añadir ejemplos de uso de cada nuevo componente en `examples/components_snippets.html.erb`.
- **Pruebas de Responsividad:** Asegurar que todos los componentes (especialmente tablas y modales) funcionen correctamente en dispositivos móviles.
- **Accesibilidad (A11y):** Validar el contraste de colores y la navegación por teclado.

