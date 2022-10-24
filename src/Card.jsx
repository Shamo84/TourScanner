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
    <div
      className={`card ${
        parentFolder && activeFolder === 'all images'
          ? 'bookmarked'
          : parentFolder
          ? 'noPointer'
          : ''
      }`}
    >
      <img src={url} alt='no img' onClick={() => bookmarkImg(image_id)} />
      {parentFolder && activeFolder === 'all images' && (
        <div
          className='folder'
          style={{
            backgroundImage: 'url(/folder.png)',
          }}
        >
          {parentFolder}
        </div>
      )}
      <div id='img-text'>
        <FaArrowRight />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
