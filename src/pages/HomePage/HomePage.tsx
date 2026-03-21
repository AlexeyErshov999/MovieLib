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
import { MOCK_MOVIES } from "../../constants/movies";
import type { Movie } from "../../api/types";
import { moviesService } from "../../api/services/movies";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesResponse = await moviesService.getMovies();
        setMovies(moviesResponse.docs);
        await new Promise(res => setTimeout(() => res(null), 2000));
      } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
        setMovies(MOCK_MOVIES);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box className={styles.container}>
      <Group>
        <Header>Популярные фильмы</Header>
        <div className={styles.grid}>
          {movies.map((movie) => {
            const posterUrl = getPosterUrl(movie);
            const movieTitle = getMovieTitle(movie);
            const rating = movie.rating?.kp || movie.rating?.imdb;
            const ratingColor = rating ? getRatingColor(rating) : undefined;

            return (
              <Card
                key={movie.id}
                mode="outline"
                className={styles.card}
                onClick={() => console.log("Movie clicked:", movie.id)}
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
                        <Icon12Star fill={ratingColor} className={styles.starIcon} />
                        <Text weight="2" className={styles.ratingText} style={{ color: ratingColor }}>
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