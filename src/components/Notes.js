import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { deleteNote, updateNote } from '../api/notes';
import ReactQuill from 'react-quill';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import FormDialog from './ReminderDialog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function TextEditor({ id, title, content, readNotes }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteNote(id);
    readNotes()
  }
  const handleEdit = async (html) => {
    await updateNote(id, {
      title: title,
      content: html
    });
  }
  const handleReminder = () => {
    setOpen(true)
  }
  return (
    <Fragment>
      <Grid2 container spacing={2}>
        <Grid2 size={10} sx={{ textAlign: 'start', padding: 1, fontWeight: 600, fontSize: 15 }}>{title}</Grid2>
        <Grid2 size={2} sx={{ textAlign: 'center', padding: 1 }}>
          <DeleteIcon onClick={handleDelete}
          />
        </Grid2>
      </Grid2>

      <CardContent>
        <ReactQuill
          theme="snow"
          style={{ width: '35vw' }}
          value={content}
          onChange={handleEdit}
        />
      </CardContent>
      <CardActions>
        <NotificationAddIcon onClick={handleReminder} />
      </CardActions>
      <FormDialog
        id={id}
        title={title}
        content={content}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  )
};

export function NoteCard({ id, title, content, readNotes }) {

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <TextEditor id={id} title={title} content={content} readNotes={readNotes} />
      </Card>
    </Box >
  )
}

export default function Notes({ notes, readNotes }) {
  return (
    <>
      {
        notes.map((note) => (
          <Grid2 size={4}>
            <Item>
              <NoteCard
                id={note.id}
                title={note.title}
                content={note.content}
                readNotes={readNotes}
              />
            </Item>
          </Grid2>

        ))
      }

    </>
  )
}
