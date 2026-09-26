# psych-bot-admin

Веб-админка (React) для просмотра данных [psych-bot](https://github.com/Euvgeja/psych-bot).

Отдельный репозиторий, деплоится независимо от бэкенда.

**Production на VPS (nginx :4205, miniapp :4305, backend :8080):** [docs/VPS-PRODUCTION.md](docs/VPS-PRODUCTION.md) — полная схема для деплоя и для AI-ассистентов.

## Не путать

| | psych-bot (Java) | Этот репозиторий (React) |
|--|------------------|---------------------------|
| Назначение | Monolith: бот + REST `/api/...` | SPA в браузере |
| Процесс на VPS | Docker `psychbot-backend`, `127.0.0.1:8080` | Статика `/var/www/psych-bot-admin`, nginx **4205** |
| Модуль в репо | `modules/api-admin` (только Java) | — |

Удалённый Spring Boot Admin (`monitoring`) — **не** эта панель.

## Локальная разработка

```bash
# 1. Backend (psych-bot), monolith на 8080
docker compose up -d postgres redis
./gradlew :backend:bootRun

# 2. Фронт
npm ci
npm run dev
# → http://localhost:5173
```

`VITE_API_URL` пустой — Vite проксирует `/api` на backend (см. `vite.config.ts`).

## Продакшен (кратко)

1. `.env` из `.env.example` (`VITE_API_URL=` при nginx proxy).
2. `npm ci && npm run build`
3. `cp -a dist/. /var/www/psych-bot-admin/`
4. nginx: [scripts/deploy-nginx-port4205.example.conf](scripts/deploy-nginx-port4205.example.conf)

Подробно: [docs/VPS-PRODUCTION.md](docs/VPS-PRODUCTION.md).

## Логин

Учётные данные задаются **при сборке**: `VITE_ADMIN_USER`, `VITE_ADMIN_PASSWORD` (см. `.env.example`). Проверка только во фронте; API backend отдельно не авторизует admin SPA.

## Структура

```
src/
  app/           — точка входа, роуты
  features/      — auth, shell, entity-list, client-detail
  shared/        — api, ui, config
docs/
  VPS-PRODUCTION.md
scripts/
  deploy-nginx-port4205.example.conf
```
