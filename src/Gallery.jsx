import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import SimpleDialog from './SimpleDialog';
const merge = require('deepmerge');

export default function Gallery() {
  const [cats, setCats] = useState([]);
  const [activeFolder, setActiveFolder] = useState('all images');
  const [openDialog, setOpenDialog] = useState(false);
  const [imageNumber, setImageNumber] = useState(null);
  const [currentImgId, setCurrentImgId] = useState(null);
  const [savedFolders, setSavedFolders] = useState({});
  const [fixedTabs, setFixedTabs] = useState(false);

  useEffect(() => {
    let newFolders = JSON.parse(localStorage.getItem('folders'));
    newFolders = newFolders ? newFolders : {};
    setSavedFolders(prev => merge(prev, newFolders));
    axios
      .get(`https://tourscanner.com/interview/images`)
      .then(response => {
        setCats(response.data);
      })
      .catch(error => console.error(error));
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setFixedTabs(true);
      } else {
        setFixedTabs(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bookmarkImg = image_id => {
    setCurrentImgId(image_id);
    axios
      .get(`https://tourscanner.com/interview/save_image/${image_id}`)
      .then(response => {
        setImageNumber(response.data);
        setOpenDialog(true);
      })
      .catch(error => console.error(error));
  };

  const updateTabs = (newFolder, image_id) => {
    setSavedFolders(prev => merge(prev, { [newFolder]: [image_id] }));
  };

  return (
    <div id='kitten-gallery' className={fixedTabs ? 'fixedTabs' : ''}>
      <h1>Adoptable Kittens</h1>
      <div id='tab-container'>
        <div id='tab-wrapper'>
          <div
            key={0}
            className={activeFolder === 'all images' ? 'active' : ''}
            onClick={() => setActiveFolder('all images')}
          >
            {'all images'}
          </div>
          {Object.keys(savedFolders).map((folder, i) => {
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
      </div>
      <div id='cards-container'>
        <div id='cards-wrapper'>
          {cats
            .filter(cat => {
              return (
                activeFolder === 'all images' ||
                savedFolders[activeFolder].includes(cat.image_id)
              );
            })
            .map(cat => {
              return (
                <Card
                  {...cat}
                  key={cat.image_id}
                  bookmarkImg={bookmarkImg}
                  bookmarked={Object.values(savedFolders)
                    .flat()
                    .includes(cat.image_id)}
                />
              );
            })}
        </div>
      </div>
      <SimpleDialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        imageNumber={imageNumber}
        updateTabs={updateTabs}
        currentImgId={currentImgId}
        savedFolders={savedFolders}
      />
    </div>
  );
}
