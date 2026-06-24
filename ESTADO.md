# Estado del repositorio — Genius-Dashboard

> Reporte de estado generado el 2026-06-21. Para la documentación funcional y de uso, ver [README.md](README.md).

## Resumen

Panel web interno que unifica en una sola interfaz los datos de **Budget Manager** y **Landing CRM**: campañas, presupuestos y leads de todos los clientes. Es el frontend del ecosistema Genius.

| Campo | Valor |
|---|---|
| Repositorio | `Tadeo-bit/Genius-Dashboard` |
| Stack | React 18 · React Router 6 · Vite 5 |
| Versión | `0.1.0` (en desarrollo) |
| Persistencia | No aplica (consume APIs externas) |
| Puerto | `5173` |

## Estado de Git

| Campo | Valor |
|---|---|
| Rama actual | `main` |
| Rama por defecto | `main` |
| Cambios sin commitear | Ninguno (working tree limpio) |
| Sincronización | Al día con `origin/main` |
| Último commit | `ba7758d — Add files via upload` |

## Estado funcional

**Implementado y operativo:**

- App React + Vite arrancable con `npm run dev`.
- Enrutado con 3 vistas: `/` (Dashboard), `/campaigns` (Campañas) y `/landings` (Landings).
- Layout con sidebar y resaltado del enlace activo.
- Clientes de API: `budgetManagerApi.js` y `landingCrmApi.js` (vía proxy de Vite).
- Degradación elegante: si una API no está disponible, las métricas muestran `—` sin romper la pantalla.

**Pendientes (TODOs marcados en el código):**

- `GD-F02` — filtro por estado y por cliente en la vista de Campañas.
- `GD-F03` — columna de conteo de leads por landing.
- `GD-F04` — completar las tarjetas de indicadores globales del Dashboard.
- `GD-F05` — selector de cliente para filtrar las vistas.

## Dependencias con otros repos

> Para datos reales, ambas APIs deben estar corriendo antes de abrir el Dashboard.

- **Genius-Budget** (Budget Manager) en `localhost:8080`.
- **Genius-CRM-main** (Landing CRM) en `localhost:3000`.

## Cómo ejecutar

```bash
npm install
npm run dev
# Panel: http://localhost:5173
```

**Requisitos:** Node.js 18+ y npm 9+.

## Historial de correcciones

### 2026-06-24 — GD-F01: corrección de proxies de Vite

**Problema detectado**

- El Dashboard mostraba `Error al conectar con las APIs: Landing CRM: 404` y `Budget Manager: 404`.
- El proxy de Vite eliminaba el prefijo `/api` al reescribir las rutas, enviando `/campaigns/summary` en vez de `/api/campaigns/summary`.

**Cambios realizados en `vite.config.js`**

- Proxy `/api/budget` ahora reescribe a `/api/*` (antes quitaba `/api` por completo).
- Proxy `/api/crm` ahora reescribe a `/api/*` (ídem).

**Verificaciones**

- `GET /api/budget/campaigns/summary` vía proxy responde 200.
- `GET /api/crm/landings/summary` vía proxy responde 200.
- Los errores `Landing CRM: 404` y `Budget Manager: 404` desaparecen en la UI.
