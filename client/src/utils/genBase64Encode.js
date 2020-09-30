const generateBase64Encode = (file, setValue) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setValue('imageSubmission', reader.result);
  };
};

export default generateBase64Encode;
