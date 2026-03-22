import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Group,
  Header,
  FormItem,
  Select,
  Slider,
  Input,
  Button,
  FormLayoutGroup,
  Button as TagButton,
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";
import type { Movie } from "../../api/types";
import { ALL_GENRES } from "../../constants/genres";

interface MovieFiltersProps {
  movies: Movie[];
  onFilter: (filteredMovies: Movie[]) => void;
}

const currentYear = new Date().getFullYear();

export const MovieFilters = ({ movies, onFilter }: MovieFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genresParam = searchParams.get("genres");
    return genresParam ? genresParam.split(",") : [];
  });

  const [ratingRange, setRatingRange] = useState<[number, number]>(() => {
    const min = searchParams.get("ratingMin");
    const max = searchParams.get("ratingMax");
    return [
      min ? parseFloat(min) : 0,
      max ? parseFloat(max) : 10,
    ];
  });

  const [yearFrom, setYearFrom] = useState<string>(() => {
    return searchParams.get("yearFrom") || "1900";
  });

  const [yearTo, setYearTo] = useState<string>(() => {
    return searchParams.get("yearTo") || String(currentYear);
  });

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    }
    if (ratingRange[0] !== 0) {
      params.set("ratingMin", String(ratingRange[0]));
    }
    if (ratingRange[1] !== 10) {
      params.set("ratingMax", String(ratingRange[1]));
    }
    if (yearFrom !== "1900") {
      params.set("yearFrom", yearFrom);
    }
    if (yearTo !== String(currentYear)) {
      params.set("yearTo", yearTo);
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedGenres, ratingRange, yearFrom, yearTo, setSearchParams]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (selectedGenres.length > 0) {
        const movieGenres = movie.genres?.map((genre) => genre.name.toLowerCase()) || [];
        const hasGenre = selectedGenres.some((genre) =>
          movieGenres.includes(genre.toLowerCase())
        );
        if (!hasGenre) return false;
      }

      const rating = movie.rating?.kp || movie.rating?.imdb;
      if (rating) {
        if (rating < ratingRange[0] || rating > ratingRange[1]) {
          return false;
        }
      }

      const movieYear = movie.year;
      if (movieYear !== undefined && movieYear !== null) {
        const from = parseInt(yearFrom) || 1900;
        const to = parseInt(yearTo) || currentYear;
        if (movieYear < from || movieYear > to) {
          return false;
        }
      }

      return true;
    });
  }, [movies, selectedGenres, ratingRange, yearFrom, yearTo]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedGenres.includes(value)) {
      setSelectedGenres([...selectedGenres, value]);
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genreToRemove));
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setRatingRange([0, 10]);
    setYearFrom("1900");
    setYearTo(String(currentYear));
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    onFilter(filteredMovies);
  }, [filteredMovies, onFilter]);

  return (
    <Group>
      <Header>Фильтры</Header>
      <FormLayoutGroup>
        <FormItem top="Жанры">
          <Select
            placeholder="Выберите жанр"
            options={ALL_GENRES}
            value=""
            onChange={handleGenreChange}
            searchable
            style={{ width: "100%" }}
          />
          
          {selectedGenres.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {selectedGenres.map((genre) => {
                const genreLabel = ALL_GENRES.find((g) => g.value === genre)?.label || genre;
                return (
                  <TagButton
                    key={genre}
                    mode="secondary"
                    size="s"
                    onClick={() => removeGenre(genre)}
                    after={
                      <Icon16Clear
                        style={{ marginLeft: 4, opacity: 0.7 }}
                      />
                    }
                  >
                    {genreLabel}
                  </TagButton>
                );
              })}
            </div>
          )}
        </FormItem>

        <FormItem top={`Рейтинг: ${ratingRange[0]} - ${ratingRange[1]}`}>
          <Slider
            step={0.1}
            min={0}
            max={10}
            value={ratingRange}
            onChange={setRatingRange}
            multiple
          />
        </FormItem>

        <FormItem top="Год выпуска">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Input
              type="number"
              placeholder="От"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              min={1900}
              max={currentYear}
              style={{ width: 100 }}
            />
            <span>—</span>
            <Input
              type="number"
              placeholder="До"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              min={1900}
              max={currentYear}
              style={{ width: 100 }}
            />
          </div>
        </FormItem>

        <FormItem style={{ display: "flex", justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
          <Button
            size="m"
            mode="secondary"
            onClick={handleReset}
            before={<Icon16Clear />}
          >
            Сбросить
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </Group>
  );
};
