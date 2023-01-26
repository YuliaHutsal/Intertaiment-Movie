import axios from 'axios';
import Chip from '@mui/material/Chip';
import React, { useEffect } from 'react';

export const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    )
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(
      // `https://api.themoviedb.org/3/genre//list?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
      );
    setGenres(data.genres)
  };

  console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    }
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          style={{ margin: 2 }}
          size='small'
          color="primary"
          key={genre.id}
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          label={genre.name}
          style={{ margin: 2, backgroundColor:"white", color:"black" }}
          size='small'
          key={genre.id}
          clickable
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

