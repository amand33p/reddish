let charLimit = 30;

export const trimLink = (link) => {
  return link.length < charLimit ? link : link.slice(0, 30).concat('...');
};

export const prettifyLink = (link) => {
  return link.startsWith('http') ? link.split('//')[1] : link;
};

export const fixUrl = (link) => {
  return link.startsWith('http') ? link : 'https://'.concat(link);
};
