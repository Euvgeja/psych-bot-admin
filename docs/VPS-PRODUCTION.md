# Production VPS: psych-bot-admin + общая схема

Документ для людей и для AI-ассистентов. Miniapp описан в **psych-bot-miniapp** → `docs/VPS-PRODUCTION.md` (та же схема, порт **4305**).

## Общая архитектура

```
Браузер
   │
   ├─ :4205 ──► nginx ──► /var/www/psych-bot-admin  (этот SPA)
   │              └── /api/* ──► 127.0.0.1:8080
   │
   └─ :4305 ──► nginx ──► /var/www/psych-bot-miniapp
                  └── /api/* ──► 127.0.0.1:8080

8080 ──► Docker psychbot-backend (/opt/psych-bot)
```

| UI | URL (пример IP) | Статика на диске |
|----|-----------------|------------------|
| **Admin** (этот repo) | `http://195.133.40.134:4205/login` | `/var/www/psych-bot-admin` |
| Miniapp | `http://195.133.40.134:4305/#/` | `/var/www/psych-bot-miniapp` |

Nginx-конфиг admin: [scripts/deploy-nginx-port4205.example.conf](../scripts/deploy-nginx-port4205.example.conf)  
Файл на VPS: `/etc/nginx/sites-available/psych-bot-admin-4205` → symlink в `sites-enabled/`.

## Сборка и выкладка admin (типичный путь на VPS)

Репозиторий на сервере (клон один раз):

```bash
cd /opt
git clone https://github.com/Euvgeja/psych-bot-admin.git   # PAT если private
cd /opt/psych-bot-admin
cp .env.example .env
nano .env
```

Рекомендуемый `.env` при nginx proxy `/api` на том же `:4205`:

```env
VITE_API_URL=
VITE_ADMIN_USER=admin
VITE_ADMIN_PASSWORD=сложный_пароль
```

Сборка и копирование в каталог nginx:

```bash
npm ci
npm run build
mkdir -p /var/www/psych-bot-admin
cp -a dist/. /var/www/psych-bot-admin/
ls -la /var/www/psych-bot-admin/index.html
nginx -t && systemctl reload nginx
```

Пароль меняется **только пересборкой** (`VITE_*` попадают в JS). Старый `dist` на диске = старый пароль.

Альтернатива: `docker compose up -d --build` (образ nginx внутри контейнера) — тогда либо публикуешь порт контейнера, либо проксируешь с host nginx; **текущая прод-схема** — статика в `/var/www/psych-bot-admin` + host nginx **4205**.

## Аутентификация admin UI

Реализация: `src/features/auth/service/authService.ts` — сравнение логина/пароля с `import.meta.env.VITE_ADMIN_*` в браузере, сессия в `sessionStorage`.

- Это **не** auth backend API.
- REST `/api/**` на psych-bot **без Spring Security** — любой, кто знает URL backend, может дергать API (если 8080 доступен). На VPS backend привязан к `127.0.0.1:8080`, снаружи только через nginx `/api`.

## CORS backend

В `/opt/psych-bot/.env`:

```env
API_CORS_ALLOWED_ORIGINS=http://195.133.40.134:4205,http://localhost:5173
MINIAPP_CORS_ALLOWED_ORIGINS=http://195.133.40.134:4305,http://localhost:5174
```

```bash
cd /opt/psych-bot && docker compose up -d backend
```

## Локальная разработка

1. Backend: `/opt/psych-bot` или локально `./gradlew :backend:bootRun` → **8080** (не 8081).
2. Admin: `npm run dev` → **5173**, Vite proxy `/api` → см. `vite.config.ts` (локально target должен быть **8080**; если в конфиге 8081 — поправить под monolith).

`VITE_API_URL` в dev обычно пустой (proxy).

## Не путать

| Название | Что это |
|----------|---------|
| `psych-bot-admin` (этот repo) | React SPA для таблиц/клиентов |
| `modules/api-admin` в psych-bot | Java REST, часть monolith |
| Удалённый `monitoring` + Spring Boot Admin | Ops UI, **не** эта админка |

## Обновление после изменений в коде

```bash
cd /opt/psych-bot-admin
git pull
npm ci
npm run build
cp -a dist/. /var/www/psych-bot-admin/
```

CI/CD для admin на VPS пока не настроен (в отличие от miniapp rsync из GitHub Actions).
