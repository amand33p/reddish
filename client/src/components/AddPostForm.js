import React from 'react';
import { Formik, Form } from 'formik';
import { TextInput } from './FormikMuiFields';

import { usePostFormStyles } from '../styles/muiStyles';
import { Typography, Button } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';

const AddPostForm = ({ postType }) => {
  const classes = usePostFormStyles();

  const handleAddPost = (data, { setSubmitting, resetForm }) => {};

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: '',
          textSubmission: '',
          linkSubmission: '',
          imageSubmission: '',
        }}
        onSubmit={handleAddPost}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Typography
              variant="h4"
              color="secondary"
              className={classes.formTitle}
            >
              Add new post
            </Typography>
            <div className={classes.input}>
              <TitleIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="title"
                type="text"
                placeholder="Enter title for your post"
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
