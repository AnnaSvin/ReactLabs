# Tic-Tac-Toe (React + TypeScript)

Навчальний проєкт — гра «Хрестики-нулики» з налаштуваннями складності, розміру дошки, історією результатів та збереженням стану в LocalStorage.

Розроблено в межах лабораторних робіт №1, 2, 7, 8, 11, 12 з предмету **«Стандартизація та документування ПЗ»**.

## Стек технологій

- **React 18** + **TypeScript**
- **Vite** — збирач та dev-сервер
- **React Router** — маршрутизація між сторінками
- **Zustand** + `persist` — управління станом та збереження в LocalStorage
- **CSS Modules** — інкапсульовані стилі компонентів
- **Storybook** — каталог UI-компонентів з документацією
- **TypeDoc** — згенерована API-документація
- **react-cookie-consent** — GDPR-сумісний банер згоди

## Можливості

- Три рівні складності бота: `easy` / `medium` / `hard`
- Підтримка дощок 3×3 та 4×4
- Налаштування затримки ходу бота (300 / 700 / 1200 мс)
- Підрахунок очок між раундами
- Збереження історії результатів по користувачу
- Перезапуск поточного раунду з відкатом рахунку

## Встановлення

```bash
git clone https://github.com/AnnaSvin/ReactLabs.git
cd ReactLabs
npm install
```

Вимоги: **Node.js 18+** та **npm 9+**.

## Основні команди

| Команда | Опис |
| --- | --- |
| `npm run dev` | Запуск dev-сервера на `http://localhost:5173` |
| `npm run build` | Збірка production-версії у папку `dist/` |
| `npm run preview` | Локальний прев'ю-сервер для зібраної версії |
| `npm run lint` | Перевірка коду через ESLint |
| `npm run storybook` | Запуск Storybook на `http://localhost:6006` |
| `npm run build-storybook` | Збірка статичного Storybook |
| `npm run docs` | Генерація API-документації у папку `docs/` |
| `npm run license-report` | Генерація звіту по ліцензіях залежностей |
| `npm run license-summary` | Короткий підсумок використаних ліцензій у консолі |

## Структура проєкту

```
src/
├── components/        # UI-компоненти (Board, GameOverModal, CookieBanner, ...)
├── context/           # React Context (GameSession, GameSettings)
├── hooks/             # Кастомні хуки (useTicTacToe, useLocalStorage)
├── pages/             # Сторінки (StartPage, GamePage, ResultsPage)
├── store/             # Zustand-стор з persist-middleware
├── styles/            # Глобальні стилі
├── types/             # TypeScript-типи
└── utils/             # Допоміжні функції (helpers)
```

## Документація

- **API-документація**: папка `docs/` (генерується командою `npm run docs`)
- **Каталог компонентів**: `npm run storybook`
- **Політика конфіденційності**: [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
- **Звіт по ліцензіях залежностей**: [licenses-report.md](./licenses-report.md)

## Ліцензія

Проєкт поширюється під ліцензією **MIT**. Повний текст — у файлі [LICENSE](./LICENSE).

Усі прямі залежності проєкту також сумісні з MIT (див. `licenses-report.md`).

## Автор

**Anna Svintsitska**

- GitHub: [github.com/AnnaSvin](https://github.com/AnnaSvin)
- Репозиторій проєкту: [github.com/AnnaSvin/ReactLabs](https://github.com/AnnaSvin/ReactLabs)
