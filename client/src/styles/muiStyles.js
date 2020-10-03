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
    overflow: 'hidden',
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
      backgroundColor: '#f7f5f3',
    },
    points: {},
    thumbnailWrapper: {
      alignSelf: 'center',
      marginLeft: 5,
    },
    thumbnail: {
      fontSize: '2em',
      width: 70,
      height: 90,
      textAlign: 'center',
      backgroundColor: '#f7f5f3',
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
  textInput: {
    marginTop: '1.5em',
  },
}));

export const usePostCommentsStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
  },
  topPortion: {
    display: 'flex',
  },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f5f3',
    [theme.breakpoints.down('xs')]: {
      width: 35,
    },
  },
  postDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
    borderRadius: 0,
  },
  title: {
    fontWeight: 500,
    marginBottom: '0.7em',
  },
  imagePost: {
    textAlign: 'center',
  },
  image: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '40%',
    },
    border: '1px solid #e9e3d8',
    borderRadius: 8,
  },
  bottomBar: {
    display: 'flex',
    marginTop: '0.8em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9em',
    },
  },
  bottomButton: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
  },
  commentIcon: {
    marginRight: 10,
  },
  commentsContainer: {
    marginLeft: '0.7em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0.3em',
    },
  },
  divider: {
    marginBottom: '1em',
  },
  wholeComment: {
    marginBottom: '2em',
  },
  commentWrapper: {
    display: 'flex',
  },
  commentVotesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  commentDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
    paddingTop: '0.7em',
  },
  replyWrapper: {
    marginBottom: '0.2em',
    display: 'flex',
    marginLeft: '2em',
  },
}));
