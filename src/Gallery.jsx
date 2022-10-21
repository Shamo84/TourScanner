import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import SimpleDialogDemo from './SimpleDialog';

export default function Gallery() {
  const [cats, setCats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemNumber, setItemNumber] = useState(null);

  useEffect(() => {
    axios.get(`https://tourscanner.com/interview/images`).then(res => {
      const posts = res.data;
      setCats(posts);
    });
  }, []);

  const bookmarkImg = image_id => {
    axios
      .get(`https://tourscanner.com/interview/save_image/${image_id}`)
      .then(res => {
        setItemNumber(res.data);
        setOpenDialog(true);
      });
  };

  return (
    <div id='kitten-gallery'>
      <div className='container'>
        {cats.map(cat => {
          return <Card {...cat} key={cat.image_id} bookmarkImg={bookmarkImg} />;
        })}
      </div>
      <SimpleDialogDemo
        open={openDialog}
        itemNumber={itemNumber}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}
