import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewSubreddit } from '../reducers/subredditReducer';
import { Formik, Form } from 'formik';
import { TextInput } from './FormikMuiFields';
import { notify } from '../reducers/notificationReducer';
import AlertMessage from './AlertMessage';

import { useSubredditFormStyles } from '../styles/muiStyles';
import { Button, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';

const SubredditForm = ({ closeModal }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const classes = useSubredditFormStyles();
  const history = useHistory();

  const handleCreateSubreddit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await dispatch(addNewSubreddit(values));
      setSubmitting(false);
      history.push(`/r/${values.subredditName}`);
      dispatch(
        notify(`New subreddit created: r/${values.subredditName}`, 'success')
      );

      resetForm();
      closeModal();
    } catch (err) {
      setSubmitting(false);
      if (err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnChange={true}
        initialValues={{ subredditName: '', description: '' }}
        onSubmit={handleCreateSubreddit}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Typography
              variant="h4"
              color="secondary"
              className={classes.formTitle}
            >
              Create a new subreddit
            </Typography>
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                r/
              </Typography>
              <TextInput
                name="subredditName"
                type="text"
                placeholder="Enter name"
                label="Subreddit Name"
                required
                fullWidth
              />
            </div>
            <div className={classes.descInput}>
              <InfoIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="description"
                type="text"
                placeholder="Enter description"
                label="Description"
                required
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                maxRows={Infinity}
              />
            </div>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={<AddIcon />}
            >
              {isSubmitting ? 'Creating' : 'Create Subreddit'}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage
        error={error}
        severity="error"
        clearError={() => setError(null)}
      />
    </div>
  );
};

export default SubredditForm;
