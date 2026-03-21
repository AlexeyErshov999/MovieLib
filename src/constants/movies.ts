import type { Movie } from '../api/types';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    name: 'Начало',
    year: 2010,
    rating: { kp: 8.76, imdb: 8.8 },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }, { name: 'триллер' }],
    description: 'Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 2,
    name: 'Интерстеллар',
    year: 2014,
    rating: { kp: 8.54, imdb: 8.7 },
    genres: [{ name: 'фантастика' }, { name: 'драма' }],
    description: 'Команда исследователей отправляется в космос, чтобы найти новый дом для человечества.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 3,
    name: 'Тёмный рыцарь',
    year: 2008,
    rating: { kp: 8.52, imdb: 9.0 },
    genres: [{ name: 'боевик' }, { name: 'триллер' }, { name: 'криминал' }],
    description: 'Бэтмен поднимает ставки в войне с преступностью.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 4,
    name: 'Матрица',
    year: 1999,
    rating: { kp: 8.52, imdb: 8.7 },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }],
    description: 'Хакер Нео узнаёт, что реальность — это симуляция.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 5,
    name: 'Побег из Шоушенка',
    year: 1994,
    rating: { kp: 9.1, imdb: 9.3 },
    genres: [{ name: 'драма' }],
    description: 'Банкир Энди Дюфрейн обвиняется в убийстве жены и любовника.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 6,
    name: 'Властелин колец: Возвращение короля',
    year: 2003,
    rating: { kp: 8.65, imdb: 9.0 },
    genres: [{ name: 'фэнтези' }, { name: 'приключения' }, { name: 'драма' }],
    description: 'Путешествие Фродо и Братства Кольца подходит к концу.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 7,
    name: 'Форрест Гамп',
    year: 1994,
    rating: { kp: 9.0, imdb: 8.8 },
    genres: [{ name: 'драма' }, { name: 'мелодрама' }, { name: 'комедия' }],
    description: 'История простого человека, который стал свидетелем важнейших событий XX века.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  },
  {
    id: 8,
    name: 'Бойцовский клуб',
    year: 1999,
    rating: { kp: 8.64, imdb: 8.8 },
    genres: [{ name: 'триллер' }, { name: 'драма' }],
    description: 'Работник страховой компании создаёт подпольный бойцовский клуб.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' }
  }
];
