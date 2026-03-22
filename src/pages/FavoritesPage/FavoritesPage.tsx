import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Group,
  Header,
  Card,
  Text,
  Title,
  Caption,
  Box,
  Spinner,
  IconButton,
  Button,
  ModalRoot,
  ModalPage,
} from "@vkontakte/vkui";
import {
  Icon24ArrowLeftOutline,
  Icon12Star,
  Icon24FavoriteOutline,
  Icon24TrashSimpleOutline,
} from "@vkontakte/icons";
import { favoritesModel } from "../../features/favorites/model";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import type { Movie } from "../../api/types";
import { MovieFilters } from "../../features/filters";
import styles from "./FavoritesPage.module.css";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieToRemove, setMovieToRemove] = useState<Movie | null>(null);

  useEffect(() => {
    favoritesModel.init();

    const unsubscribe = favoritesModel.subscribe((movies) => {
      setFavorites(movies);
      setFilteredFavorites(movies);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFilter = (filtered: Movie[]) => {
    setFilteredFavorites(filtered);
  };

  const handleRemoveClick = (movie: Movie) => {
    setMovieToRemove(movie);
  };

  const handleConfirmRemove = () => {
    if (movieToRemove) {
      favoritesModel.remove(movieToRemove.id);
    }
    setMovieToRemove(null);
  };

  const handleCancelRemove = () => {
    setMovieToRemove(null);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box className={styles.container}>
      <div className={styles.header}>
        <IconButton onClick={() => navigate(-1)}>
          <Icon24ArrowLeftOutline />
        </IconButton>
      </div>

      {favorites.length === 0 ? (
        <Box className={styles.emptyState}>
          <Icon24FavoriteOutline
            className={styles.emptyIcon}
            width={48}
            height={48}
          />
          <Text weight="2" className={styles.emptyText}>
            Нет избранных фильмов
          </Text>
        </Box>
      ) : (
        <>
          <MovieFilters movies={favorites} onFilter={handleFilter} />

          <Group className={styles.scrollContent}>
            <Header>Найдено: {filteredFavorites.length}</Header>
            <div className={styles.grid}>
              {filteredFavorites.map((movie) => {
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
                    <IconButton
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(movie);
                      }}
                    >
                      <Icon24TrashSimpleOutline fill={'red'} width={20} height={20} />
                    </IconButton>

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

                      {rating && (
                        <div className={styles.ratingBadge}>
                          <Icon12Star
                            fill={ratingColor}
                            className={styles.trashIcon}
                          />
                          <Text
                            weight="2"
                            className={styles.ratingText}
                            style={{ color: ratingColor }}
                          >
                            {rating.toFixed(1)}
                          </Text>
                        </div>
                      )}

                      {movie.year && (
                        <div className={styles.yearBadge}>
                          <Caption level="2" className={styles.yearText}>
                            {movie.year}
                          </Caption>
                        </div>
                      )}
                    </div>

                    <div className={styles.content}>
                      <Title level="3" weight="2" className={styles.title}>
                        {movieTitle}
                      </Title>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Group>
        </>
      )}

      <ModalRoot
        activeModal={movieToRemove ? "confirm-remove" : undefined}
        onClose={handleCancelRemove}
      >
        <ModalPage
          id="confirm-remove"
          onClose={handleCancelRemove}
          header={<Header>Удалить из избранного</Header>}
        >
          <Group>
            <Box style={{ padding: 16, textAlign: "center" }}>
              <Text weight="2">
                {movieToRemove
                  ? `Вы уверены, что хотите удалить "${getMovieTitle(movieToRemove)}" из избранного?`
                  : ""}
              </Text>
            </Box>

            <div
              style={{
                display: "flex",
                gap: 12,
                padding: 16,
                justifyContent: "center",
              }}
            >
              <Button size="l" mode="secondary" onClick={handleCancelRemove}>
                Отмена
              </Button>
              <Button size="l" mode="primary" onClick={handleConfirmRemove}>
                Удалить
              </Button>
            </div>
          </Group>
        </ModalPage>
      </ModalRoot>
    </Box>
  );
};
