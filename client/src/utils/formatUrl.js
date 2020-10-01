export const trimLink = (link, charLimit) => {
  return link.length < charLimit
    ? link
    : link.slice(0, charLimit).concat('...');
};

export const prettifyLink = (link) => {
  return link.startsWith('http') ? link.split('//')[1] : link;
};

export const fixUrl = (link) => {
  return link.startsWith('http') ? link : 'https://'.concat(link);
};
