# SPEC — Landing "Team Sangre"
> Centro Metropolitano de Sangre · Campaña 2026

---

## Objetivo

Construir una landing page de campaña para captar donantes de sangre. El usuario pasa por un cuestionario paso a paso (stepper) de 5 preguntas Sí/No, luego ingresa sus datos personales, y recibe un mensaje de resultado positivo. Los datos se envían por correo vía Resend.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | Motion  |
| Validación | React Hook Form + Zod |
| Envío de correo | Resend |
| Base de datos | Supabase (Postgres) |
| Deploy | Vercel |

---

## Estructura de archivos

```
app/
  page.tsx                  # Página principal (hero + stepper)
  layout.tsx                # Layout raíz con metadata y fuentes
  globals.css               # Variables CSS, @font-face, estilos base
  api/
    send/
      route.ts              # Serverless Function — envío de correo con Resend
components/
  Hero.tsx                  # Sección hero con CTA
  Stepper.tsx               # Orquestador del flujo paso a paso
  QuestionStep.tsx          # Paso de pregunta Sí/No
  DataStep.tsx              # Paso de datos personales (nombre, apellido, correo)
  ResultStep.tsx            # Pantalla de resultado final
  Navbar.tsx                # Navbar fija
  Footer.tsx                # Footer
lib/
  questions.ts              # Array con el contenido de las 5 preguntas
  schemas.ts                # Schemas Zod para validación
  send-email.ts             # Función cliente que llama a /api/send
  supabase.ts               # Cliente Supabase singleton
public/
  fonts/
    ThePhiladelphiaStory.woff2
  images/
    bg.png                  # Imagen de fondo estática
```

---

## Identidad visual

| Variable | Valor |
|---|---|
| `--color-primary` | `#DF0000` |
| `--color-bg` | `#000000` |
| `--color-text` | `#FFFFFF` |
| Tipografía display | `The Philadelphia Story` — servida vía `@font-face` desde `public/fonts/` |
| Tipografía cuerpo | `Zalando Sans Expanded` — importada desde Google Fonts en `layout.tsx` |

### Fondo
Imagen estática `public/images/bg.png`. Ocupa el 100% del viewport en todos los pasos. El fondo **no cambia** al navegar entre pasos — solo cambia el bloque de contenido central.

### Tipografía mixta en preguntas
Cada pregunta usa la inicial decorativa (primera letra de la palabra clave) en `The Philadelphia Story` y el resto en `Zalando Sans Expanded`. Implementar con `<span>` y clases separadas.

---

## Flujo de la aplicación

```
Hero
  └─ clic en "Comienza aquí"
       └─ Paso 1 (pregunta edad)
            └─ Paso 2 (pregunta parejas)
                 └─ Paso 3 (pregunta piercings/tatuajes)
                      └─ Paso 4 (pregunta sueño)
                           └─ Paso 5 (pregunta medicación)
                                └─ Paso 6 (datos personales)
                                     └─ Resultado
```

Las respuestas se evalúan al final contra los criterios de elegibilidad del MINSAL Chile. El resultado puede ser positivo o negativo según las respuestas acumuladas.

---

## Componentes

### `Navbar.tsx`
- Posición: `fixed top-0`, `z-50`, fondo transparente
- Izquierda: texto `SOYTEAMSANGRE` en Zalando Sans Expanded
- Centro: logo Team Sangre (SVG o imagen)
- Derecha: texto `2026`

---

### `Hero.tsx`
Contenido:
- Titular con tipografía mixta:
  - `"Todo es mejor cuando la sangre "` en Zalando Sans Expanded regular
  - `"circula"` en Zalando Sans Expanded bold
  - `" al lugar "` en Zalando Sans Expanded regular
  - `"Correcto."` con la `C` inicial en The Philadelphia Story + resto en Zalando Sans Expanded bold
- Subtítulo: `"Descubre si tú también puedes ser Team Sangre respondiendo este cuestionario."`
- Botón `"Comienza aquí"` — color `#DF0000`, `rounded-full`, al hacer clic activa el stepper con scroll suave al bloque del stepper
- Elementos decorativos laterales: dos grupos de dots y líneas horizontales (`<div>` simples con clases Tailwind), puramente decorativos, sin funcionalidad

---

### `lib/questions.ts`

