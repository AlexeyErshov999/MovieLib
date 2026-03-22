import { useNavigate } from "react-router-dom";
import {
  Text,
  Box,
  IconButton,
} from "@vkontakte/vkui";
import {
  Icon24ArrowLeftOutline,
  Icon24Favorite,
  Icon12Star,
  Icon24TrashSimpleOutline,
} from "@vkontakte/icons";
import { useUnit } from "effector-react";
import { comparisonModel, $comparisonStore } from "../../features/comparison/model/ComparisonStore";
import { getMovieTitle, getPosterUrl, getRatingColor } from "../../utils/movie";
import styles from "./ComparisonPage.module.css";

export const ComparisonPage = () => {
  const navigate = useNavigate();
  const movies = useUnit($comparisonStore);

  const handleRemove = (movieId: number) => {
    comparisonModel.remove(movieId);
  };

  return (
    <Box className={styles.container}>
      <div className={styles.header}>
        <IconButton onClick={() => navigate(-1)}>
          <Icon24ArrowLeftOutline />
        </IconButton>
      </div>

      {movies.length === 0 ? (
        <Box className={styles.emptyState}>
          <Icon24Favorite className={styles.emptyIcon} width={48} height={48} />
          <Text weight="2" className={styles.emptyText}>
            Выберите фильмы для сравнения
          </Text>
          <Text
            weight="1"
            className={styles.emptyText}
            style={{ marginTop: 8, fontSize: 14 }}
          >
            Нажмите "Сравнить" на странице фильма
          </Text>
        </Box>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Параметр</th>
                {movies.map((movie) => (
                  <th key={movie.id} className={styles.movieColumn}>
                    <div className={styles.posterWrapper}>
                      {getPosterUrl(movie) ? (
                        <img
                          src={getPosterUrl(movie)!}
                          alt={getMovieTitle(movie)}
                          className={styles.posterImage}
                        />
                      ) : (
                        <div className={styles.posterPlaceholder}>
                          <Text weight="2" className={styles.placeholderText}>
                            {getMovieTitle(movie)}
                          </Text>
                        </div>
                      )}
                    </div>
                    <div className={styles.movieTitle}>
                      {getMovieTitle(movie)}
                      <IconButton
                        className={styles.removeButton}
                        onClick={() => handleRemove(movie.id)}
                      >
                        <Icon24TrashSimpleOutline />
                      </IconButton>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.rowLabel}>Год выпуска</td>
                {movies.map((movie) => (
                  <td key={movie.id}>{movie.year || "—"}</td>
                ))}
              </tr>
              <tr>
                <td className={styles.rowLabel}>Рейтинг</td>
                {movies.map((movie) => {
                  const rating = movie.rating?.kp || movie.rating?.imdb;
                  const ratingColor = rating
                    ? getRatingColor(rating)
                    : undefined;
                  return (
                    <td key={movie.id}>
                      {rating ? (
                        <div className={styles.ratingBadge}>
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
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className={styles.rowLabel}>Жанр</td>
                {movies.map((movie) => (
                  <td key={movie.id}>
                    {movie.genres && movie.genres.length > 0 ? (
                      <div className={styles.genreList}>
                        {movie.genres.map((genre, index) => (
                          <span key={index} className={styles.genreBadge}>
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={styles.rowLabel}>Длительность</td>
                {movies.map((movie) => (
                  <td key={movie.id}>{movie.movieLength} мин</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
};
