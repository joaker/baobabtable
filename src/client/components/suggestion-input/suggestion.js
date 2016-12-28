import styles from "./suggestion.scss";


const Suggestion = ({suggestion,className,onClick}) => {

  const {name, screen_name, description=""} = suggestion;
  const {profile_image_url_https, profile_backroom_image_url_https} = suggestion;

  return (
    <div className={cnames("suggestion", "noselect", className)} onClick={onClick}>
      <div className={cnames("avatar-wrapper")}>
        <img className={cnames("avatar")} src={profile_image_url_https}/>
      </div>
      <div className={cnames("details")}>
        <div className={cnames("title")}>
          <label className={cnames("name")}>{name}</label>
          <label className={cnames("handle")}>@{screen_name}</label>
        </div>
        <p className={cnames("description")}>{description}</p>
      </div>
    </div>
  );
};

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Suggestion.propTypes = {
  suggestion: React.PropTypes.object,
};

export default Suggestion;
