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
