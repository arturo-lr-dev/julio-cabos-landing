WEB JULIO CABOS
1. Objetivo del proyecto
Crear una web profesional para Julio Cabos que:
 Refuerce su posicionamiento como referente en pintura de miniaturas
 Sirva como base para venta de formación (presencial y online)
 Actúe como hub central para futuros productos (Patreon, cursos, comunidad)
La web debe transmitir: nivel artístico + autoridad + claridad
2. Concepto de diseño
 Estilo: oscuro, minimalista, artístico
 Prioridad: imágenes &gt; diseño
 Sensación: portfolio + taller personal, no academia
Referencias visuales:
 Fondo oscuro (negro/gris muy oscuro)
 Mucho espacio (aire)
 Tipografía limpia (NO fantasía)
 Interacciones sutiles (hover suave, zoom ligero)
3. Estructura de la web
HOME (principal)
1. HERO
 Imagen: pieza destacada (samurái)
 Texto:
 Título: Julio Cabos
 Subtítulo: Pintura de miniaturas con criterio artístico
 Texto corto
 CTA: “Aprender conmigo”

2. MENSAJE
Texto:
La pintura de miniaturas no es solo técnica.
Es entender la luz, el volumen y las decisiones que hacen que una figura funcione.
Este es un espacio para aprender a pintar con criterio.
3. GALERÍA
 Grid limpio (2–3 columnas)
 6–8 imágenes
 Sin texto encima
 Hover: zoom ligero

4. FORMACIÓN
Texto:
Formación presencial y online para todos los niveles.
Un enfoque basado en entender la pintura, no solo ejecutarla.
Botones:
 Cursos presenciales
 Próximamente online
5. SOBRE JULIO
Texto:
Julio Cabos es un pintor profesional de miniaturas con más de dos décadas de
experiencia en el sector.
Ha sido director de pintura en empresas de referencia como Andrea Miniatures y
Scale75, liderando proyectos para coleccionistas y desarrollando publicaciones
especializadas.
Autor de más de 30 libros y formador internacional, combina su trabajo como pintor
freelance con la enseñanza, ayudando a otros a entender la pintura desde el criterio y la
experiencia.
Botón: Ver trayectoria
6. CONTACTO
Texto:
Si quieres aprender con Julio o colaborar en algún proyecto, puedes ponerte en contacto
aquí.
Botón: Contactar (Correo electrónico: Juliocabosg@gmail.com)

4. Material gráfico
Imágenes disponibles:
 Miniaturas (alta calidad)
 Logo/firma Julio Cabos
 Imagenes de perfil de Julio
Requisitos:
 Fondo uniforme (preferible limpio)
 Sin overlays (quitar:
 “Become a patron”
 efectos laterales de color)
 Formato optimizado web
IMPORTANTE:

Las imágenes son el activo principal → deben verse grandes y limpias
5. Estilo visual (guidelines)
 Fondo: #0f0f0f o similar
 Texto: blanco / gris claro
 Acento: muy sutil (gris o dorado suave opcional)
Tipografía:
 Principal: Inter / Helvetica / similar
 Secundaria: opcional serif elegante (muy controlado)
6. ⚙️ Requisitos técnicos
 Web responsive (móvil prioritario)
 Carga rápida (optimización imágenes)
 Estructura SEO básica
 Preparado para:
 integrar Patreon
 añadir sistema de cursos en futuro
7. Integraciones (fase actual)
 Instagram
 Email contacto
(Fase futura)
 Stripe / pagos
 Plataforma de cursos
8. Qué NO hacer
 No diseño recargado
 No iconos innecesarios
 No bloques tipo “corporativo”
 No texto excesivo
Regla:menos es más
9. Entregable esperado
 Web funcional (home completa)
 Base escalable
 Fácil de modificar
Nota para desarrollo
La web no debe “decorar”, debe dejar lucir el trabajo de Julio.

DOCUMENTO TÉCNICO

1. ENFOQUE GENERAL
Web tipo:
Landing + portfolio + base de producto digital
Prioridades:
1. Impacto visual (imagen)
2. Claridad de mensaje
3. Escalabilidad futura
2. ⚙️ STACK TECNOLÓGICO
Opción
 Next.js / React
 Tailwind CSS
 CMS: Sanity / Contentful / Strapi

3. ARQUITECTURA DE COMPONENTES
Dividir la web en bloques reutilizables:
COMPONENTES
1. HeroSection
 background image
 title
 subtitle
 CTA
2. TextBlock
 título opcional
 texto centrado
3. GalleryGrid
 imágenes
 hover zoom
 responsive
4. TrainingSection
 texto
 botones
5. AboutSection

 imagen + texto
 layout split (50/50)
6. ContactSection
 texto
 botón/email
7. Footer
 logo
 redes

IMPORTANTE:Todo modular → reutilizable
4. SISTEMA DE DISEÑO
Colores
background: #0f0f0f;
text: #ffffff;
secondary: #bfbfbf;
accent: #d6b36a; /* opcional */
Tipografía
 Headings: Inter / Poppins
 Body: Inter
Nada de fuentes raras
Espaciado
 Mucho padding vertical (80–120px)
 Márgenes amplios
sensación premium
5. GESTIÓN DE IMÁGENES
Requisitos:
 Lazy loading
 WebP
 Tamaños adaptativos
Comportamiento:
 Hero → imagen full width
 Galería → grid responsive
 Hover → scale(1.03)
⚠️ CRÍTICO
Eliminar:

 overlays
 logos incrustados
 banners Patreon
6. RESPONSIVE
Mobile:
 Hero recortado bien
 Texto centrado
 Galería 1 columna
 Botones grandes
7. PERFORMANCE
 Lighthouse &gt; 85 mínimo
 imágenes optimizadas
 evitar librerías pesadas
8. SEO BÁSICO
 Title: “Julio Cabos – Pintura de miniaturas”
 H1 único (hero)
 Alt en imágenes
9. PREPARADO PARA FUTURO
Dejar estructura para:
 /formacion
 /patreon
 /cursos
10.USO DE IA

 auto-tagging de imágenes
 generación de descripciones
 optimización SEO automática
 chatbot básico (más adelante)

11. ANTI-PATRONES
❌ animaciones pesadas
❌ sliders innecesarios
❌ scroll raro
❌ diseño recargado
12. MVP
 Home completa

 responsive
 imágenes bien
 textos cargados
NOTA FINAL
El diseño debe desaparecer.
Las miniaturas son el producto.