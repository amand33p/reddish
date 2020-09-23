import { makeStyles } from '@material-ui/core/styles';

export const useMainPaperStyles = makeStyles(() => ({
  root: {
    width: '100vW',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '100vH',
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
  },
  topLeftButton: {
    flexGrow: 1,
  },
  logoWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 5,
  },
  user: {
    marginRight: 10,
  },
  titleButton: {
    textTransform: 'capitalize',
    fontSize: 20,
    marginRight: 12,
  },
  navButtons: {
    '&:hover': {
      backgroundColor: '#ffe5d8',
    },
  },
}));

export const useAuthStyles = (authType) =>
  makeStyles((theme) => ({
    authWrapper: {
      display: 'flex',
      flexDirection: authType === 'login' ? 'row' : 'row-reverse',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20,
    },
    formTitle: { textAlign: 'center' },
    switchText: { textAlign: 'center' },
    submitButton: {
      marginTop: '1em',
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    inputIcon: {
      marginRight: 8,
    },
    sidePanel: {
      padding: '10',
      margin: 'auto 0',
    },
  }));
