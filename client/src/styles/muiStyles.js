import { makeStyles } from '@material-ui/core/styles';

export const useMainPaperStyles = makeStyles((theme) => ({
  root: {
    width: '100vW',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '100vH',
  },
  homepage: {
    minWidth: '98%',
    marginTop: '0.5em',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: '0',
      display: 'block',
    },
  },
  postsPanel: {
    flexGrow: 1,
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  leftPortion: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logoWrapper: {
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
  logo: {
    fontFamily: 'Varela Round',
    textTransform: 'lowercase',
    fontSize: '1.3em',
    padding: '0.1em',
    marginRight: '0.3em',
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
  search: {
    flexGrow: 0.75,
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  searchBtn: {
    padding: '0.2em',
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
  createSubBtn: {
    marginTop: '1em',
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
    marginBottom: '1em',
  },
  loadBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadBtn: {
    marginTop: '0.8em',
    width: '50%',
  },
  noSubscribedPosts: {
    textAlign: 'center',
    marginTop: '5em',
  },
}));

export const useCardStyles = makeStyles((theme) => ({
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
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1.5em',
  },
}));

export const usePostCommentsStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vH',
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
    marginBottom: '1em',
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
    width: '100%',
  },
  replyWrapper: {
    marginBottom: '0.2em',
    display: 'flex',
    marginLeft: '2em',
  },
  noCommentsBanner: {
    textAlign: 'center',
    marginTop: '5em',
  },
  loadSpinner: {
    textAlign: 'center',
    marginTop: '12em',
  },
}));

export const useCommentInputStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: '0.5em',
    margin: '0.4em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentBtn: {
    alignSelf: 'flex-end',
    marginTop: '0.1em',
  },
}));

export const useCommentAndBtnsStyles = makeStyles((theme) => ({
  inputDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitBtns: {
    alignSelf: 'flex-end',
    marginTop: '0.1em',
  },
  btnStyle: {
    textTransform: 'capitalize',
  },
  btnBar: {
    display: 'flex',
  },
  cancelBtn: {
    marginRight: '0.2em',
    marginTop: '0.1em',
  },
}));

export const useUserPageStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vH',
    paddingBottom: '1em',
  },
  userInfoWrapper: {
    margin: '0.5em',
    padding: '0.8em',
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightWrapper: {
    flexGrow: 0.3,
    display: 'flex',
    justifyContent: 'space-between',
  },
  twoItemsDiv: {
    textAlign: 'center',
  },
  avatar: {
    width: '5em',
    height: '5em',
    [theme.breakpoints.down('xs')]: {
      width: '3em',
      height: '3em',
    },
  },
  cakeDay: {
    display: 'flex',
    alignItems: 'center',
  },
  postsPaper: {
    margin: '0.5em',
  },
  loadBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadBtn: {
    width: '50%',
  },
  noPosts: {
    textAlign: 'center',
    marginTop: '5em',
  },
  loadSpinner: {
    textAlign: 'center',
    marginTop: '12em',
  },
}));

export const useUserPostCardStyles = makeStyles((theme) => ({
  mainPaper: {
    display: 'flex',
    marginBottom: '1em',
    textDecoration: 'none',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      width: 35,
    },
  },
  title: {
    fontWeight: 500,
    marginBottom: '0.7em',
  },
  imagePost: {
    textAlign: 'center',
  },
  image: {
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: '40%',
    },
    border: '1px solid #e9e3d8',
    borderRadius: 8,
  },
  postInfo: {
    paddingTop: '0.5em',
    padding: '0.2em',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  commentsBtn: {
    marginTop: '0.5em',
  },
}));

export const useSubredditPageStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vH',
    paddingBottom: '1em',
  },
  subInfoWrapper: {
    margin: '0.5em',
    padding: '0.8em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  iconText: {
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  secondPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
    },
  },
  joinBtn: {
    marginBottom: '0.4em',
  },
  description: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  inputDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitBtns: {
    alignSelf: 'flex-end',
    marginTop: '0.1em',
  },
  firstPanel: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  loadBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadBtn: {
    marginTop: '0.8em',
    width: '50%',
  },
  noPosts: {
    textAlign: 'center',
    marginTop: '5em',
  },
}));

export const useSortTabStyles = makeStyles((theme) => ({
  mainPaper: {
    borderRadius: 0,
    marginBottom: '0.6em',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0em',
    },
  },
}));

export const useSubPanelStyles = makeStyles((theme) => ({
  mainPaper: {
    minWidth: '25%',
    borderRadius: 0,
    marginLeft: '0.5em',
    padding: '0.5em',
  },
  listPaper: {
    padding: '1em',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1em',
  },
  listItem: {
    fontSize: '1.1em',
  },
  listWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1em',
  },
}));

export const useSubredditFormStyles = makeStyles((theme) => ({
  formWrapper: {
    [theme.breakpoints.down('xs')]: {
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
  submitButton: {
    marginTop: '1.8em',
    marginBottom: '0.5em',
  },
  input: {
    display: 'flex',
    alignItems: 'flex-end',
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
  descInput: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1.5em',
  },
}));

export const useUserMenuStyles = makeStyles((theme) => ({
  userBtn: {
    textTransform: 'none',
    display: 'flex',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '0.2em',
  },
  userBtnMob: {
    padding: '0.1em',
  },
}));

export const useAvatarFormStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1em',
  },
  title: {
    textAlign: 'center',
  },
  selectBtn: {
    textTransform: 'none',
  },
  clearSelectionBtn: {
    padding: '0.25em',
  },
  imageBtnsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1em',
  },
  imagePreview: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.7em',
  },
  submitButton: {
    marginTop: '1.4em',
  },
  currentAvatar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.5em',
  },
  currentAvatarText: {
    marginRight: '0.5em',
  },
}));

export const useSearchPageStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vH',
    paddingBottom: '1em',
  },
  infoPaper: {
    padding: '0.8em',
    display: 'flex',
    alignItems: 'flex-start',
  },
  noResults: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',
  },
  sorryIcon: {
    marginRight: '7px',
    fontSize: '4em',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  loadBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadBtn: {
    marginTop: '0.8em',
    width: '50%',
  },
}));

export const useSortCommentsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
}));
