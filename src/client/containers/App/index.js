import ContextualInput from "../contextual-input";

const titleName = 'Tweetify';
const title = titleName.split('').join(' ');
export const App = () => (
  <ul className="app-component">
    <li><h1 className="noselect">{title}</h1></li>
    <li><ContextualInput/></li>
  </ul>
);

export default App;
