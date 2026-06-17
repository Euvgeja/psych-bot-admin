# psych-bot-admin

Веб-админка (React) для просмотра данных psych-bot.

Отдельный репозиторий, деплоится независимо от бэкенда.

## Не путать с бэкендом

| | Бэкенд (`psych-bot`) | Фронт (этот репозиторий) |
|--|----------------------|---------------------------|
| Что это | Java-модуль `admin` для бота | React-сайт в браузере |
| Образ Docker | `psychbot-backend-admin` | `psychbot-admin-ui` |
| Контейнер | `psychbot-admin` | `psychbot-admin-ui` |
| Порт | 8090 (внутренний) | **3000** (для браузера) |

## Локальная разработка

```bash
# 1. Бэкенд (репозиторий psych-bot)
docker compose up -d postgres
./gradlew :api:bootRun

# 2. Фронт
npm install
npm run dev
# → http://localhost:5173
```

Vite проксирует `/api` на `localhost:8081` — `VITE_API_URL` не нужен.

## Продакшен на сервере

### 1. Подготовь `.env`

```bash
cd /opt/psych-bot-admin
cp .env.example .env
nano .env
```

Пример (подставь IP сервера):

```env
VITE_API_URL=http://YOUR_SERVER_IP:8081
VITE_ADMIN_USER=admin
VITE_ADMIN_PASSWORD=сложный_пароль
```

### 2. Запусти фронт

**Вариант A — docker compose (рекомендуется):**

```bash
docker compose up -d --build
```

**Вариант B — без Docker (если лимит Docker Hub):**

```bash
npm ci
npm run build
npx serve -s dist -l 3000
```

Админка: `http://YOUR_SERVER_IP:3000`

### 3. API на бэкенде (для данных в таблицах)

В `/opt/psych-bot/.env`:

```env
API_CORS_ORIGINS=http://YOUR_SERVER_IP:3000
```

В `psych-bot/docker-compose.yml` у сервиса `api` порт наружу:

```yaml
ports:
  - "0.0.0.0:8081:8081"
```

```bash
cd /opt/psych-bot
docker compose up -d --build api
```

## Структура

```
src/
  app/           — точка входа, роуты
  features/      — auth, shell, entity-list, client-detail
  shared/        — api, ui, config
```
