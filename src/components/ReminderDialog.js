import { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasicDateTimePicker from './DateTimePicker';
import { sendNoteReminder } from '../api/notes';
import dayjs from 'dayjs';


export default function FormDialog({ id, open, setOpen }) {
  const [dateTimeValue, setDateTimeValue] = useState(dayjs());

  const handleClose = () => {
    setOpen(false);
  };

  const sendReminder = async (email) => {
    await sendNoteReminder(id, {
      email: email,
      reminder_time: dateTimeValue.toISOString(),
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    sendReminder(email)
    handleClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            handleSubmit(event)
          },
        }}
      >
        <DialogTitle>Reminder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send reminder, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <BasicDateTimePicker
            dateTimeValue={dateTimeValue}
            setDateTimeValue={setDateTimeValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Remind</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
