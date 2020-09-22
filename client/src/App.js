import React from 'react';

import { Container, Paper } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const classes = useMainPaperStyles();

  const customTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#4d577a',
      },
      secondary: {
        main: '#9a8fb8',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Paper className={classes.root} elevation={0}>
        <Container disableGutters>
          <h1>Readify</h1>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
