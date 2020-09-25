import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FF5700',
    },
    secondary: {
      main: '#941a1c',
    },
  },
});

export default customTheme;
