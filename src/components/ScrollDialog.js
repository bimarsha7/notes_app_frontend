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

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async (id, data) => {
    try {
      const response = await updateNote(id, data);
      if (response) {
        setNewTitle(response.title)
        setNewContent(response.content)
      }
      return;
    } catch (error) {
      throw error;
    }
  };

  const handleSave = async (data) => {
    try {
      if (newId) {
        handleEdit(newId, data)
        return;
      }
      const response = await createNote(data);
      if (response) {
        setNewId(response.id)
      }
    } catch (error) {
      throw error;
    }
  }

  const handleContentChange = (html) => {
    setNewContent(html);
    if (newTitle && newContent) {
      handleSave({
        title: newTitle,
        content: html
      });
    }
    if (!newTitle) {
      alert("Provide title to save.")
    }
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
            defaultValue={title}
            size="small"
            variant="standard"
            value={title}
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
              onChange={handleContentChange}
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
