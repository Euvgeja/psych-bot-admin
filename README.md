# psych-bot-admin

Read-only админка для просмотра данных psych-bot.

Отдельное приложение: деплоится независимо от бэкенда.

## Локальная разработка

```bash
# 1. Бэкенд (в репозитории psych-bot)
docker compose up -d postgres
./gradlew :api:bootRun

# 2. Фронт
npm install
npm run dev
# → http://localhost:5173
```

Vite проксирует `/api` на `localhost:8081` — `VITE_API_URL` не нужен.

## Продакшен (пока без домена, по IP сервера)

### 1. API на сервере

В `psych-bot` после `git pull`:

```bash
cd /opt/psych-bot
docker compose up -d --build api
```

В `.env` добавь (подставь IP сервера и порт фронта):

```
API_CORS_ORIGINS=http://YOUR_SERVER_IP:3000
```

Чтобы API был доступен снаружи, в `docker-compose.yml` у сервиса `api` поменяй порт:

```yaml
ports:
  - "0.0.0.0:8081:8081"
```

Открой порт `8081` в firewall.

### 2. Фронт на сервере

```bash
# Сборка с URL API
VITE_API_URL=http://YOUR_SERVER_IP:8081 npm run build

# Вариант A: Docker
docker build --build-arg VITE_API_URL=http://YOUR_SERVER_IP:8081 -t psych-bot-admin .
docker run -d -p 3000:80 --name psych-bot-admin psych-bot-admin

# Вариант B: статика через npx
npx serve -s dist -l 3000
```

Админка: `http://YOUR_SERVER_IP:3000`

### Когда появится домен

Поставь nginx на сервере — один vhost, статика + `proxy_pass /api` на `127.0.0.1:8081`. Тогда CORS не нужен, API снова только на localhost.

## Структура

- `src/config/entities.ts` — список сущностей и эндпоинтов (синхронизировать с `psych-bot/api`)
- `src/pages/EntityPage.tsx` — универсальная страница-таблица
