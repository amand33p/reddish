import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput } from './FormikMuiFields';

import { usePostFormStyles } from '../styles/muiStyles';
import { Button, ButtonGroup } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';

const AddPostForm = ({ postType }) => {
  const classes = usePostFormStyles();

  const handleAddPost = (data, { setSubmitting, resetForm }) => {
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: '',
          postType: postType,
          textSubmission: '',
          linkSubmission: '',
          imageSubmission: '',
          subreddit: '',
        }}
        onSubmit={handleAddPost}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={classes.form}>
            <ButtonGroup
              color="secondary"
              fullWidth
              className={classes.typeBtnGroup}
            >
              <Button
                onClick={() => setFieldValue('postType', 'Text')}
                variant={values.postType === 'Text' ? 'contained' : 'outlined'}
              >
                <TextFormatIcon style={{ marginRight: 5 }} />
                Text
              </Button>
              <Button
                onClick={() => setFieldValue('postType', 'Image')}
                variant={values.postType === 'Image' ? 'contained' : 'outlined'}
              >
                <ImageIcon style={{ marginRight: 5 }} />
                Image
              </Button>
              <Button
                onClick={() => setFieldValue('postType', 'Link')}
                variant={values.postType === 'Link' ? 'contained' : 'outlined'}
              >
                <LinkIcon style={{ marginRight: 5 }} />
                Link
              </Button>
            </ButtonGroup>

            <div className={classes.input}>
              <TitleIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="title"
                type="text"
                placeholder="Enter title"
                label="Title"
                required
                fullWidth
              />
            </div>

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
            {JSON.stringify(values, null, 2)}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
