
export const addMessage = ({posts=[]}, {message, id, timestamp}) => {
  const newPost = { message, id, timestamp };
  return {
    posts: [newPost, ...posts], // add the new post to the front of the line
  };
};
export const removeMessage = ({posts=[]}, {id}) => {
  return {
    posts: posts.filter(p => p.id !== id),
  };
};

export const setMessage = ({posts=[]}, {post={}}) => {
  return {
    posts: posts.map(p => p.id !== post.id ? p : {
      ...p,
      ...post,
    }),
  };
};


// export const setText = (state, action) => {
//   const {value:text=""} = action;
//   return {
//     text,
//   };
// };
//
// export const setToken = (state, action) => {
//   const {value:token="", tokenType} = action;
//   return {
//     token,
//     tokenType,
//   };
// };
//
// export const setCursor = (state, action) => {
//   const {value={}} = action;
//   const {cursorStart = 0} = value;
//   const {cursorEnd = cursorStart} = value;
//
//   return {
//     cursorStart,
//     cursorEnd,
//   };
// };
