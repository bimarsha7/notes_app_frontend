import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteNote, getAllNotes, updateNote } from '../api/notes';
import ScrollDialog from './ScrollDialog';
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
      <Box sx={{
        p: 2,
        mb: 0.5,
        color: '#000000',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'left'
      }}
      >
        {title}
        <DeleteIcon sx={{
          display: 'flex',
          textAlign: 'end',
          justifyContent: 'end',
          position: 'end',
          ml: 25,
          pr: 2
        }}
          onClick={handleDelete}
        />
      </Box>

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
