import "./index.scss";

export const Letter = ({value=''}) => (<div>{value}</div>)

export const Strung = (parentProps) => {
  const props = {...parentProps};
  const {value="", className=""} = props;
  delete props.value;

  const chars = value.split("");
  const letters = chars.map((char, i) => <Letter key={`${i}${char}`} value={char}/>)

  return (
    <div {...props} className={cnames("strung", className)}>
      <div className="strung-content">
        {letters}
      </div>
    </div>
  );
};

export default Strung;
