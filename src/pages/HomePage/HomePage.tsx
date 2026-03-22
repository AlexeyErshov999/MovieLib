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
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { $moviesStore, $moviesLoading, $loadingMore, $hasMore, moviesModel } from "../../features/movies/model";
import type { Movie } from "../../api/types";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import { MovieFilters } from "../../features/filters";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const movies = useUnit($moviesStore);
  const loading = useUnit($moviesLoading);
  const loadingMore = useUnit($loadingMore);
  const hasMore = useUnit($hasMore);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleFilter = (filtered: Movie[]) => {
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    if (loading) return;

    const root = scrollContainerRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || loadingMore || !hasMore) return;
        moviesModel.loadMore();
      },
      { root, rootMargin: "240px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, loadingMore, hasMore]);

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

      <div 
        ref={scrollContainerRef}
        className={styles.scrollContent}
      >
        <Group>
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

          {loadingMore && (
            <div className={styles.loadingMore}>
              <Spinner size="m" />
            </div>
          )}
          <div
            ref={sentinelRef}
            className={styles.scrollSentinel}
            aria-hidden
          />
        </Group>
      </div>
    </Box>
  );
};
