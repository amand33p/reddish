import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffa576' : '#FF5700',
      },
      secondary: {
        main: darkMode ? '#eb878a' : '#941a1c',
      },
    },
  });

export default customTheme;
