import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import SimpleDialog from './SimpleDialog';

export default function Gallery() {
  const [cats, setCats] = useState([]);
  const [folderNames, setFolderNames] = useState(['all images']);
  const [activeFolder, setActiveFolder] = useState('all images');
  const [openDialog, setOpenDialog] = useState(false);
  const [imageNumber, setImageNumber] = useState(null);
  const [currentImgId, setCurrentImgId] = useState(null);

  useEffect(() => {
    axios.get(`https://tourscanner.com/interview/images`).then(res => {
      const posts = res.data;
      setCats(posts);
    });
  }, []);

  const bookmarkImg = image_id => {
    setCurrentImgId(image_id);
    axios
      .get(`https://tourscanner.com/interview/save_image/${image_id}`)
      .then(res => {
        setImageNumber(res.data);
        setOpenDialog(true);
      });
  };

  const updateTabs = newFolder => {
    if (!folderNames.includes(newFolder) && newFolder.trim() !== '') {
      setFolderNames(prev => [...prev, newFolder]);
    }
  };

  return (
    <div id='kitten-gallery'>
      <h1>Adoptable Kittens</h1>
      <div id='tab-container'>
        {folderNames.map((folder, i) => {
          return (
            <div
              key={i}
              className={activeFolder === folder ? 'active' : ''}
              onClick={() => setActiveFolder(folder)}
            >
              {folder}
            </div>
          );
        })}
      </div>
      <div id='cards-wrapper'>
        {cats.map(cat => {
          return <Card {...cat} key={cat.image_id} bookmarkImg={bookmarkImg} />;
        })}
      </div>
      <SimpleDialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        imageNumber={imageNumber}
        updateTabs={updateTabs}
        currentImgId={currentImgId}
      />
    </div>
  );
}
