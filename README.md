# MovieLib

Приложение для поиска и сравнения фильмов с использованием API PoiskKino.

### Live Demo: https://alexeyershov999.github.io/MovieLib/

## Важно: в приложении не реализовано сохранение таблицы сравнения (не было в требованиях), чтобы увидеть сравнение фильмов, не должно произойти перезагрузки страницы.

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/alexeyershov999/MovieLib.git
cd MovieLib
```

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173` (или с другим портом)

### Сборка проекта

```bash
npm run build
```

### Просмотр production-сборки

```bash
npm run preview
```

## Деплой на GitHub Pages

### Настройка

1. В `package.json` укажите URL вашего GitHub Pages в поле `homepage`:
```json
{
  "homepage": "https://<username>.github.io/<repo-name>/"
}
```

2. В `vite.config.ts` настройте `base`:
```typescript
export default defineConfig({
  base: '/<repo-name>/',
  // ...
})
```

### Деплой

```bash
npm run build
npm run deploy
```

Проект будет собран в папку `dist` и загружен на GitHub Pages.

## Архитектура

В проекте используется **Feature-Based архитектура**.

## Структура проекта

```
src/
├── api/                    # API слой
│   ├── axios.ts            # Конфигурация axios
│   ├── types.ts            # Типы данных API
│   └── services/           # Сервисы для работы с API
│       └── movies.ts       # Сервис для работы с фильмами
│
├── app/                    # Корневой компонент приложения
│   ├── App.tsx             # Главный компонент с роутингом
│   └── App.css             # Глобальные стили приложения
│
├── constants/              # Константы приложения
│   ├── genres.ts
│   ├── movies.ts
│   └── routes.ts
│
├── features/               # Фичи
│   ├── comparison/         # Сравнение фильмов
│   │   └── model/          # Стор для сравнения
│   │
│   ├── favorites/          # Избранное
│   │   ├── model/          # Стор для избранного
│   │   └── ui/             # UI компоненты
│   │       └── ConfirmModal/
│   │
│   ├── filters/            # Фильтрация фильмов
│   │   └── MovieFilters.tsx
│   │
│   ├── movies/             # Работа с фильмами
│   │   └── model/          # Стор для загрузки фильмов
│   │
│   └── navigation/         # Навигация (табы)
│       └── Navigation.tsx
│
├── pages/                  # Страницы приложения
│   ├── HomePage/           # Главная страница со списком фильмов
│   ├── MovieDetailPage/    # Страница деталей фильма
│   ├── FavoritesPage/      # Страница избранного
│   └── ComparisonPage/     # Страница сравнения фильмов
│
├── utils/                  # Утилиты
│   └── movie.ts            # Хелперы для работы с фильмами
│
├── main.tsx                # Точка входа приложения
├── index.css               # Глобальные стили
└── reset.css               # Сброс стилей браузера
```

## Технологии

- **React 19** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **Effector** — стейт-менеджмент
- **React Router** — роутинг
- **Axios** — HTTP-клиент
- **VKUI** — UI-компоненты

## Функциональность

- 📚 Просмотр списка фильмов с бесконечной прокруткой и динамической подгрузкой
- 🔍 Фильтрация по жанрам, году и рейтингу
- ⭐ Добавление фильмов в избранное
- 📊 Сравнение до 2 фильмов по параметрам
- 📱 Адаптивный дизайн для мобильных устройств

## API

Приложение использует API [PoiskKino](https://api.poiskkino.dev) для получения данных о фильмах.
