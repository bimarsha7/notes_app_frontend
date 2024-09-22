import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function AddButton({ handleClickOpen }) {

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
