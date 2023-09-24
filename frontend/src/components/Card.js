import { Grid, Typography, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.primary.neat,
    color: theme.palette.primary.main,
  },
  body: {
    height: '12vh',
    textAlign: 'center'
  },
}));

export const Card = ({ mail }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.card}>
      <Paper elevation={4} className={classes.paper}>
        <Grid
          container
          justifyContent="space-around"
          direction="row"
          alignItems="center"
          className={classes.body}>
          <Grid item xs={12}>
            <Typography>№ {mail?.jobId}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{mail?.timePassed}</Typography>
          </Grid>
          <Grid item xs={3}>
            {mail?.status ? (
              <Typography>{mail.status}</Typography>
            ) : (
              <CircularProgress size={20} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
