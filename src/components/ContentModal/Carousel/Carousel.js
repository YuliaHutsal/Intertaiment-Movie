import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { img_300, noPicture } from '../../../config/config';

const handleDragStart = (e) => e.preventDefault();


const Carousel = (media_type, id) => {
  const [credits, setCredits] = useState();

 const items = credits?.map((c) => (
<div className='carouselItem'>
  <img
  src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
  alt={c?.name}
  onDragStart={handleDragStart}
  className="carouselItem_img"
  />
  <b className='carouselItem_txt'>{c?.name}</b>
</div>
 ));

  const fetchCredits = async() => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() =>{
    fetchCredits();
  },[])

  return (
    <AliceCarousel mouseTracking items={items} />
  );
};
export default Carousel;