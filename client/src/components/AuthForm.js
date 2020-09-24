import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginUser, signupUser } from '../reducers/userReducer';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from './FormikMuiFields';

import { Button, Typography, Divider } from '@material-ui/core';
import { useAuthStyles } from '../styles/muiStyles';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const validationSchemaSignup = yup.object({
  username: yup.string().required().max(20).min(3),
  password: yup.string().required().min(6),
});

const validationSchemaLogin = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const AuthForm = ({ closeModal }) => {
  const [authType, setAuthType] = useState('login');

  const dispatch = useDispatch();
  const classes = useAuthStyles(authType)();

  const handleLogin = async (data, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await dispatch(loginUser(data));
      setSubmitting(false);
      resetForm();
      closeModal();
    } catch (err) {
      setSubmitting(false);
      console.log(err.message);
    }
  };

  const handleSignup = async (data, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await dispatch(signupUser(data));
      setSubmitting(false);
      resetForm();
      closeModal();
    } catch (err) {
      setSubmitting(false);
      console.log(err.message);
    }
  };

  return (
    <div className={classes.authWrapper}>
      <Formik
        validateOnChange={true}
        initialValues={{ username: '', password: '' }}
        onSubmit={authType === 'login' ? handleLogin : handleSignup}
        validationSchema={
          authType === 'login' ? validationSchemaLogin : validationSchemaSignup
        }
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Typography
              variant="h4"
              color="secondary"
              className={classes.formTitle}
            >
              {authType === 'login'
                ? 'Login to your account'
                : 'Create a new account'}
            </Typography>
            <div className={classes.input}>
              <PersonIcon className={classes.inputIcon} color="secondary" />
              <TextInput
                name="username"
                type="text"
                placeholder="Enter username"
                label="Username"
                required
                fullWidth
              />
            </div>
            <div className={classes.input}>
              <LockIcon className={classes.inputIcon} color="secondary" />
              <TextInput
                name="password"
                type="password"
                placeholder="Enter password"
                label="Password"
                required
                fullWidth
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              startIcon={
                authType === 'login' ? <ExitToAppIcon /> : <PersonAddIcon />
              }
              className={classes.submitButton}
              disabled={isSubmitting}
            >
              {authType === 'login'
                ? isSubmitting
                  ? 'Logging In'
                  : 'Login'
                : isSubmitting
                ? 'Signing Up'
                : 'Sign Up'}
            </Button>
          </Form>
        )}
      </Formik>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className={classes.sidePanel}>
        <Typography variant="h6" className={classes.switchText} color="primary">
          {authType === 'login'
            ? `Don't have an account?`
            : 'Already have an account?'}
        </Typography>
        <Button
          onClick={() =>
            authType === 'login' ? setAuthType('signup') : setAuthType('login')
          }
          fullWidth
          size="large"
          color="primary"
          variant="outlined"
          startIcon={
            authType === 'login' ? <PersonAddIcon /> : <ExitToAppIcon />
          }
        >
          {authType === 'login' ? 'Sign Up' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AuthForm;
