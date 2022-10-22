import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Card({
  image_id,
  title,
  url,
  bookmarkImg,
  parentFolder,
  activeFolder,
}) {
  return (
    <div className={`card ${parentFolder ? 'bookmarked' : ''}`}>
      <img src={url} alt='no img' onClick={() => bookmarkImg(image_id)} />
      {parentFolder && activeFolder === 'all images' && (
        <div className='folder'>{parentFolder}</div>
      )}
      <div id='img-text'>
        <FaArrowRight />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
