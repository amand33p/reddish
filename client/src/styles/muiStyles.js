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
