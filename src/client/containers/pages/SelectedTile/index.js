import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import ImageTile from 'components/ImageTile';
import {connect} from 'react-redux';
import * as actions from 'actions/gallery';


const generateTile = (sources) => {
	const tiles = [];
	for(let i = 0; i < 10; i++){
		const srcIndex = i % sources.length;
		const {url, description} = src || {};
		console.log(`sourcing: ${url}`);
		tiles.push(<ImageTile href="/Menu" src={url} caption={description} key={i}/>);
	}
	return tiles;
}

export class RawSelectedTile extends React.PureComponent {
	constructor(props) {
    super(props);
  }
	render() {
		const props = this.props;
		const {src, deselect: action} = props;
		return (
			<div className="selected-tile">
				<ImageTile href={src} src={src} key={'selected-tile'} index={-1} onClick={action}/>
			</div>
		);
	}
}

const mapState = ({gallery={}, }) => {
	const {tiles=[], selected} = gallery;
	return {
		src: selected,
	};
};
const mapDispatch = (dispatch) => {
	return {
		deselect: () => dispatch(actions.deselectTile()),
	};
};

export const SelectedTile = connect(mapState, mapDispatch)(RawSelectedTile);

export default SelectedTile;
