import React from 'react';
import { useField } from 'formik';

import { TextField, FormControlLabel, Radio, Button } from '@material-ui/core';

export const TextInput = ({
  placeholder,
  label,
  type,
  required,
  fullWidth,
  InputProps,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={type}
      InputProps={InputProps}
      required
      fullWidth
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export const RadioInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
