import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Card({ title, url }) {
  return (
    <div className='card'>
      <img src={url} alt='no img' />
      <div id='img-text'>
        <FaArrowRight />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
