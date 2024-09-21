import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Icon } from '@mui/material';
import ScrollDialog from './ScrollDialog';

export default function AddButton({ open, setOpen, scroll, setScroll, handleClickOpen }) {

  return (
    <Stack direction="row" spacing={1} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: 3
    }}>
      <Button variant="contained" onClick={handleClickOpen('paper')}>
        Add Note
      </Button>
    </Stack>
  );
}
