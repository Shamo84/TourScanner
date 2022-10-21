import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Card({ image_id, title, url, bookmarkImg }) {
  return (
    <div className='card'>
      <img src={url} alt='no img' onClick={() => bookmarkImg(image_id)} />
      <div id='img-text'>
        <FaArrowRight />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
