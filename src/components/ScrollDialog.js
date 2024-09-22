import { Fragment, useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import { createNote, updateNote } from '../api/notes';

export default function ScrollDialog({ open, setOpen, scroll, title, setTitle, setScroll, content }) {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newId, setNewId] = useState();

  const resetData = () => {
    setNewId();
    setNewTitle('');
    setNewContent('');
  }

  const handleClose = () => {
    setOpen(false);
    // resetData();
  };

  const saveNote = async () => {
    const res = await createNote({
      title: newTitle,
      content: newContent
    })
    setNewId(res.id)
  }

  const editNote = async () => {
    try {
      await updateNote(newId, {
        title: newTitle,
        content: newContent
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }

      if (open === true) {
        saveNote();
      }
      resetData();
    }
  }, [open]);

  useEffect(() => {
    if (newTitle || newContent) {
      editNote();
    }
  }, [newTitle, newContent])

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        width="lg"
      >
        <DialogTitle id="scroll-dialog-title">
          <TextField
            fullWidth
            label="Title"
            id="standard-size-small"
            defaultValue={newTitle}
            size="small"
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ReactQuill
              theme="snow"
              style={{ height: '40vh', width: '40vw' }}
              value={newContent}
              onChange={(html) => setNewContent(html)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment >
  );
}
