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
  updateTabs,
  currentImgId,
  savedFolders,
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
        setInput('');
        if (response.data.success) {
          setServerResponse('SUCCESS');
          updateTabs(input, currentImgId);
          localStorage.setItem(
            'folders',
            JSON.stringify(merge(savedFolders, { [input]: [currentImgId] }))
          );
        } else {
          setServerResponse('FAILURE');
        }
        setTimeout(() => {
          setOpenDialog(false);
          setDisableButton(false);
        }, 1000);
        setTimeout(() => {
          setServerResponse('');
        }, 1200);
      })
      .catch(error => console.error(error));
  };

  return (
    <Dialog onClose={onClose} open={open}>
      {serverResponse !== '' ? (
        <DialogTitle>The operation was a {serverResponse}</DialogTitle>
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
