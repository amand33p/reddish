const validator = require('validator');

const parseTextSubmission = (textSubmission) => {
  if (!textSubmission) {
    throw new Error(`Text body needed for post type 'Text'.`);
  }
  return textSubmission;
};

const parseLinkSubmission = (linkSubmission) => {
  if (!linkSubmission || !validator.isURL(linkSubmission)) {
    throw new Error(`Valid URL needed for post type 'Link'.`);
  }
  return linkSubmission;
};

const parseImageSubmission = (imageSubmission) => {
  if (!imageSubmission) {
    throw new Error(`Image is needed for type 'Image'.`);
  }
  return imageSubmission;
};

const postTypeValidator = (type, text, link, image) => {
  switch (type) {
    case 'Text':
      return {
        postType: 'Text',
        textSubmission: parseTextSubmission(text),
      };

    case 'Link':
      return {
        postType: 'Link',
        linkSubmission: parseLinkSubmission(link),
      };

    case 'Image':
      return {
        postType: 'Image',
        imageSubmission: parseImageSubmission(image),
      };

    default:
      throw new Error(
        'Invalid post type. Valid types include - Text, Link or Image.'
      );
  }
};

module.exports = postTypeValidator;
