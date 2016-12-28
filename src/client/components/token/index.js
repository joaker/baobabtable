import {symbolToTokenType} from 'constants/patterns';

export const Token = ({value=""}) => {

  const first = value.slice(0,1); // grab the first letter
  const url = `http://twitter.com/${value}`;

  const className = symbolToTokenType[first];

  if(!className) return <span>{value}</span>

  return <a href={url} target={"_blank"} className={className}>{value}</a>;
};

export default Token;
