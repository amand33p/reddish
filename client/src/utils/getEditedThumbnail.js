const getEditedThumbnail = (imageLink) => {
  const splittedUrl = imageLink.split('image/upload/');
  const firstPart = splittedUrl[0];
  const secondPart = splittedUrl[1];
  const transformApi = 'w_70,h_90,c_fill,g_auto/';

  return [firstPart, transformApi, secondPart].join('');
};

export default getEditedThumbnail;
