import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Group,
  Header,
  Card,
  Text,
  Title,
  Caption,
  Box,
  Spinner,
  Button,
  IconButton,
  ContentBadge,
} from "@vkontakte/vkui";
import {
  Icon24ArrowLeftOutline,
  Icon12Star,
  Icon24CalendarOutline,
  Icon24Favorite,
} from "@vkontakte/icons";
import type { Movie } from "../../api/types";
import { MOCK_MOVIES } from "../../constants/movies";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import { favoritesModel } from "../../features/favorites/model";
import styles from "./MovieDetailPage.module.css";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const foundMovie = MOCK_MOVIES.find((m) => m.id === Number(id));
        setMovie(foundMovie || null);
        if (foundMovie) {
          setIsFavorite(favoritesModel.isFavorite(foundMovie.id));
        }
        await new Promise((res) => setTimeout(() => res(null), 800));
      } catch (error) {
        console.error("Ошибка загрузки фильма:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // Подписка на изменения избранного
  useEffect(() => {
    if (!movie) return;

    const unsubscribe = favoritesModel.subscribe((movies) => {
      setIsFavorite(movies.some((m) => m.id === movie.id));
    });

    return () => unsubscribe();
  }, [movie]);

  const handleToggleFavorite = () => {
    if (!movie) return;

    if (isFavorite) {
      favoritesModel.remove(movie.id);
    } else {
      favoritesModel.add(movie);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!movie) {
    return (
      <Box className={styles.notFoundContainer}>
        <Group>
          <Header>Фильм не найден</Header>
          <Box>
            <Button onClick={() => navigate(-1)}>Назад</Button>
          </Box>
        </Group>
      </Box>
    );
  }

  const posterUrl = getPosterUrl(movie);
  const movieTitle = getMovieTitle(movie);
  const rating = movie.rating?.kp || movie.rating?.imdb;
  const ratingColor = rating ? getRatingColor(rating) : undefined;

  return (
    <Box className={styles.container}>
      <div className={styles.headerButtons}>
        <IconButton onClick={() => navigate(-1)} className={styles.backButton}>
          <Icon24ArrowLeftOutline />
        </IconButton>
        {movie && (
          <IconButton onClick={handleToggleFavorite}>
            {isFavorite ? (
              <Icon24Favorite fill="#16ff01" width={30} height={30} />
            ) : (
              <Icon24Favorite fill="#e64646" width={30} height={30} />
            )}
          </IconButton>
        )}
      </div>

      <Group>
        <div className={styles.contentWrapper}>
          <Card mode="outline" className={styles.posterCard}>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movieTitle}
                className={styles.posterImage}
              />
            ) : (
              <div className={styles.posterPlaceholder}>
                <Text weight="2" className={styles.posterPlaceholderText}>
                  Нет постера
                </Text>
              </div>
            )}
          </Card>

          <div className={styles.infoSection}>
            <Title level="1" weight="2" className={styles.title}>
              {movieTitle}
            </Title>

            {movie.alternativeName && movie.name !== movie.alternativeName && (
              <Caption level="1" className={styles.alternativeName}>
                {movie.alternativeName}
              </Caption>
            )}

            {rating ? (
              <div className={styles.ratingContainer}>
                <Icon12Star fill={ratingColor} width={24} height={24} />
                <Text
                  weight="2"
                  className={styles.ratingValue}
                  style={{ color: ratingColor }}
                >
                  {rating.toFixed(1)}
                </Text>
                {movie.rating?.imdb && (
                  <Caption level="1" className={styles.imdbRating}>
                    IMDb: {movie.rating.imdb.toFixed(1)}
                  </Caption>
                )}
              </div>
            ) : (
              <Text weight="2" className={styles.noRating}>
                Нет рейтинга
              </Text>
            )}

            {movie.year ? (
              <div className={styles.yearContainer}>
                <Icon24CalendarOutline
                  fill="var(--vkui--color_text_secondary)"
                  width={20}
                  height={20}
                />
                <Text>{movie.year}</Text>
              </div>
            ) : (
              <Text weight="2" className={styles.noYear}>
                Нет года
              </Text>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className={styles.genresSection}>
                <Caption level="1" className={styles.genresLabel}>
                  Жанры
                </Caption>
                <div className={styles.genresList}>
                  {movie.genres?.map(({ name }, index) => (
                    <ContentBadge key={index} className={styles.genreBadge}>
                      {name}
                    </ContentBadge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Group>

      <Group className={styles.descriptionGroup}>
        <Header>Описание</Header>
        <Box>
          <Text className={styles.descriptionText}>
            {movie.description || "Описание отсутствует"}
          </Text>
        </Box>
      </Group>
    </Box>
  );
};
