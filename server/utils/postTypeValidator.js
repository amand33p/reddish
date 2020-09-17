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
  if (
    !imageSubmission ||
    !imageSubmission.imageLink ||
    !imageSubmission.imageId
  ) {
    throw new Error(`Image link & ID are needed for type 'Image'.`);
  }
  return imageSubmission;
};

const postTypeValidator = (bodyObj) => {
  switch (bodyObj.postType) {
    case 'Text':
      return {
        postType: 'Text',
        textSubmission: parseTextSubmission(bodyObj.textSubmission),
      };

    case 'Link':
      return {
        postType: 'Link',
        linkSubmission: parseLinkSubmission(bodyObj.linkSubmission),
      };

    case 'Image':
      return {
        postType: 'Image',
        imageSubmission: parseImageSubmission(bodyObj.imageSubmission),
      };

    default:
      throw new Error(
        'Invalid post type. Valid types include - Text, Link or Image.'
      );
  }
};

module.exports = postTypeValidator;
