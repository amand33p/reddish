import React from 'react';
import { useField } from 'formik';

import { TextField } from '@material-ui/core';

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
