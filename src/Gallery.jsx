import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

export default function Gallery() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios.get(`https://tourscanner.com/interview/images`).then(res => {
      const posts = res.data;
      setCats(posts);
      console.log(posts);
    });
  }, []);

  console.log(cats);

  return (
    <div id='kitten-gallery'>
      <div className='container'>
        {cats.map(cat => {
          return <Card {...cat} key={cat.image_id} />;
        })}
      </div>
    </div>
  );
}
