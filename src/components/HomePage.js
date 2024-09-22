import { useState, useEffect, useMemo } from 'react';
import SearchAppBar from './SearchAppBar';
import AddButton from './AddButton';
import ScrollDialog from './ScrollDialog';
import Notes from './Notes';
import { Grid2 } from '@mui/material';
import { getAllNotes } from '../api/notes';


export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const readNotes = async () => {
    const data = await getAllNotes();
    setNotes(data)
  };

  useEffect(() => {
    readNotes();
  }, [open]);
  return (
    <>
      <SearchAppBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AddButton
        handleClickOpen={handleClickOpen}
      />
      <ScrollDialog
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Notes
          notes={filteredNotes}
          readNotes={readNotes}
        />
      </Grid2>

    </>
  )
}