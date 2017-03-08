import './index.scss';
export const Card = ({className="", children, full=false}) => <div className={cnames("card", className, {full,})}>{children}</div>;
export default Card;
