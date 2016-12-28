export const before = /(?:@|#)(\w){0,15}$/;
export const after = /^(\w){0,15}/;

export const user = /@(\w){1,15}/;
export const tag = /#(\w){1,15}/;

// at least two characters are needed for a tag
export const token = /((?:@|#)(?:\w){2,15})/;


export const symbolToTokenType = {
  '@' : 'user',
  '#' : 'tag',
}
