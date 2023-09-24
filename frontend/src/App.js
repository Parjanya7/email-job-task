import { useState, useMemo, useEffect, useCallback } from 'react';
import moment from 'moment';

import { setEmailAmount, sortDctionary } from './helper';
import { useSocket } from './hooks/useSocket';
import { Form } from './components/Form';
import { Card } from './components/Card';

import './App.css';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const fenaTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      neat: blue[50],
    },
  },
});

function App() {
  const smallScreen = useMediaQuery('(min-width:850px)');

  const { message: socketMessage } = useSocket();
  const [input, setInput] = useState('');
  const [jobsDictionary, setJobsDictionary] = useState({});
  const [isBlockSending, setBlockSending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isCorrectInput = useMemo(
    () => +input % 1 === 0 && !isNaN(+input) && !input.startsWith('0'),
    [input]
  );
  const sortByDate = sortDctionary(jobsDictionary);
  const jobIds = useMemo(
    () => Object.keys(jobsDictionary).sort(sortByDate),
    [jobsDictionary]
  );

  const sendRequest = () => {
    !isBlockSending &&
      setEmailAmount(input)
        .then(res => {
          setJobsDictionary(prevState => ({
            ...prevState,
            [res]: {
              timestamp: Date.now(),
              emails: [
                {
                  jobId: res,
                  amount: input,
                },
              ],
            },
          }));
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setInput('');
        });
    isBlockSending && handleOpenSnackbar();
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (isCorrectInput) {
      sendRequest();
    }
  };

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setInput(value);
    },
    [setInput]
  );

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, [setOpenSnackbar]);

  const handleOpenSnackbar = useCallback(() => {
    setOpenSnackbar(true);
  }, [setOpenSnackbar]);

  useEffect(() => {
    if (socketMessage) {
      const email = {
        ...socketMessage,
        timePassed: moment(socketMessage?.timestamp).calendar(),
      };
      const { status } = email;
      const [current, total] = status.split('of');
      +current < +total && setBlockSending(true);
      +current === +total && setBlockSending(false);
      setJobsDictionary(prevState => {
        const { jobId } = socketMessage;
        if (prevState[jobId]) {
          return {
            ...prevState,
            [jobId]: {
              ...prevState[jobId],
              email,
            },
          };
        } else {
          return {
            ...prevState,
            [jobId]: {
              timestamp: Date.now(),
              email,
            },
          };
        }
      });
    }
  }, [socketMessage]);

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={fenaTheme}>
        <Grid container direction={smallScreen ? 'row' : 'column'} spacing={10}>
          <Grid item xs={6} alignSelf="center">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isCorrectInput={isCorrectInput}
              input={input}
            />
          </Grid>
          <Grid item xs={6}>
            <Paper className="column" elevation={5}>
              <Grid container rowSpacing={4} alignItems="center">
                {jobIds?.map(jobId => {
                  const { email } = jobsDictionary[jobId];
                  return (
                    <Card
                      key={`${jobId}-${email?.timestamp || Math.random()}`}
                      mail={email}
                    />
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar //Needs to change to some other UI component
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Emails are being sent..."
        />
      </ThemeProvider>
    </Container>
  );
}

export default App;
