import {connect} from 'react-redux';
import {noop} from 'util/utils';
import { token } from 'constants/patterns';
import Token from 'components/token';

const UnconnectedPost = ({
  index,
  message,
}) => {

  const tokenized = message.split(token);
  const tokens = tokenized.map((value, i) => <Token key={i} value={value}/>);

  return (
    <div className={'post'}>
      {tokens}
    </div>
  );
};

const mapStateToProps = ({stream={}}, {index}) => {
  const {posts} = stream;
  const post = posts[index];
  return {...post};
};
const mapDispatchToProps = dispatch => ({
});

export const Post = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedPost);

export default Post;
