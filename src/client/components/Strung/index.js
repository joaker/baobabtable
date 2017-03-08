import "./index.scss";

export const Letter = ({value=''}) => (<div className="">{value}</div>)

export const Strung = (parentProps) => {
  const props = {...parentProps};
  const {value="", className=""} = props;
  delete props.value;

  const chars = value.split("");

  const words = value.split(/\w/)

  const letters = chars.map((char, i) => <Letter key={`${i}${char}`} value={char} className="noselect"/>)

  return (
    <div {...props} className={cnames("strung", "", className)}>
      <div className="strung-content noselect">
        {letters}
      </div>
    </div>
  );
};

export default Strung;
