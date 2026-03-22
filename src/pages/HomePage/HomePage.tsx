import {
  Group,
  Header,
  Card,
  Text,
  Title,
  Caption,
  Box,
  Spinner,
} from "@vkontakte/vkui";
import { Icon12Star } from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MOVIES } from "../../constants/movies";
import type { Movie } from "../../api/types";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import { MovieFilters } from "../../features/filters";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setMovies(MOCK_MOVIES);
        setFilteredMovies(MOCK_MOVIES);
        await new Promise((res) => setTimeout(() => res(null), 800));
      } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleFilter = (filtered: Movie[]) => {
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <Box className={styles.container}>
        <div className={styles.spinnerContainer}>
          <Spinner size="xl" />
        </div>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <div className={styles.filters}>
        <MovieFilters movies={movies} onFilter={handleFilter} />
      </div>

      <Group className={styles.scrollContent}>
        <Box className={styles.resultsHeader}>
          <Header>Найдено фильмов: {filteredMovies.length}</Header>
        </Box>
        <div className={styles.grid}>
          {filteredMovies.map((movie) => {
            const posterUrl = getPosterUrl(movie);
            const movieTitle = getMovieTitle(movie);
            const rating = movie.rating?.kp || movie.rating?.imdb;
            const ratingColor = rating ? getRatingColor(rating) : undefined;

            return (
              <Card
                key={movie.id}
                mode="outline"
                className={styles.card}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className={styles.posterContainer}>
                  {posterUrl ? (
                    <div className={styles.posterWrapper}>
                      <img
                        src={posterUrl}
                        alt={movieTitle}
                        className={styles.posterImage}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className={styles.posterPlaceholder}>
                      <Text weight="2" className={styles.placeholderText}>
                        {movieTitle}
                      </Text>
                    </div>
                  )}

                  <div className={styles.ratingBadge}>
                    {rating ? (
                      <>
                        <Icon12Star
                          fill={ratingColor}
                          className={styles.starIcon}
                        />
                        <Text
                          weight="2"
                          className={styles.ratingText}
                          style={{ color: ratingColor }}
                        >
                          {rating.toFixed(1)}
                        </Text>
                      </>
                    ) : (
                      <Text weight="2" className={styles.noRatingText}>
                        Нет рейтинга
                      </Text>
                    )}
                  </div>
                </div>

                <div className={styles.content}>
                  <div className={styles.yearBadge}>
                    <Caption level="2" className={styles.yearText}>
                      {movie.year || "Нет года"}
                    </Caption>
                  </div>
                  <Title level="3" weight="2" className={styles.title}>
                    {movieTitle}
                  </Title>
                </div>
              </Card>
            );
          })}
        </div>
      </Group>
    </Box>
  );
};
