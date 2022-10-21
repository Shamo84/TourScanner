import React, { useState } from 'react';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SimpleDialog({
  open,
  setOpenDialog,
  imageNumber,
  updateTabs,
  currentImgId,
}) {
  const [input, setInput] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const onClose = () => {
    console.log('close');
    setOpenDialog(false);
    setInput('');
  };

  const handleSendFolderName = () => {
    setDisableButton(true);
    axios
      .post(`https://tourscanner.com/interview/save_image/${currentImgId}`)
      .then(res => {
        setDisableButton(false);
        console.log(res);
        updateTabs(input);
        setOpenDialog(false);
        localStorage.setItem(input, currentImgId);
        setInput('');
      });
  };

  return (
    <>
      <Dialog onClose={onClose} open={open}>
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
          />
          <DialogActions>
            <Button
              disabled={disableButton}
              autoFocus
              onClick={handleSendFolderName}
            >
              SEND
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