Cada pregunta tiene un campo `eligibleAnswer` que indica la respuesta correcta según los criterios del MINSAL Chile. La elegibilidad se evalúa en `Stepper.tsx` comparando cada respuesta del usuario contra este campo.

| # | Pregunta | `eligibleAnswer` | Criterio |
|---|---|---|---|
| 1 | ¿Tienes entre 18 y 65 años? | `"si"` | Rango de edad válido |
| 2 | ¿Más de una pareja sexual en los últimos 6 meses? | `"no"` | Factor de riesgo HIV/ETS |
| 3 | ¿Piercings o tatuajes en los últimos 6 meses? | `"no"` | Riesgo de transmisión por sangre |
| 4 | ¿Duermes al menos 5 horas? | `"si"` | Requisito de salud mínima |
| 5 | ¿Drogas por la vena sin receta médica? | `"no"` | Exclusión permanente |

```typescript
export interface Question {
  id: number
  text: string
  highlight: string[]
  eligibleAnswer: 'si' | 'no'
}
```

---

### `Stepper.tsx`
- Orquesta el estado global del flujo: paso actual, respuestas acumuladas, datos personales
- Estado:
  ```typescript
  type StepperState = {
    currentStep: number       // 0 = hero, 1-5 = preguntas, 6 = datos, 7 = resultado
    answers: Record<number, 'si' | 'no'>
    userData: { nombre: string; apellido: string; correo: string } | null
  }
  ```
- Renderiza `QuestionStep`, `DataStep` o `ResultStep` según `currentStep`
- Envuelve el contenido con `<AnimatePresence mode="wait">` de Motion para las transiciones
- Función `isEligible()` que evalúa si todas las respuestas coinciden con `eligibleAnswer` de cada pregunta y pasa el resultado a `ResultStep` y a `DataStep`

---

### `QuestionStep.tsx`
Props:
```typescript
interface QuestionStepProps {
  question: Question
  onAnswer: (answer: 'si' | 'no') => void
  onBack: () => void
  currentStep: number
  totalSteps: number
}
```

UI:
- Texto de la pregunta con palabras highlight en `<strong>`
- Dos botones radio estilizados: `⊙ Sí` y `⊙ No`
- Botón `"Enviar"` en `#DF0000` — **deshabilitado** hasta que el usuario seleccione una opción
- Botón `"Volver"` — solo visible si `currentStep > 1`

Animación de entrada (Motion):
```typescript
// Cada QuestionStep entra con esta animación
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -24 }}
transition={{ duration: 0.35, ease: "easeOut" }}
```

---

### `lib/schemas.ts`

```typescript
import { z } from 'zod'

export const dataStepSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  correo: z.string().email("Ingresa un correo válido")
})

export type DataStepValues = z.infer<typeof dataStepSchema>
```

---

### `DataStep.tsx`
- Encabezado: `"Finalmente, déjanos tu Mail para que sepas más sobre el Team Sangre."`
- Campos: Nombre + Apellido en una fila, Correo en fila completa
- Usar `useForm` de React Hook Form con `zodResolver(dataStepSchema)`
- Botón `"Enviar"` deshabilitado si el form tiene errores o campos vacíos
- Recibe prop `eligible: boolean` desde `Stepper`
- Al hacer submit válido: llamar a `sendEmail({ ...data, eligible })` de `lib/send-email.ts`, luego avanzar al resultado

---

### `ResultStep.tsx`
- Recibe prop `eligible: boolean` desde `Stepper`
- Si `eligible = true`: muestra `"Felicidades, puedes ser"` + logo Team Sangre inline
- Si `eligible = false`: muestra `"Lo sentimos, no puedes ser Team Sangre"`
- Animación de entrada igual que `QuestionStep`
- Sin botones ni redirección

---

## API Route — `app/api/send/route.ts`

Recibe `nombre`, `apellido`, `correo` y `eligible`. Si `eligible === true`, inserta el registro en la tabla `donantes` de Supabase antes de enviar el correo.

```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { nombre, apellido, correo, eligible } = await req.json()

  if (eligible) {
    const { error } = await supabase.from('donantes').insert({ nombre, apellido, correo })
    if (error) console.error('Supabase insert error:', error.message)
  }

  await resend.emails.send({
    from: 'Team Sangre <noreply@soyteamsangre.com>',
    to: process.env.CONTACT_EMAIL!,
    subject: 'Nuevo donante potencial — Team Sangre',
    html: `
      <h2>Nuevo registro Team Sangre</h2>
      <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
      <p><strong>Correo:</strong> ${correo}</p>
    `
  })

  return NextResponse.json({ ok: true })
}
```

