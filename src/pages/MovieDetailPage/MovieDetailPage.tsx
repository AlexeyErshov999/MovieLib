import { useEffect, useState, useMemo } from "react";
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
  ModalRoot,
  ModalPage,
} from "@vkontakte/vkui";
import {
  Icon24ArrowLeftOutline,
  Icon12Star,
  Icon24CalendarOutline,
  Icon24Favorite,
  Icon24ArrowLeftRightCornersOutline,
} from "@vkontakte/icons";
import { useUnit } from "effector-react";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import { favoritesModel } from "../../features/favorites/model";
import { comparisonModel, $comparisonStore } from "../../features/comparison/model/ComparisonStore";
import { $moviesStore, $moviesLoading } from "../../features/movies/model";
import styles from "./MovieDetailPage.module.css";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [modalAction, setModalAction] = useState<"add" | "remove" | null>(null);
  const [modalComparison, setModalComparison] = useState(false);

  const loading = useUnit($moviesLoading);
  const movies = useUnit($moviesStore);
  const comparisonMovies = useUnit($comparisonStore);

  const movie = useMemo(() => {
    return movies.find((m) => m.id === Number(id)) || null;
  }, [movies, id]);

  const isInComparison = movie ? comparisonMovies.some((m) => m.id === movie.id) : false;
  const comparisonCount = comparisonMovies.length;

  useEffect(() => {
    if (!movie) return;

    const unsubscribe = favoritesModel.subscribe((favMovies) => {
      setIsFavorite(favMovies.some((m) => m.id === movie.id));
    });

    return () => unsubscribe();
  }, [movie]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    setModalAction(isFavorite ? "remove" : "add");
  };

  const handleConfirm = () => {
    if (!movie) return;

    if (modalAction === "remove") {
      favoritesModel.remove(movie.id);
    } else {
      favoritesModel.add(movie);
    }
    setModalAction(null);
  };

  const handleCancel = () => {
    setModalAction(null);
  };

  const handleCompare = () => {
    if (isInComparison) {
      comparisonModel.remove(movie!.id);
    } else if (comparisonCount >= 2) {
      setModalComparison(true);
    } else {
      comparisonModel.add(movie!);
    }
  };

  const handleConfirmComparison = () => {
    if (movie) {
      comparisonModel.add(movie);
    }
    setModalComparison(false);
  };

  const handleCancelComparison = () => {
    setModalComparison(false);
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
          <IconButton onClick={handleCompare}>
            <Icon24ArrowLeftRightCornersOutline
              fill={
                isInComparison ? "#16ff01" : "var(--vkui--color_text_secondary)"
              }
              width={28}
              height={28}
            />
          </IconButton>
        )}
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

      <ModalRoot
        activeModal={modalAction ? "confirm-favorite" : undefined}
        onClose={handleCancel}
      >
        <ModalPage
          id="confirm-favorite"
          onClose={handleCancel}
          header={
            <Header>
              {modalAction === "add"
                ? "Добавить в избранное"
                : "Удалить из избранного"}
            </Header>
          }
        >
          <Group>
            <Box style={{ padding: 16, textAlign: "center" }}>
              <Text weight="2">
                {modalAction === "add"
                  ? `Вы уверены, что хотите добавить "${movieTitle}" в избранное?`
                  : `Вы уверены, что хотите удалить "${movieTitle}" из избранного?`}
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
              <Button size="l" mode="secondary" onClick={handleCancel}>
                Отмена
              </Button>
              <Button size="l" mode="primary" onClick={handleConfirm}>
                {modalAction === "add" ? "Добавить" : "Удалить"}
              </Button>
            </div>
          </Group>
        </ModalPage>
      </ModalRoot>

      <ModalRoot
        activeModal={modalComparison ? "confirm-comparison" : undefined}
        onClose={handleCancelComparison}
      >
        <ModalPage
          id="confirm-comparison"
          onClose={handleCancelComparison}
          header={<Header>Добавить в сравнение</Header>}
        >
          <Group>
            <Box style={{ padding: 16, textAlign: "center" }}>
              <Text weight="2">
                В сравнении уже 2 фильма. При добавлении нового первый будет заменён.
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
              <Button size="l" mode="secondary" onClick={handleCancelComparison}>
                Отмена
              </Button>
              <Button size="l" mode="primary" onClick={handleConfirmComparison}>
                Заменить
              </Button>
            </div>
          </Group>
        </ModalPage>
      </ModalRoot>
    </Box>
  );
};
