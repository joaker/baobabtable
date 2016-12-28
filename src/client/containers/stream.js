import {connect} from 'react-redux';
import {noop} from 'util/utils';
import Post from './post';

const UnconnectedStream = ({
  postCount,
}) => {
  const posts = [];
  for(let i = 0; i < postCount; i++){
    const post = <li className="post-item" key={i}><Post index={i}/></li>;
    posts.push(post);
  }

  return (
    <ul className="stream">
      {posts}
    </ul>
  );
}
const mapStateToProps = ({stream={}}) => {
  const {posts=[]} = stream;
  const postCount = posts.length;
  return {
    postCount,
  }
};
const mapDispatchToProps = dispatch => ({
});

export const Stream = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedStream);

export default Stream;
