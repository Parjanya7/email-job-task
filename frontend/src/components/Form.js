import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Form = ({ handleChange, handleSubmit, input, isCorrectInput }) => {
  return (
    <form className="amount-form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        error={!isCorrectInput}
        fullWidth
        name="amount"
        label="Amount of letters"
        variant="standard"
        helperText="Insert Number of Emails"
        value={input}
        onChange={handleChange}
      />
      <IconButton size="large" type="submit" disabled={!isCorrectInput}>
        <SendIcon fontSize="large" />
      </IconButton>
    </form>
  );
};
