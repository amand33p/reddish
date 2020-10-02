import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TextInput } from './FormikMuiFields';
import generateBase64Encode from '../utils/genBase64Encode';
import { createNewPost, updatePost } from '../reducers/postCommentsReducer';
import * as yup from 'yup';

import { usePostFormStyles } from '../styles/muiStyles';
import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTheme } from '@material-ui/core/styles';
import TitleIcon from '@material-ui/icons/Title';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import PublishIcon from '@material-ui/icons/Publish';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const validationSchema = yup.object({
  title: yup.string().required('Required'),
  textSubmission: yup.string(),
  imageSubmission: yup.string(),
  linkSubmission: yup
    .string()
    .matches(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      'Valid URL required'
    ),
});

const AddPostForm = ({
  postType,
  closeModal,
  actionType,
  postToEditType,
  postToEditTitle,
  postToEditSub,
  postToEditId,
  textSubmission,
  linkSubmission,
}) => {
  const [fileName, setFileName] = useState('');
  const subreddits = useSelector((state) => state.subreddits);
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = usePostFormStyles();

  const fileInputOnChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setFieldValue);
  };

  const clearFileSelection = (setFieldValue) => {
    setFieldValue('imageSubmission', '');
    setFileName('');
  };

  const handleAddPost = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const postId = await dispatch(createNewPost(values));
      setSubmitting(false);

      history.push(`/comments/${postId}`);
      resetForm();
      closeModal();
    } catch (err) {
      setSubmitting(false);
      console.log(err.response.data.message);
    }
  };

  const handleUpdatePost = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      dispatch(updatePost(postToEditId, values));
      setSubmitting(false);

      history.push(`/comments/${postToEditId}`);
      resetForm();
      closeModal();
    } catch (err) {
      setSubmitting(false);
      console.log(err.response.data.message);
    }
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: actionType === 'edit' ? postToEditTitle : '',
          postType: actionType === 'edit' ? postToEditType : postType,
          textSubmission: actionType === 'edit' ? textSubmission : '',
          linkSubmission: actionType === 'edit' ? linkSubmission : '',
          imageSubmission: '',
          subreddit: actionType === 'edit' ? postToEditSub.id : '',
        }}
        onSubmit={actionType === 'edit' ? handleUpdatePost : handleAddPost}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={classes.form}>
            {actionType !== 'edit' && (
              <ButtonGroup
                color="secondary"
                fullWidth
                className={classes.typeBtnGroup}
              >
                <Button
                  onClick={() => setFieldValue('postType', 'Text')}
                  variant={
                    values.postType === 'Text' ? 'contained' : 'outlined'
                  }
                >
                  <TextFormatIcon style={{ marginRight: 2 }} />
                  Text
                </Button>
                <Button
                  onClick={() => setFieldValue('postType', 'Image')}
                  variant={
                    values.postType === 'Image' ? 'contained' : 'outlined'
                  }
                >
                  <ImageIcon style={{ marginRight: 5 }} />
                  Image
                </Button>
                <Button
                  onClick={() => setFieldValue('postType', 'Link')}
                  variant={
                    values.postType === 'Link' ? 'contained' : 'outlined'
                  }
                >
                  <LinkIcon style={{ marginRight: 5 }} />
                  Link
                </Button>
              </ButtonGroup>
            )}

            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                r/
              </Typography>
              <Autocomplete
                name="subreddit"
                onChange={(e, value) =>
                  setFieldValue('subreddit', value ? value.id : '')
                }
                fullWidth
                options={subreddits}
                disabled={actionType === 'edit'}
                getOptionLabel={(option) => option.subredditName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      actionType === 'edit'
                        ? postToEditSub.subredditName
                        : 'Choose a subreddit'
                    }
                    placeholder="Search by subreddit name"
                    required
                    disabled={actionType === 'edit'}
                  />
                )}
              />
            </div>

            <div className={classes.input}>
              <TitleIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="title"
                type="text"
                placeholder="Enter title"
                label="Title"
                required
                fullWidth
                disabled={actionType === 'edit'}
              />
            </div>
            {values.postType === 'Text' && (
              <div className={classes.textInput}>
                {/*<TextInput
                  name="textSubmission"
                  placeholder="Enter text"
                  multiline
                  rows={4}
                  rowsMax={Infinity}
                  label="Text"
                  required={values.postType === 'Text'}
                  fullWidth
                  variant="outlined"
                />*/}
                <CKEditor
                  editor={ClassicEditor}
                  data={values.textSubmission}
                  onChange={(e, editor) =>
                    setFieldValue('textSubmission', editor.getData())
                  }
                />
              </div>
            )}
            {values.postType === 'Image' && (
              <div className={classes.imageInput}>
                <div className={classes.imageBtnsWrapper}>
                  <ImageIcon className={classes.inputIcon} color="primary" />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    hidden
                    onChange={(e) => fileInputOnChange(e, setFieldValue)}
                    required={values.postType === 'Image'}
                  />

                  <Button
                    component="label"
                    htmlFor="image-upload"
                    variant="outlined"
                    color="primary"
                    fullWidth={!isMobile}
                    startIcon={
                      values.imageSubmission ? (
                        <CheckCircleIcon />
                      ) : (
                        <PublishIcon />
                      )
                    }
                    size={isMobile ? 'small' : 'medium'}
                    className={classes.selectBtn}
                  >
                    {values.imageSubmission
                      ? `${isMobile ? '' : 'Selected '}"${fileName}"`
                      : `Select Image`}
                  </Button>
                  {values.imageSubmission && (
                    <IconButton
                      onClick={() => clearFileSelection(setFieldValue)}
                      color="secondary"
                      size={isMobile ? 'small' : 'medium'}
                      className={classes.clearSelectionBtn}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </div>
                {values.imageSubmission && (
                  <div className={classes.imagePreview}>
                    <img
                      alt={fileName}
                      src={values.imageSubmission}
                      width={isMobile ? 250 : 400}
                    />
                  </div>
                )}
              </div>
            )}
            {values.postType === 'Link' && (
              <div className={classes.input}>
                <LinkIcon className={classes.inputIcon} color="primary" />
                <TextInput
                  name="linkSubmission"
                  type="text"
                  placeholder="Enter URL"
                  label="Link"
                  required={values.postType === 'Link'}
                  fullWidth
                  variant={actionType === 'edit' ? 'outlined' : 'standard'}
                />
              </div>
            )}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
            >
              Submit
            </Button>
            {/*JSON.stringify(values, null, 2)*/}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
