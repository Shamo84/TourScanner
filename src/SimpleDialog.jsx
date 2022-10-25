import React, { useState } from 'react';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const merge = require('deepmerge');

export default function SimpleDialog({
  open,
  setOpenDialog,
  imageNumber,
  currentImgId,
  savedFolders,
  updateFromStorage,
}) {
  const [input, setInput] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const onClose = () => {
    setOpenDialog(false);
    setInput('');
  };

  const handleSendFolderName = () => {
    setDisableButton(true);
    axios
      .post(`https://tourscanner.com/interview/save_image/${currentImgId}`)
      .then(response => {
        if (response.data.success) {
          setServerResponse('SUCCESS');
          localStorage.setItem(
            'folders',
            JSON.stringify(merge(savedFolders, { [input]: [currentImgId] }))
          );
          updateFromStorage();
        } else {
          setServerResponse('FAILURE');
        }
        setTimeout(() => {
          setOpenDialog(false);
          setDisableButton(false);
          setInput('');
        }, 600);
        setTimeout(() => {
          setServerResponse('');
        }, 800);
      })
      .catch(error => console.error(error));
  };

  return (
    <Dialog onClose={onClose} open={open}>
      {serverResponse !== '' ? (
        <DialogTitle>The operation was a {serverResponse}!</DialogTitle>
      ) : (
        <>
          <DialogTitle>
            This image has been bookmarked {imageNumber} time
            {imageNumber === 1 ? '' : 's'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='What folder do you wish to save the image in?'
              fullWidth
              variant='standard'
              placeholder='Folder Name'
              value={input}
              onChange={e => {
                setInput(e.target.value);
              }}
              onKeyUp={key =>
                key.code.includes('Enter') && input.trim()
                  ? handleSendFolderName()
                  : ''
              }
            />
            {Object.keys(savedFolders).length > 0 && (
              <ul id='folder-list'>
                Existing Folders:
                {Object.keys(savedFolders).map((folder, i) => (
                  <li key={i} onClick={() => setInput(folder)}>
                    - {folder}
                  </li>
                ))}
              </ul>
            )}
            <DialogActions>
              <Button
                disabled={disableButton || !input.trim()}
                variant='contained'
                autoFocus
                onClick={handleSendFolderName}
              >
                SEND
              </Button>
            </DialogActions>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
