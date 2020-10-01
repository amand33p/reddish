import { makeStyles } from '@material-ui/core/styles';

export const useMainPaperStyles = makeStyles(() => ({
  root: {
    width: '100vW',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '100vH',
  },
  container: {
    minWidth: '98%',
    marginTop: '1em',
  },
}));

export const useNavStyles = makeStyles((theme) => ({
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
    fontFamily: 'Varela Round',
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
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        marginTop: 10,
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      [theme.breakpoints.down('xs')]: {
        padding: '0 0 0 0',
      },
    },
    formTitle: {
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5em',
      },
    },
    switchText: {
      textAlign: 'center',
      marginBottom: '1.2em',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 0,
        fontSize: '1em',
      },
    },
    submitButton: {
      marginTop: '1.8em',
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    inputIcon: {
      marginRight: 8,
    },
    sidePanel: {
      padding: 20,
      margin: 'auto 0',
    },
    divider: {
      marginLeft: 40,
      marginRight: 40,
    },
  }));

export const useDialogStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  createPostWrapper: {
    display: 'flex',
    width: 'auto',
    borderRadius: 0,
    marginBottom: 10,
    padding: 6,
    alignItems: 'center',
  },
  createBtn: {
    marginLeft: 8,
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
  iconGroup: {
    display: 'flex',
  },
  dialogTitle: {
    fontSize: '1.2em',
  },
}));

export const useAlertStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: 10,
  },
}));

export const usePostListStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export const useCardStyles = (isUpvoted, isDownvoted) => {
  return makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: 'auto',
      borderRadius: 0,
    },
    votesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: 30,
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
    },
    points: {
      color: isUpvoted ? '#FF8b60' : isDownvoted ? '#9494FF' : '#333',
      fontWeight: 600,
    },
    thumbnailWrapper: {
      alignSelf: 'center',
      marginLeft: 5,
    },
    thumbnail: {
      fontSize: '2em',
      width: 70,
      height: 90,
      textAlign: 'center',
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      [theme.breakpoints.down('xs')]: {
        width: 60,
        height: 80,
      },
    },
    thumbnailIcon: {
      marginTop: 30,
    },
    postInfoWrapper: {
      paddingTop: 8,
      paddingLeft: 8,
    },
    url: {},
    userAndDate: {
      marginLeft: 10,
    },
    commentsBtn: {
      textTransform: 'capitalize',
      color: '#787878',
    },
    title: {
      marginRight: 5,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em',
        margin: 0,
      },
    },
    bottomBtns: {
      display: 'flex',
    },
  }));
};

export const usePostFormStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: 10,
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 0 0',
    },
  },
  formTitle: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5em',
    },
  },
  submitButton: {
    marginTop: '1.8em',
  },
  input: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '0.7em',
  },
  inputIcon: {
    marginRight: 8,
  },
  inputIconText: {
    padding: 2,
    paddingBottom: 0,
    marginRight: 9,
    fontWeight: 700,
  },
  typeBtnGroup: {
    marginBottom: 5,
  },
  imageInput: {
    marginTop: '1em',
  },
  imageBtnsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  imagePreview: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    marginTop: '1em',
  },
  clearSelectionBtn: {
    padding: '0.25em',
  },
  selectBtn: {
    textTransform: 'capitalize',
  },
}));

export const usePostCommentsStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '1em',
  },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  postDetails: {},
}));
