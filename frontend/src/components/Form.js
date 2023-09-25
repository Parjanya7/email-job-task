import { TextField, Button } from '@mui/material';

export const Form = ({ handleChange, handleSubmit, input, isCorrectInput }) => {
  return (
    <form className="amount-form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        error={!isCorrectInput}
        name="amount"
        color="success"
        size="medium"
        label="Number of Emails to be sent"
        value={input}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <Button type="submit" disabled={!isCorrectInput} color="info" variant="contained" size="small" style={{ width: "200px" }}>
        Trigger
      </Button>
    </form>
  );
};
