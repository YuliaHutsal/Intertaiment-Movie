import axios from 'axios';
import Chip from 'material-ui/Chip';
import React, { useEffect } from 'react';

export const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {

  const handleAdd=(genre)=>{
    setSelectedGenres([...selectedGenres, genre]);
      setGenres(genres.filter((g) => g.id !==genre.id));
    };
  const fetchGenres = async() => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
    );
    setGenres(data.genres)
  };

  console.log(genres);

useEffect(() => {
  fetchGenres();
  return()=>{
    setGenres([]);
  }
},[]);

  return (
    <div style={{padding:"6px 0"}}>
      {selectedGenres && selectedGenres.map((genre) => (
      <Chip 
      label={genre.name} 
      style={{margin: 2}} 
      size='small' 
      color="primary"
      key={genre.id} 
      clickable/>
      ))}
      {genres && genres.map((genre) => (
      <Chip 
      label={genre.name} 
      style={{margin: 2}} 
      size='small' 
      key={genre.id} 
      clickable/>
      ))}
    </div>
  );
};

