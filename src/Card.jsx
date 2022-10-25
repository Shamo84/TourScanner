import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';

export default function Card({
  image_id,
  title,
  url,
  bookmarkImg,
  parentFolder,
  activeFolder,
  deleteImage,
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
      {parentFolder && (
        <div className='icon'>
          {activeFolder === 'all images' ? (
            <div
              className='folder'
              style={{
                backgroundImage: 'url(/folder.png)',
              }}
            >
              {parentFolder}
            </div>
          ) : (
            <GiCrossMark onClick={() => deleteImage(parentFolder, image_id)} />
          )}
        </div>
      )}
      <div id='img-text'>
        <FaArrowRight />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
