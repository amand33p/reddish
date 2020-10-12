const generateBase64Encode = (file, setValue, isSetState) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    if (isSetState) {
      setValue(reader.result);
    } else {
      setValue('imageSubmission', reader.result);
    }
  };
};

export default generateBase64Encode;