Variables de entorno requeridas en `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=correo-destino@ejemplo.com
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

### Tabla `donantes` en Supabase

```sql
create table donantes (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  apellido text not null,
  correo text not null,
  created_at timestamptz default now()
);

alter table donantes enable row level security;
create policy "allow insert for anon" on donantes for insert to anon with check (true);
grant insert on table donantes to anon;
```

---

## `lib/send-email.ts`

```typescript
export async function sendEmail(data: {
  nombre: string
  apellido: string
  correo: string
  eligible: boolean
}) {
  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Error al enviar el correo')
}
```

---

## `app/layout.tsx` — metadata y fuentes

```typescript
export const metadata = {
  title: 'Team Sangre — ¿Puedes donar?',
  description: 'Descubre si tú también puedes ser Team Sangre respondiendo este cuestionario.',
  openGraph: {
    title: 'Team Sangre',
    description: 'Descubre si puedes donar sangre y ser parte del Team Sangre.',
    images: ['/images/og.png'],  // imagen 1200x630 para RRSS
  }
}
```

Cargar `Zalando Sans Expanded` desde Google Fonts con `next/font/google`.
Registrar `The Philadelphia Story` en `globals.css`:
```css
@font-face {
  font-family: 'ThePhiladelphiaStory';
  src: url('/fonts/ThePhiladelphiaStory.woff2') format('woff2');
  font-display: swap;
}
```

---

## `app/globals.css`

```css
:root {
  --color-primary: #DF0000;
  --color-bg: #000000;
  --color-text: #FFFFFF;
  --font-display: 'ThePhiladelphiaStory', cursive;
  --font-body: 'Zalando Sans Expanded', sans-serif;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}
```

---

## Comportamiento responsive

- **Mobile-first** — el tráfico principal viene de RRSS
- El bloque de pregunta ocupa el ancho completo en mobile, centrado con max-width en desktop
- Los botones Sí/No son táctiles, mínimo 44px de altura
- El botón "Comienza aquí" es prominente en hero mobile

---

## OG Tags

Incluir en `layout.tsx`:
- `og:title` — `"Team Sangre — ¿Puedes donar?"`
- `og:description` — `"Descubre si tú también puedes ser Team Sangre respondiendo este cuestionario."`
- `og:image` — `/images/og.png` (imagen 1200×630, pendiente de asset del cliente)
- `twitter:card` — `summary_large_image`

---

## Checklist antes de deploy a producción

- [ ] Reemplazar `CONTACT_EMAIL` en variables de entorno con el correo definitivo del cliente
- [ ] Verificar dominio en Resend para enviar desde `noreply@soyteamsangre.com`
- [ ] Configurar `SUPABASE_URL` y `SUPABASE_ANON_KEY` en variables de entorno de Vercel
- [ ] Proveer imagen OG (`/public/images/og.png`) en 1200×630px
- [ ] Confirmar dominio final (soyteamsangre.com u otro)
- [ ] Probar flujo completo en mobile (Chrome Android + Safari iOS)


## Referencia visual

Las pantallas del diseño están en `docs/`. Úsalas como referencia
visual para replicar con precisión cada paso:

- `diseno-01-hero.png` — Hero con CTA
- `diseno-02-pregunta-edad.png` — Paso 1
- `diseno-03-pregunta-parejas.png` — Paso 2
- `diseno-04-pregunta-piercings.png` — Paso 3
- `diseno-05-pregunta-sueno.png` — Paso 4
- `diseno-06-pregunta-medicacion.png` — Paso 5
- `diseno-07-datos-personales.png` — Paso 6 (datos personales)
- `diseno-09-resultado.png` — Pantalla de resultado


## Importante sobre el layout

El fondo (`bg.png`) ocupa el 100vh en toda la aplicación y
**nunca cambia** entre pasos. No hay scroll. Todo el flujo
ocurre en una sola pantalla fullscreen. Lo único que cambia
es el bloque de contenido central (pregunta, datos o resultado)
que se anima con Motion al transicionar entre pasos.