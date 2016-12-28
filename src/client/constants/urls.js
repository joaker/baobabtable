export const TwitterAPI = 'http://localhost:3001/twitter/user/search?username=chicago';
export const TwitterUserSearch = 'http://localhost:3001/twitter/user/search?username=';
export const createUserSearch = name => `${TwitterUserSearch}${name}`;

export const TwitterTagSearchStart = 'https://twitter.com/i/search/typeahead.json?count=10&filters=false&q=%23'
export const TwitterTagSearchEnd = '&result_type=topics%2Cusers&src=SEARCH_BOX';
export const TwitterTagSearch = 'http://localhost:3001/twitter/tag/search?tag=';
// export const createTagSearch = (name) => `${TwitterTagSearchStart}${name}${TwitterTagSearchEnd}`;
export const createTagSearch = name => `${TwitterTagSearch}${name}`;
