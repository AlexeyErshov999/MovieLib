import type { Movie } from '../api/types';

export const MOVIES_PER_PAGE = 50;
export const MIN_YEAR = 1990;

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    name: 'Начало',
    alternativeName: 'Inception',
    year: 2010,
    rating: { kp: 8.76, imdb: 8.8 },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }, { name: 'триллер' }],
    description: 'Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 148,
    countries: [{ name: 'США' }, { name: 'Великобритания' }]
  },
  {
    id: 2,
    name: 'Интерстеллар',
    alternativeName: 'Interstellar',
    year: 2014,
    rating: { kp: 8.54, imdb: 8.7 },
    genres: [{ name: 'фантастика' }, { name: 'драма' }],
    description: 'Команда исследователей отправляется в космос, чтобы найти новый дом для человечества.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 169,
    countries: [{ name: 'США' }, { name: 'Великобритания' }, { name: 'Канада' }]
  },
  {
    id: 3,
    name: 'Тёмный рыцарь',
    alternativeName: 'The Dark Knight',
    year: 2008,
    rating: { kp: 8.52, imdb: 9.0 },
    genres: [{ name: 'боевик' }, { name: 'триллер' }, { name: 'криминал' }],
    description: 'Бэтмен поднимает ставки в войне с преступностью.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 152,
    countries: [{ name: 'США' }, { name: 'Великобритания' }]
  },
  {
    id: 4,
    name: 'Матрица',
    alternativeName: 'The Matrix',
    year: 1999,
    rating: { kp: 8.52, imdb: 8.7 },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }],
    description: 'Хакер Нео узнаёт, что реальность — это симуляция.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 136,
    countries: [{ name: 'США' }]
  },
  {
    id: 5,
    name: 'Побег из Шоушенка',
    alternativeName: 'The Shawshank Redemption',
    year: 1994,
    rating: { kp: 9.1, imdb: 9.3 },
    genres: [{ name: 'драма' }],
    description: 'Банкир Энди Дюфрейн обвиняется в убийстве жены и любовника.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 142,
    countries: [{ name: 'США' }]
  },
  {
    id: 6,
    name: 'Властелин колец: Возвращение короля',
    alternativeName: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    rating: { kp: 8.65, imdb: 9.0 },
    genres: [{ name: 'фэнтези' }, { name: 'приключения' }, { name: 'драма' }],
    description: 'Путешествие Фродо и Братства Кольца подходит к концу.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 201,
    countries: [{ name: 'Новая Зеландия' }, { name: 'США' }]
  },
  {
    id: 7,
    name: 'Форрест Гамп',
    alternativeName: 'Forrest Gump',
    year: 1994,
    rating: { kp: 9.0, imdb: 8.8 },
    genres: [{ name: 'драма' }, { name: 'мелодрама' }, { name: 'комедия' }],
    description: 'История простого человека, который стал свидетелем важнейших событий XX века.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 142,
    countries: [{ name: 'США' }]
  },
  {
    id: 8,
    name: 'Бойцовский клуб',
    alternativeName: 'Fight Club',
    year: 1999,
    rating: { kp: 8.64, imdb: 8.8 },
    genres: [{ name: 'триллер' }, { name: 'драма' }],
    description: 'Работник страховой компании создаёт подпольный бойцовский клуб.',
    poster: { url: 'https://static.tildacdn.com/tild3338-6365-4461-b832-356430613030/C39183F0-AF50-4C87-9.jpeg' },
    movieLength: 139,
    countries: [{ name: 'США' }, { name: 'Германия' }]
  }
];
