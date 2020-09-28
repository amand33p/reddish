import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput } from './FormikMuiFields';

import { usePostFormStyles } from '../styles/muiStyles';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';

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
            <div>
              <ButtonGroup color="secondary" fullWidth>
                <Button
                  onClick={() => setFieldValue('postType', 'Text')}
                  variant={
                    values.postType === 'Text' ? 'contained' : 'outlined'
                  }
                >
                  Text
                </Button>
                <Button
                  onClick={() => setFieldValue('postType', 'Image')}
                  variant={
                    values.postType === 'Image' ? 'contained' : 'outlined'
                  }
                >
                  Image
                </Button>
                <Button
                  onClick={() => setFieldValue('postType', 'Link')}
                  variant={
                    values.postType === 'Link' ? 'contained' : 'outlined'
                  }
                >
                  Link
                </Button>
              </ButtonGroup>
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
