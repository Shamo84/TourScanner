import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function SimpleDialog({ onClose, selectedValue, open, itemNumber }) {
  const handleClose = () => {
    onClose(selectedValue);
    console.log('close');
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        This image has been bookmarked {itemNumber} time
        {itemNumber > 1 ? 's' : ''}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          What folder do you wish to save the image in?
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Folder Name'
          fullWidth
          variant='standard'
        />
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ open, itemNumber, setOpenDialog }) {
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClose = value => {
    setSelectedValue(value);
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography variant='subtitle1' component='div'>
        Selected: {selectedValue}
      </Typography>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        itemNumber={itemNumber}
      />
    </div>
  );
}
